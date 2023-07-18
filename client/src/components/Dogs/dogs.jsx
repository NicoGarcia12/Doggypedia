import style from "./dogs.module.css";
import Dog from "../Dog/dog";
import { useDispatch, useSelector } from "react-redux";
import {
  change_page,
  orderDogs,
  loadTemperaments,
  peticionDogs,
  filterDogsTemperament,
  filterDogsOrigen,
  searchName,
} from "../../redux/actions";
import { useEffect, useState } from "react";

export default function Dogs() {
  const [order, setOrder] = useState();
  const [filterOrigin, setFilterOrigin] = useState();
  const [filterTemperament, setFilterTemperament] = useState();
  const [name, setName] = useState();
  const Dogs = useSelector((state) => state.copyAllDogs);
  const currentPage = useSelector((state) => state.currentPage);
  const temperaments = useSelector((state) => state.allTemperaments);
  const dispatch = useDispatch();
  const dogsPerPage = 8;
  const pages = Math.ceil(Dogs.length / dogsPerPage);
  const indexLast = dogsPerPage * currentPage;
  const indexStart = indexLast - dogsPerPage;
  const dogsMostrados = Dogs.slice(indexStart, indexLast);

  useEffect(() => {
    dispatch(peticionDogs());
    dispatch(loadTemperaments());
  }, [dispatch]);

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

  function handleFilterOrigin(event) {
    const selectedFilter = event.target.value;
    setFilterOrigin(selectedFilter);
    setFilterTemperament("All");
    setName("");
    dispatch(filterDogsTemperament("All"));
    dispatch(filterDogsOrigen(selectedFilter));
    dispatch(change_page(1));
  }

  function handleFilterTemperament(event) {
    const selectedFilter = event.target.value;
    setFilterTemperament(selectedFilter);
    setFilterOrigin("All");
    setName("");
    dispatch(filterDogsOrigen("All"));
    dispatch(filterDogsTemperament(selectedFilter));
    dispatch(change_page(1));
  }

  function handleSearchName(event) {
    let value = event.target.value;
    setFilterOrigin("All");
    setFilterTemperament("All");
    setName(value);
    dispatch(filterDogsOrigen("All"));
    dispatch(filterDogsTemperament("All"));
    dispatch(searchName(encodeURIComponent(value))); // Codificar el valor de name
    dispatch(change_page(1));
  }

  function handleOrder(event) {
    const selectedOrder = event.target.value;
    setOrder(selectedOrder);
    dispatch(orderDogs(selectedOrder));
    dispatch(change_page(1));
  }

  return (
    <div>
      <div className={style.pagination}>
        <button type="button" onClick={() => cambioEstado("PREVIOUS")}>
          Previous
        </button>
        <label>{currentPage}</label>
        <button type="button" onClick={() => cambioEstado("NEXT")}>
          Next
        </button>
      </div>
      <div className={style.filters}>
        <label>Filter by temperament:</label>
        <select
          name="Filter_Temperament"
          value={filterTemperament}
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
          value={filterOrigin}
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
        <input
          type="text"
          value={name}
          onChange={handleSearchName}
        />
      </div>
      <div className={style.dogsContainer}>
        {dogsMostrados.length === 0 ? (
          <label>Dogs not found</label>
        ) : (
          dogsMostrados.map((dog, index) => {
            return <Dog key={index} dog={dog} />;
          })
        )}
      </div>
      <div className={style.pagination}>
        <button type="button" onClick={() => cambioEstado("PREVIOUS")}>
          Previous
        </button>
        <label>{currentPage}</label>
        <button type="button" onClick={() => cambioEstado("NEXT")}>
          Next
        </button>
      </div>
      <div className={style.filters}>
        <label>Filter by temperament:</label>
        <select
          name="Filter_Temperament"
          value={filterTemperament}
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
          value={filterOrigin}
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
        <input
          type="text"
          value={name}
          onChange={handleSearchName}
        />
      </div>
    </div>
  );
}
