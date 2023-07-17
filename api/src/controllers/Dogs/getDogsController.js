const {
  getDogsAPI,
  getDogsNameAPI,
} = require("../../helpers/API/dogsAPIHelper");
const { getDogsBD, getDogsNameBD } = require("../../helpers/BD/dogsBDHelper");
const pasarMayuscula = (name) => {
  return name.replace(/\b\w/g, (palabra) => palabra.toUpperCase());
  // Le pongo a cada palabra la primera letra como mayúscula
};

const getDogsControllerName = async (name) => {
  let dogsDataAPI;
  name = pasarMayuscula(name);
  dogsDataAPI = await getDogsNameAPI(name);
  dogsDataAPI = dogsDataAPI.data.filter((dog) =>
    pasarMayuscula(dog.name).includes(name)
  );
  let dogsDataBD;
  dogsDataBD = await getDogsNameBD(name);
  if (dogsDataAPI.length === 0 && dogsDataBD.length === 0) {
    throw new Error("Dog not found");
  }
  return [...dogsDataAPI, ...dogsDataBD];
};

const getDogsControllerNotName = async () => {
  dogsDataAPI = (await getDogsAPI()).data;
  dogsDataBD = await getDogsBD();
  let output = [];
  if (dogsDataAPI) {
    output.push(...dogsDataAPI);
  }
  if (dogsDataBD) {
    output.push(...dogsDataBD);
  }
  return output;
};

module.exports = {
  getDogsControllerName,
  getDogsControllerNotName,
};
