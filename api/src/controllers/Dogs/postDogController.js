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
  return "Success in creating the breed!";
};

module.exports = {
  postDogController,
};
