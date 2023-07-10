const { getDogsAPI } = require("../../helpers/API/dogsAPIHelper");
const { getDogPk } = require("../../helpers/BD/dogsBDHelper");
const getUniqueDogBDController = async (id) => {
  try {
    const dogIdBD = await getDogPk(id);
    let output;
    if (dogIdBD) {
      output = dogIdBD;
    } else {
      throw new Error("No existe ese ID");
    }
    return output;
  } catch (error) {
    throw Error(error.message);
  }
};

const getUniqueDogAPIController = async (id) => {
  const response = await getDogsAPI();
  const dogsFromAPI = response.data;
  const dogIdAPI = dogsFromAPI.find((dog) => dog.id === parseInt(id));
  let output;
  if (dogIdAPI) {
    output = dogIdAPI;
  } else {
    throw new Error("No existe ese ID");
  }
  return output;
};

module.exports = { getUniqueDogBDController, getUniqueDogAPIController };
