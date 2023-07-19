import {
  ORDER,
  FILTER_ORIGEN,
  FILTER_TEMPERAMENT,
  PETICION_DOGS,
  CHANGE_PAGE,
  LOAD_TEMPERAMENTS,
  SEARCH_NAME,
  COMBINED_FILTERS,
} from "./actions";

const initialState = {
  allDogs: [],
  copyAllDogs: [],
  currentPage: 1,
  allTemperaments: [],
  order: "",
  filtersChosen: {
    temperamentChosen: "",
    originChosen: "",
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case PETICION_DOGS:
      return {
        ...state,
        allDogs: action.payload.sort((a, b) => a.name.localeCompare(b.name)),
        copyAllDogs: action.payload.sort((a, b) =>
          a.name.localeCompare(b.name)
        ),
      };
    case SEARCH_NAME:
      if (action.payload === "Dog not found") {
        return {
          ...state,
          copyAllDogs: [],
          searchName: action.payload,
        };
      } else {
        return {
          ...state,
          copyAllDogs: action.payload.sort((a, b) =>
            a.name.localeCompare(b.name)
          ),
        };
      }
    case CHANGE_PAGE:
      return { ...state, currentPage: action.payload };
    case LOAD_TEMPERAMENTS:
      return {
        ...state,
        allTemperaments: action.payload,
      };
    case COMBINED_FILTERS:
      let filtered = [...state.allDogs];
      if (
        action.payload.originChosen !== "All" &&
        action.payload.originChosen !== ""
      ) {
        if (action.payload.originChosen === "API") {
          filtered = filtered.filter((dog) => isNaN(dog.id) === false);
        } else {
          filtered = filtered.filter((dog) => isNaN(dog.id) === true);
        }
      }
      if (
        action.payload.temperamentChosen !== "All" &&
        action.payload.temperamentChosen !== ""
      ) {
        filtered = filtered.filter((dog) => {
          if (isNaN(dog.id)) {
            return dog.temperaments.some(
              (temp) => temp.name === action.payload.temperamentChosen
            );
          } else {
            if (dog.temperament) {
              return dog.temperament
                .split(",")
                .some(
                  (temperament) =>
                    temperament.trim() === action.payload.temperamentChosen
                );
            } else {
              return false
            }
          }
        });
      }

      return {
        ...state,
        filtersChosen: action.payload,
        copyAllDogs: filtered,
      };

    case ORDER:
      let orden;
      if (action.payload === "Ascending_Name") {
        orden = state.copyAllDogs.sort((a, b) => a.name.localeCompare(b.name));
      } else if (action.payload === "Descending_Name") {
        orden = state.copyAllDogs.sort((a, b) => b.name.localeCompare(a.name));
      } else if (action.payload === "Ascending_Weight") {
        orden = state.copyAllDogs.sort((a, b) => {
          let weightA;
          let weightB;

          if (a.weight.metric && b.weight.metric) {
            // API AMBOS
            const aWeightSplit = a.weight.metric.split(" - ");
            const bWeightSplit = b.weight.metric.split(" - ");
            weightA = isNaN(Number(aWeightSplit[0]))
              ? -1
              : parseInt(aWeightSplit[0]);
            weightB = isNaN(Number(bWeightSplit[0]))
              ? -1
              : parseInt(bWeightSplit[0]);

            if (weightA === weightB) {
              const aMaxWeight = parseInt(aWeightSplit[1]);
              const bMaxWeight = parseInt(bWeightSplit[1]);
              return aMaxWeight - bMaxWeight;
            }
          } else if (a.weight.metric) {
            // A API
            const aWeightSplit = a.weight.metric.split(" - ");
            weightA = isNaN(Number(aWeightSplit[0]))
              ? -1
              : parseInt(aWeightSplit[0]);
            weightB = parseInt(b.weight.split(" - ")[0]);

            if (weightA === weightB) {
              const aMaxWeight = parseInt(aWeightSplit[1]);
              return aMaxWeight - weightB;
            }
          } else if (b.weight.metric) {
            // B API
            const bWeightSplit = b.weight.metric.split(" - ");
            weightA = parseInt(a.weight.split(" - ")[0]);
            weightB = isNaN(Number(bWeightSplit[0]))
              ? -1
              : parseInt(bWeightSplit[0]);

            if (weightA === weightB) {
              const bMaxWeight = parseInt(bWeightSplit[1]);
              return weightA - bMaxWeight;
            }
          } else {
            // BD AMBOS
            const aWeightSplit = a.weight.split(" - ");
            const bWeightSplit = b.weight.split(" - ");
            weightA = parseInt(aWeightSplit[0]);
            weightB = parseInt(bWeightSplit[0]);

            if (weightA === weightB) {
              const aMaxWeight = parseInt(aWeightSplit[1]);
              const bMaxWeight = parseInt(bWeightSplit[1]);
              return aMaxWeight - bMaxWeight;
            }
          }

          return weightA - weightB;
        });
      } else if (action.payload === "Descending_Weight") {
        orden = state.copyAllDogs.sort((a, b) => {
          let weightA;
          let weightB;
          if (a.weight.metric && b.weight.metric) {
            // API AMBOS
            const aWeightSplit = a.weight.metric.split(" - ");
            const bWeightSplit = b.weight.metric.split(" - ");
            weightA = isNaN(Number(aWeightSplit[0]))
              ? -1
              : parseInt(aWeightSplit[0]);
            weightB = isNaN(Number(bWeightSplit[0]))
              ? -1
              : parseInt(bWeightSplit[0]);
            if (parseInt(aWeightSplit[0]) === parseInt(bWeightSplit[0])) {
              return parseInt(bWeightSplit[1]) - parseInt(aWeightSplit[1]);
            } else {
              return weightB - weightA;
            }
          } else if (a.weight.metric) {
            // A API
            const aWeightSplit = a.weight.metric.split(" - ");
            weightA = isNaN(Number(aWeightSplit[0]))
              ? -1
              : parseInt(aWeightSplit[0]);
            weightB = parseInt(b.weight.split(" - ")[0]);
            if (weightA === weightB) {
              return parseInt(aWeightSplit[1]) - weightB;
            } else {
              return weightB - weightA;
            }
          } else if (b.weight.metric) {
            // B API
            const bWeightSplit = b.weight.metric.split(" - ");
            weightA = parseInt(a.weight.split(" - ")[0]);
            weightB = isNaN(Number(bWeightSplit[0]))
              ? -1
              : parseInt(bWeightSplit[0]);
            if (weightA === parseInt(bWeightSplit[0])) {
              return weightA - weightB;
            } else {
              return weightA - parseInt(bWeightSplit[1]);
            }
          } else {
            // BD AMBOS
            const aWeightSplit = a.weight.split(" - ");
            const bWeightSplit = b.weight.split(" - ");
            weightA = parseInt(aWeightSplit[0]);
            weightB = parseInt(bWeightSplit[0]);
            if (parseInt(aWeightSplit[0]) === parseInt(bWeightSplit[0])) {
              return parseInt(bWeightSplit[1]) - parseInt(aWeightSplit[1]);
            } else {
              return weightB - weightA;
            }
          }
        });
      }
      return {
        ...state,
        copyAllDogs: orden,
        order: action.payload,
      };

    case FILTER_ORIGEN:
      if (action.payload === "All") {
        return {
          ...state,
          copyAllDogs: state.allDogs,
          filterOrigin: action.payload,
        };
      } else {
        if (action.payload === "BD") {
          return {
            ...state,
            copyAllDogs: state.allDogs.filter((dog) => isNaN(dog.id) === true),
            filterOrigin: action.payload,
          };
        } else {
          return {
            ...state,
            copyAllDogs: state.allDogs.filter((dog) => isNaN(dog.id) === false),
            filterOrigin: action.payload,
          };
        }
      }
    case FILTER_TEMPERAMENT:
      if (action.payload === "All") {
        return {
          ...state,
          copyAllDogs: state.allDogs,
          filterTemperament: action.payload,
        };
      } else {
        return {
          ...state,
          filterTemperament: action.payload,
          copyAllDogs: state.allDogs.filter((dog) => {
            if (isNaN(dog.id)) {
              if (Array.isArray(dog.temperaments)) {
                return dog.temperaments.some(
                  (temp) => temp.name === action.payload
                );
              }
              return false;
            } else {
              if (typeof dog.temperament === "string") {
                return dog.temperament.includes(action.payload);
              }
              return false;
            }
          }),
        };
      }
    default:
      return { ...state };
  }
};

export default rootReducer;
