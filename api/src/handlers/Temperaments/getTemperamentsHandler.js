const {
  getTemperamentController,
} = require("../../controllers/Temperaments/getTemperamentController");

const getTemperamentsHandler = async (req, res) => {
  try {
    response = getTemperamentController();
    res.status(200).json("Los temperamentos se cargaron correctamente");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getTemperamentsHandler };
