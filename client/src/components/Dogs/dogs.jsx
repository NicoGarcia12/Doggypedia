import style from "./dogs.module.css";
import Dog from "../Dog/dog";
import { useDispatch, useSelector } from "react-redux";
import {
  change_page,
  orderDogs,
  searchName,
  combinedFilters,
} from "../../redux/actions";
import { useEffect, useState } from "react";

export default function Dogs() {
  const dispatch = useDispatch();

  // Defino variables con lo que traigo del estado global y sino estados locales para trabajarlos dentro de la página
  const order = useSelector((state) => state.order);
  const Dogs = useSelector((state) => state.copyAllDogs);
  let currentPage = useSelector((state) => state.currentPage);
  const temperaments = useSelector((state) => state.allTemperaments);
  const filtersChosen = useSelector((state) => state.filtersChosen);
  const [name, setName] = useState();
  const [filtersChosenLocal, setfiltersChosenLocal] = useState({
    temperamentChosen: "",
    originChosen: "",
  });

  const dogsPerPage = 8;
  const pages = Math.ceil(Dogs.length / dogsPerPage); // Calculo la cantidad de páginas a mostrar
  if (pages === 0) {
    currentPage = 0;
  }
  const indexLast = dogsPerPage * currentPage;
  const indexStart = indexLast - dogsPerPage;
  const dogsMostrados = Dogs.slice(indexStart, indexLast); // Calculo los perros que voy a mostrar dependiendo de la página actual

  useEffect(() => {
    setfiltersChosenLocal(filtersChosen); // Seteo los filtros locales dependiendo de lo que hay en el global para mostrarlos y no perderlos nunca
  }, [filtersChosen]);

  // Cada vez que activo un origen, o pido todos, seteo el filtro local, seteo el name y hago el dispatch para aplicar los filtros. También pido que la página vuelva a 1
  function handleFilterOrigin(event) {
    const selectedFilter = event.target.value;
    setfiltersChosenLocal({
      ...filtersChosenLocal,
      originChosen: selectedFilter,
    });
    setName("");
    dispatch(
      combinedFilters({
        ...filtersChosen,
        originChosen: selectedFilter,
      })
    );
    dispatch(change_page(1));
  }

  // Cada vez que activo un temperamento, o pido todos, seteo el filtro local, seteo el name y hago el dispatch para aplicar los filtros. También pido que la página vuelva a 1
  function handleFilterTemperament(event) {
    const selectedFilter = event.target.value;
    setfiltersChosenLocal({
      ...filtersChosenLocal,
      temperamentChosen: selectedFilter,
    });
    setName("");
    dispatch(
      combinedFilters({
        ...filtersChosen,
        temperamentChosen: selectedFilter,
      })
    );
    dispatch(change_page(1));
  }

  // Cada vez que selecciono un botón para cambiar de página, cambio la página si es posible
  function cambioEstado(accion) {
    if (accion === "NEXT") {
      if (currentPage < pages) {
        dispatch(change_page(currentPage + 1));
      }
    } else {
      if (currentPage > 1) {
        dispatch(change_page(currentPage - 1));
      }
    }
  }

  // Recibo un texto, seteo los filtros, seteo el name con el texto y hago un dispatch tanto con los filtros mostrando todo como con el uso del texto. Después vuelvo a la página 1
  function handleSearchName(event) {
    let value = event.target.value;
    setfiltersChosenLocal({
      originChosen: "All",
      temperamentChosen: "All",
    });
    setName(value);
    dispatch(
      combinedFilters({
        originChosen: "All",
        temperamentChosen: "All",
      })
    );
    dispatch(searchName(encodeURIComponent(value.trim()))); // Codificar el valor de name
    dispatch(change_page(1));
  }

  // Aplico el orden seleccionado y vuelvo a la página 1
  function handleOrder(event) {
    const selectedOrder = event.target.value;
    dispatch(orderDogs(selectedOrder));
    dispatch(change_page(1));
  }

  return (
    <div>
      <div className={style.pagination}>
        <button type="button" onClick={() => cambioEstado("PREVIOUS")}>
          {/* Le aplico a la función cambioEstado ese texto cada vez que hago click en el botón  */}
          Previous
        </button>
        <label>
          {currentPage} / {pages}
        </label>
        {/* Muestro entre los botones la página actual */}
        <button type="button" onClick={() => cambioEstado("NEXT")}>
          {/* Le aplico a la función cambioEstado ese texto cada vez que hago click en el botón  */}
          Next
        </button>
      </div>
      <div className={style.filters}>
        <label>Filter by temperament:</label>
        <select
          name="Filter_Temperament"
          value={filtersChosenLocal.temperamentChosen} // Le doy al valor que tiene que mostrar el valor del estado local en el filtro
          onChange={handleFilterTemperament} // Cuando hago click activo la función enviandolé el valor de la option del select
        >
          <option value="All">All</option>
          {temperaments?.map((temperament) => {
            // Cada temperamento que hay lo mapeo para que el usuario pueda buscarlo
            return <option value={temperament}>{temperament}</option>;
          })}
        </select>
        <label>Filter by origin:</label>
        <select
          name="Filter_Origin"
          value={filtersChosenLocal.originChosen} // Le doy al valor que tiene que mostrar el valor del estado local en el filtro
          onChange={handleFilterOrigin} // Cuando hago click activo la función enviandolé el valor de la option del select
        >
          <option value="All">All</option>
          <option value="API">API</option>
          <option value="BD">BD</option>
        </select>
      </div>
      <div className={style.orderAndSearch}>
        <label>Sort by:</label>
        <select name="Sort" value={order} onChange={handleOrder}>
          {/* Aplico un orden específico cuando selecciono una option del select,
          le doy el valor al select del que tiene el estado global */}
          <option value="Ascending_Name">A-Z</option>
          <option value="Descending_Name">Z-A</option>
          <option value="Ascending_Weight">Weight</option>
          <option value="Descending_Weight">Weight_Descending</option>
        </select>
        <label>Search by name:</label>
        <input type="text" value={name} onChange={handleSearchName} />
        {/*  Cada vez que voy cambiando de nombre le aplico la función. El valor del name es el del estado local */}
      </div>
      <div className={style.dogsContainer}>
        {dogsMostrados.length === 0 ? ( // Si los perros que debo mostrar son 0, muestro un msje de que no fueron encontrados perros con lo pedido
          <label>Dogs not found</label>
        ) : (
          dogsMostrados.map((dog, index) => {
            // Si encontré perros, empiezo a hacer un mapeo de cada perro retornando el componente Dog con este perro. Serán máximo 8 por la cantidad que hay por página
            return <Dog key={index} dog={dog} />;
          })
        )}
      </div>
      <div className={style.pagination}>
        <button type="button" onClick={() => cambioEstado("PREVIOUS")}>
          Previous
        </button>
        <label>
          {currentPage} / {pages}
        </label>
        <button type="button" onClick={() => cambioEstado("NEXT")}>
          Next
        </button>
      </div>
      <div className={style.filters}>
        <label>Filter by temperament:</label>
        <select
          name="Filter_Temperament"
          value={filtersChosenLocal.temperamentChosen}
          onChange={handleFilterTemperament}
        >
          <option value="All">All</option>
          {temperaments?.map((temperament) => {
            return <option value={temperament}>{temperament}</option>;
          })}
        </select>
        <label>Filter by origin:</label>
        <select
          name="Filter_Origin"
          value={filtersChosenLocal.originChosen}
          onChange={handleFilterOrigin}
        >
          <option value="All">All</option>
          <option value="API">API</option>
          <option value="BD">BD</option>
        </select>
      </div>
      <div className={style.orderAndSearch}>
        <label>Sort by:</label>
        <select name="Sort" value={order} onChange={handleOrder}>
          <option value="Ascending_Name">A-Z</option>
          <option value="Descending_Name">Z-A</option>
          <option value="Ascending_Weight">Weight</option>
          <option value="Descending_Weight">Weight_Descending</option>
        </select>
        <label>Search by name:</label>
        <input type="text" value={name} onChange={handleSearchName} />
      </div>
    </div>
  );
}
