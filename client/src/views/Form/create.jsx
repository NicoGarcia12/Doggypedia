import React, { useEffect, useState } from "react";
import validation from "../../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { loadTemperaments } from "../../redux/actions";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "./create.module.css";

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
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [temperaments, setTemperaments] = useState([]);
  const allTemperaments = useSelector((state) => state.allTemperaments);

  useEffect(() => {
    if (allTemperaments.length === 0) {
      dispatch(loadTemperaments());
    }
    setTemperaments(allTemperaments);

    if (newBreed.temperaments.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        temperaments: "Must choose at least one temperament",
      }));
    } else {
      setErrors((prevErrors) => {
        const { temperaments, ...restErrors } = prevErrors;
        return restErrors;
      });
    }
  }, [dispatch, newBreed.temperaments, allTemperaments]);

  const handleInputChange = (event) => {
    setNewBreed({
      ...newBreed,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validation({
        ...newBreed,
        [event.target.name]: event.target.value,
        temperaments: newBreed.temperaments,
      })
    );
  };

  const handleAddTemperament = (temperament) => {
    setNewBreed({
      ...newBreed,
      temperaments: [...newBreed.temperaments, temperament],
    });

    if (newBreed.temperaments.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        temperaments: "Must choose at least one temperament",
      }));
    } else {
      setErrors((prevErrors) => {
        const { temperaments, ...restErrors } = prevErrors;
        return restErrors;
      });
    }
  };

  const handleRemoveTemperament = (temperament) => {
    setNewBreed({
      ...newBreed,
      temperaments: newBreed.temperaments.filter(
        (temp) => temp !== temperament
      ),
    });

    if (newBreed.temperaments.length === 1) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        temperaments: "Must choose at least one temperament",
      }));
    } else {
      setErrors((prevErrors) => {
        const { temperaments, ...restErrors } = prevErrors;
        return restErrors;
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let errores = Object.values(errors);
    if (errores && errores.length > 0) {
      alert("Debe llenar todos los campos de manera correcta");
    } else {
      axios
        .post("http://localhost:3001/dogs", newBreed)
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
    <div className={style.createContainer}>
      <form onSubmit={handleSubmit}>
        <h2>New breed</h2>
        <h3>Name:</h3>
        <input
          type="text"
          name="name"
          value={newBreed.name}
          onChange={handleInputChange}
        />
        <br />
        {errors.name && <span className={style.error}>{errors.name}</span>}
        <h3>Weight:</h3>
        <div className={style.section}>
          <div>
            <label>Min:</label>
            <input
              type="number"
              name="weight_min"
              value={newBreed.weight_min}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Max:</label>
            <input
              type="number"
              name="weight_max"
              value={newBreed.weight_max}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <br />
        {errors.weight && <span className={style.error}>{errors.weight}</span>}
        <h3>Height:</h3>
        <div className={style.section}>
          <div>
            <label>Min:</label>
            <input
              type="number"
              name="height_min"
              value={newBreed.height_min}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Max:</label>
            <input
              type="number"
              name="height_max"
              value={newBreed.height_max}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <br />
        {errors.height && <span className={style.error}>{errors.height}</span>}
        <h3>Life Span:</h3>
        <div className={style.section}>
          <div>
            <label>Min:</label>
            <input
              type="number"
              name="anios_min"
              value={newBreed.anios_min}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Max:</label>
            <input
              type="number"
              name="anios_max"
              value={newBreed.anios_max}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <br />
        {errors.anios && <span className={style.error}>{errors.anios}</span>}
        <h3>Image URL:</h3>
        <input
          type="url"
          name="image"
          value={newBreed.image}
          onChange={handleInputChange}
        />
        <br />
        {errors.image && <span className={style.error}>{errors.image}</span>}
        <h3>Temperaments:</h3>
        <select
          name="temperaments"
          value="" // Limpia la selección después de agregar un temperamento
          onChange={(event) => handleAddTemperament(event.target.value)}
        >
          <option value="" disabled>
            Select a temperament
          </option>
          {temperaments?.map((temperament) => {
            if (!newBreed.temperaments.includes(temperament)) {
              return (
                <option key={temperament} value={temperament}>
                  {temperament}
                </option>
              );
            }
            return null;
          })}
        </select>
        <br />
        {errors.temperaments && (
          <span className={style.error}>{errors.temperaments}</span>
        )}
        {newBreed.temperaments.map((temperament) => (
          <div key={temperament}>
            <label>{temperament}</label>{" "}
            <label onClick={() => handleRemoveTemperament(temperament)}>
              X
            </label>
          </div>
        ))}
        <div>
          <button id="send" type="submit" disabled={hasErrors}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
