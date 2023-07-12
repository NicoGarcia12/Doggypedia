import { NavLink, useParams } from "react-router-dom";
import style from "./detail.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Detail() {
  const [dog, setDog] = useState({});
  const { id } = useParams();
  useEffect(() => {
    // LO RENDERIZA, PERO AL PONER UNO QUE NO EXISTE DEBERÍA ENVIAR EL ALERTA
    try {
      axios(`http://localhost:3001/dogs/${id}`).then(({ data }) => {
        setDog(data);
      });
    } catch (error) {
      console.log("Error: ", error);
    }

    return () => {
      setDog({});
    };
  }, [id]);

  const image = isNaN(dog.id) ? dog.image : dog.image.url;
  const weight = isNaN(dog.id) ? dog.weight : dog.weight.metric;
  const height = isNaN(dog.id) ? dog.height : dog.height.metric;

  return (
    <div>
      <h3>Id: {dog.id}</h3>
      <img src={image} alt={dog.name} />
      <h3>Name: {dog.name}</h3>
      <h4>Height: {height}</h4>
      <h4>Weight: {weight}</h4>
      <h4>Temperaments: </h4>
      <h4>Lifespan: {dog.life_span}</h4>
    </div>
  );
}
