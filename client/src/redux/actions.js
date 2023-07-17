import axios from "axios";
export const ORDER = "ORDER";
export const FILTER_ORIGEN = "FILTER_ORIGEN";
export const FILTER_TEMPERAMENT = "FILTER_TEMPERAMENT";
export const PETICION_DOGS = "PETICION_DOGS";
export const LOAD_TEMPERAMENTS = "LOAD_TEMPERAMENTS";
export const CHANGE_PAGE = "CHANGE_PAGE";

export const peticionDogs = () => {
  const endpoint = "http://localhost:3001/dogs";
  return (dispatch) => {
    axios(endpoint).then(({ data }) => {
      return dispatch({
        type: PETICION_DOGS,
        payload: data,
      });
    });
  };
};

export const loadTemperaments = () => {
  const endpoint = "http://localhost:3001/temperaments";
  return (dispatch) => {
    axios(endpoint).then(({ data }) => {
      return dispatch({
        type: LOAD_TEMPERAMENTS,
        payload: data,
      });
    });
  };
};

export const change_page = (page) => {
  return {
    type: CHANGE_PAGE,
    payload: page,
  };
};

export function filterDogsTemperament(temperament) {
  return {
    type: FILTER_TEMPERAMENT,
    payload: temperament,
  };
}

export function filterDogsOrigen(origen) {
  return {
    type: FILTER_ORIGEN,
    payload: origen,
  };
}

export function orderDogs(ordenamiento) {
  return {
    type: ORDER,
    payload: ordenamiento,
  };
}
