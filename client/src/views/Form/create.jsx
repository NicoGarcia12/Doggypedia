import React, { useEffect, useState } from "react";
import validation from "../../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { loadTemperaments } from "../../redux/actions";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [newBreed, setNewBreed] = useState({
    image: "",
    name: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    anios_min: "",
    anios_max: "",
    temperaments: [],
  });
  const [errors, setErrors] = useState({}); //

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [temperaments, setTemperaments] = useState([]);
  const allTemperaments = useSelector((state) => state.allTemperaments);

  useEffect(() => {
    if (temperaments.length === 0) {
      dispatch(loadTemperaments());
      setTemperaments(allTemperaments);
    }
  }, [dispatch, temperaments]);

  const handleInputChange = (event) => {
    setNewBreed({
      ...newBreed,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validation({
        ...newBreed,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleAddTemperament = (temperament) => {
    setNewBreed({
      ...newBreed,
      temperaments: [...newBreed.temperaments, temperament],
    });
    setTemperaments(temperaments.filter((temp) => temp !== temperament));
    setErrors((prevErrors) => ({
      ...prevErrors,
      temperaments: undefined, // Eliminar el mensaje de error para temperaments
    }));
  };

  const handleRemoveTemperament = (temperament) => {
    setNewBreed({
      ...newBreed,
      temperaments: newBreed.temperaments.filter(
        (temp) => temp !== temperament
      ),
    });
    setTemperaments([...temperaments, temperament]);
    if (newBreed.temperaments.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        temperaments: "Must choose at least one temperament",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        temperaments: undefined,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let errores = Object.values(errors); //
    if (errores && errores.length > 0) {
      //
      alert("Debe llenar todos los campos de manera correcta"); //
    } else {
      axios
        .post("http://localhost:3001/dogs", newBreed) //
        .then((response) => {
          alert(response.data);
          navigate("/home");
        })
        .catch((error) => {
          alert("There was an error creating the breed");
        });
    }
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div>
      <h1>Add a new breed</h1>
      <form onSubmit={handleSubmit}>
        <h3>Name:</h3>
        <input
          type="text"
          name="name"
          value={newBreed.name}
          onChange={handleInputChange}
        />
        {errors.name && <span>{errors.name}</span>}
        <br />
        <br />
        <h3>Weight:</h3>
        <label>Min:</label>
        <input
          type="number"
          name="weight_min"
          value={newBreed.weight_min}
          onChange={handleInputChange}
        />
        {errors.weight_min && <span>{errors.weight_min}</span>}
        <label>Max:</label>
        <input
          type="number"
          name="weight_max"
          value={newBreed.weight_max}
          onChange={handleInputChange}
        />
        {errors.weight_max && <span>{errors.weight_max}</span>}
        <br />
        <br />
        <h3>Height:</h3>
        <label>Min:</label>
        <input
          type="number"
          name="height_min"
          value={newBreed.height_min}
          onChange={handleInputChange}
        />
        {errors.height_min && <span>{errors.height_min}</span>}
        <label>Max:</label>
        <input
          type="number"
          name="height_max"
          value={newBreed.height_max}
          onChange={handleInputChange}
        />
        {errors.height_max && <span>{errors.height_max}</span>}
        <br />
        <br />
        <h3>Life Span:</h3>
        <label>Min:</label>
        <input
          type="number"
          name="anios_min"
          value={newBreed.anios_min}
          onChange={handleInputChange}
        />
        {errors.anios_min && <span>{errors.anios_min}</span>}
        <label>Max:</label>
        <input
          type="number"
          name="anios_max"
          value={newBreed.anios_max}
          onChange={handleInputChange}
        />
        {errors.anios_max && <span>{errors.anios_max}</span>}
        <br />
        <br />
        <h3>Image URL:</h3>
        <input
          type="url"
          name="image"
          value={newBreed.image}
          onChange={handleInputChange}
        />
        {errors.image && <span>{errors.image}</span>}
        <br />
        <br />
        <h3>Temperaments:</h3>
        <select
          name="temperaments"
          onChange={(event) => handleAddTemperament(event.target.value)}
        >
          {temperaments?.map((temperament) => {
            return <option value={temperament}>{temperament}</option>;
          })}
        </select>
        {errors.temperaments && <span>{errors.temperaments}</span>}
        <br />
        <br />
        <div>
          {newBreed.temperaments.map((temperament) => (
            <div key={temperament}>
              <span>{temperament}</span>
              <button
                type="button"
                onClick={() => handleRemoveTemperament(temperament)}
              >
                X
              </button>
            </div>
          ))}
        </div>
        <button type="submit" disabled={hasErrors}>
          Create
        </button>
      </form>
    </div>
  );
}