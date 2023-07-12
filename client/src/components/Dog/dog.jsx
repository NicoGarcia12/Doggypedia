import { NavLink } from "react-router-dom";
import style from "./dog.module.css";

export default function Dog({ dog }) {
  const image = isNaN(dog.id) ? dog.image : dog.image.url;
  const weight = isNaN(dog.id) ? dog.weight : dog.weight.metric;

  return (
    <div className={style.dogContainer}>
      {/* NO FUNCIONA AL ENVIAR */}
      <NavLink to={`/detail/${dog.id}`}>
        <div className={style.imageContainer}>
          <img src={image} alt={dog.name} />
        </div>
      </NavLink>
      <h3>Name: {dog.name}</h3>
      <h4>Temperaments: </h4>
      <h4>Weight: {weight}</h4>
    </div>
  );
}
