const {
  getDogsControllerName,
  getDogsControllerNotName,
} = require("../../controllers/Dogs/getDogsController");
const getDogsHandler = async (req, res) => {
  try {
    let { name } = req.query;
    let response;
    if (name) {
      name = decodeURIComponent(name);
      name = name.toLowerCase();
      response = await getDogsControllerName(name);
    } else {
      response = await getDogsControllerNotName();
    }
    return res.status(200).json(response);
  } catch (error) {
    if (error.message === "Dog not found") {
      return res.status(404).json(error.message);
    } else {
      return res.status(500).json(error.message);
    }
  }
};

module.exports = {
  getDogsHandler,
};
