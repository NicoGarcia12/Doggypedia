const {
  getUniqueDogAPIController,
  getUniqueDogBDController,
} = require("../../controllers/Dogs/getUniqueDogController");
const getUniqueDogHandler = async (req, res) => {
  try {
    const { id } = req.params;
    let response;
    let valor = isNaN(id) ? "BD" : "API";
    if (valor === "BD") {
      response = await getUniqueDogBDController(id);
    } else {
      response = await getUniqueDogAPIController(id);
    }
    return res.status(200).json(response);
  } catch (error) {
    if (error.message === "Dogsasa not found") {
      return res.status(404).json(error.message);
    } else {
      return res.status(500).json(error.message);
    }
  }
};

module.exports = { getUniqueDogHandler };
