import style from "./dogs.module.css";
import Dog from "../Dog/dog";
import { useDispatch, useSelector } from "react-redux";
import { change_page } from "../../redux/actions";

export default function Dogs() {
  const Dogs = useSelector((state) => state.copyAllDogs);
  const currentPage = useSelector((state) => state.currentPage);
  const dispatch = useDispatch();
  const dogsPerPage = 8;
  const pages = Math.ceil(Dogs.length / dogsPerPage);
  const indexLast = dogsPerPage * currentPage;
  const indexStart = indexLast - dogsPerPage;
  const dogsMostrados = Dogs.slice(indexStart, indexLast);

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

  return (
    <div>
      <div>
        Filter by temperament:
        <select name="Filter_Temperament">
          <option value="">Todos</option>
          <option value="">Breed</option>
          <option value="">Age Range</option>
          <option value="">Gender</option>
        </select>
        Filter by origin:
        <select name="Filter_Origin">
          <option value="">Todos</option>
          <option value="">Breed</option>
          <option value="">Age Range</option>
          <option value="">Gender</option>
        </select>
        <button type="button" onClick={() => cambioEstado("PREVIOUS")}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button type="button" onClick={() => cambioEstado("NEXT")}>
          Next
        </button>
        Sort by:
        <select name="Sort">
          <option value="">Todos</option>
          <option value="">Breed</option>
          <option value="">Age Range</option>
          <option value="">Gender</option>
        </select>
        <input type="search" name="SearchByName" placeholder="Search by name" />
      </div>
      <div className={style.dogsContainer}>
        {dogsMostrados?.map((dog, index) => {
          return <Dog key={index} dog={dog} />;
        })}
      </div>
    </div>
  );
}
