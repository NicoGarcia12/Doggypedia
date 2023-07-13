import { useNavigate, useParams } from "react-router-dom";
// import style from "./detail.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Detail() {
  const [dog, setDog] = useState({});
  const { id } = useParams();
  const [temperament, setTemperament] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios(`http://localhost:3001/dogs/${id}`)
      .then(({ data }) => {
        setDog(data);
        setTemperament(data.temperaments);
      })
      .catch((error) => {
        alert("No existe ese id");
        navigate("/home");
      });

    return () => {
      setDog({});
    };
  }, [id, navigate]);

  const image = isNaN(dog.id) ? dog.image : dog.image.url;
  const weight = isNaN(dog.id) ? dog.weight : dog.weight.metric;
  const height = isNaN(dog.id) ? dog.height : dog.height.metric;
  let temperaments;
  if (isNaN(dog.id)) {
    temperaments = temperament.map((temp) => temp.name);
    temperaments = temperaments.join(", ");
  } else {
    if (!dog.temperament) {
      temperaments = "Doesn't have temperaments";
    } else {
      temperaments = dog.temperament;
    }
  }

  return (
    <div>
      <h3>Id: {dog.id}</h3>
      <img src={image} alt={dog.name} />
      <h3>Name: {dog.name}</h3>
      <h4>Height: {height}</h4>
      <h4>Weight: {weight}</h4>
      <h4>Temperaments: {temperaments}</h4>
      <h4>Lifespan: {dog.life_span}</h4>
    </div>
  );
}
