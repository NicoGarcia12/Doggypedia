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
  const order = useSelector((state) => state.order);
  const Dogs = useSelector((state) => state.copyAllDogs);
  const currentPage = useSelector((state) => state.currentPage);
  const temperaments = useSelector((state) => state.allTemperaments);
  const filtersChosen = useSelector((state) => state.filtersChosen);
  const dispatch = useDispatch();
  const dogsPerPage = 8;
  const pages = Math.ceil(Dogs.length / dogsPerPage);
  const indexLast = dogsPerPage * currentPage;
  const indexStart = indexLast - dogsPerPage;
  const dogsMostrados = Dogs.slice(indexStart, indexLast);
  const [name, setName] = useState();
  const [filtersChosenLocal, setfiltersChosenLocal] = useState({
    temperamentChosen: "",
    originChosen: "",
  });

  useEffect(() => {
    setfiltersChosenLocal(filtersChosen);
  }, [filtersChosen]);

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
    dispatch(searchName(encodeURIComponent(value))); // Codificar el valor de name
    dispatch(change_page(1));
  }

  function handleOrder(event) {
    const selectedOrder = event.target.value;
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
