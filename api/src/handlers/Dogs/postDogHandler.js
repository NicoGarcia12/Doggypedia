const {
  postDogController,
} = require("../../controllers/Dogs/postDogController");
const postDogHandler = async (req, res) => {
  try {
    const {
      image,
      name,
      height_min,
      height_max,
      weight_min,
      weight_max,
      anios_min,
      anios_max,
      temperaments,
    } = req.body;
    const height = height_min + " - " + height_max;
    const weight = weight_min + " - " + weight_max;
    const life_span = anios_min + " - " + anios_max + " years";
    let response;
    response = await postDogController(
      image,
      name,
      height,
      weight,
      life_span,
      temperaments
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { postDogHandler };
