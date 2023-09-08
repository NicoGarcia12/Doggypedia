import axios from "axios";
export const ORDER = "ORDER";
export const FILTER_ORIGEN = "FILTER_ORIGEN";
export const FILTER_TEMPERAMENT = "FILTER_TEMPERAMENT";
export const PETICION_DOGS = "PETICION_DOGS";
export const LOAD_TEMPERAMENTS = "LOAD_TEMPERAMENTS";
export const CHANGE_PAGE = "CHANGE_PAGE";
export const SEARCH_NAME = "SEARCH_NAME";
export const COMBINED_FILTERS = "COMBINED_FILTERS";
export const url = "https://doggypedia.onrender.com/"; // CAMBIAR EN GITHUB
axios.defaults.baseURL = url;
let hola = "probar";

export const peticionDogs = () => {
  const endpoint = "/dogs";
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
  const endpoint = "/temperaments";
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

export function combinedFilters(allFilters) {
  return {
    type: COMBINED_FILTERS,
    payload: allFilters,
  };
}

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

export const searchName = (name) => {
  const endpoint = `/dogs?name=${name}`;
  return (dispatch) => {
    axios(endpoint)
      .then(({ data }) => {
        return dispatch({
          type: SEARCH_NAME,
          payload: data,
        });
      })
      .catch((error) => {
        return dispatch({
          type: SEARCH_NAME,
          payload: error.response.data,
        });
      });
  };
};
