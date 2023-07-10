const { postDog } = require("../../helpers/BD/dogsBDHelper");

const postDogController = async (
  image,
  name,
  height,
  weight,
  life_span,
  temperaments
) => {
  await postDog(
    image,
    name,
    height,
    weight,
    life_span,
    temperaments
  );
  return "¡Exito al crear la raza!";
};

module.exports = {
  postDogController,
};
