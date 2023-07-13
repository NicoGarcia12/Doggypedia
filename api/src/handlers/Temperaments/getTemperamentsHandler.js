const {
  getTemperamentController,
} = require("../../controllers/Temperaments/getTemperamentController");

const getTemperamentsHandler = async (req, res) => {
  try {
    response = await getTemperamentController();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getTemperamentsHandler };
