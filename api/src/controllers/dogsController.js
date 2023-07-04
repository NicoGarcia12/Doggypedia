const { Dog } = require("../db");
const axios = require("axios");
const getDogs = async (req, res) => {
  const { name } = req.query;
  try {
    let dogsDataAPI;
    let dogsDataBD;
    if (name) {
      dogsDataAPI = await axios(
        `https://api.thedogapi.com/v1/breeds/search?q=${name}}` // REVISAR COMO BUSCAR EN UNA PARTE DEL NAME LO QUE YO PUSE EN QUERY
      );
      dogsDataBD = await Dog.findAll({ where: { name: name } });
    } else {
      dogsDataAPI = await axios(`https://api.thedogapi.com/v1/breeds`); 
      dogsDataBD = await Dog.findAll();
    }

    return res.status(200).json({ ...dogsDataBD, ...dogsDataAPI });
  } catch (error) {
    return res.status(404).json({ Error: error.message });
  }
};

const getUniqueDog = async (req, res) => {
  const { idRaza } = req.params;
  try {
    const dog = await Dog.findOne({ where: { id: idRaza } });
    return res.status(200).json({ dog });
  } catch (error) {
    return res.status(404).json({ Error: error.message });
  }
};

module.exports = { getDogs, getUniqueDog };
