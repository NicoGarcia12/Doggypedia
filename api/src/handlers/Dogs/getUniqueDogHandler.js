const { validate } = require("uuid");
const {
  getUniqueDogAPIController,
  getUniqueDogBDController,
} = require("../../controllers/Dogs/getUniqueDogController");
const getUniqueDogHandler = async (req, res) => {
  try {
    const { id } = req.params;
    let response;
    if (validate(id)) {
      response = await getUniqueDogBDController(id);
    } else {
      response = await getUniqueDogAPIController(id);
    }
    return res.status(200).json(response);
  } catch (error) {
    if (error.message === "No existe ese ID") {
      return res.status(404).json(error.message);
    } else {
      return res.status(500).json(error.message);
    }
  }
};

module.exports = { getUniqueDogHandler };
