import { useNavigate, useParams } from "react-router-dom";
import style from "./detail.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../redux/actions";
axios.defaults.baseURL = url;
export default function Detail() {
  const [dog, setDog] = useState([]);
  const { id } = useParams();
  const [temperament, setTemperament] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios(`/dogs/${id}`)
      .then(({ data }) => {
        setDog(data);
        setTemperament(data.temperaments);
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data);
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
    temperaments = temperament?.map((temp) => temp.name);
    temperaments = temperaments.join(", ");
  } else {
    if (!dog.temperament) {
      temperaments = "Doesn't have temperaments";
    } else {
      temperaments = dog.temperament;
    }
  }

  return (
    <div className={style.detailContainer}>
      <img src={image} alt={dog.name} className={style.leftSection} />
      <div className={style.rightSection}>
        <h2>Name: {dog.name}</h2>
        <h3>Height: {height} cm</h3>
        <h3>Weight: {weight} kg</h3>
        <h3>Temperaments: {temperaments}</h3>
        <h3>Lifespan: {dog.life_span}</h3>
      </div>
    </div>
  );
}
