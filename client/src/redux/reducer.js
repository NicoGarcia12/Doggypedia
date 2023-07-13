import {
  ORDER,
  FILTER_ORIGEN,
  FILTER_TEMPERAMENT,
  PETICION_DOGS,
  CHANGE_PAGE,
  LOAD_TEMPERAMENTS
} from "./actions";

const initialState = {
  allDogs: [],
  copyAllDogs: [],
  currentPage: 1,
  allTemperaments: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TEMPERAMENTS:      
      return {
        ...state, allTemperaments: action.payload
      }
    case ORDER:
      break;
    case FILTER_ORIGEN:
      break;
    case FILTER_TEMPERAMENT:
      break;
    case PETICION_DOGS:
      return { ...state, allDogs: action.payload, copyAllDogs: action.payload };
    case CHANGE_PAGE:
      return { ...state, currentPage: action.payload };
    default:
      return { ...state };
  }
};

export default rootReducer;
