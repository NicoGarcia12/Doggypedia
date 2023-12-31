const { getDogsAPI } = require("../../helpers/API/dogsAPIHelper");
const {
  temperamentsBDHelper, loadTemperamentsBDHelper,
} = require("../../helpers/BD/temperamentsBDHelper");

const getTemperamentController = async () => {
  let dogs = (await getDogsAPI()).data;
  let temperaments = [];
  dogs.forEach((dog) => {
    if (dog.temperament) {
      const dogTemperaments = dog.temperament.split(",").map((t) => t.trim());
      dogTemperaments.forEach((temperament) => {
        temperaments.push(temperament);
      });
    }
  });
  temperaments.forEach(async (temperament) => {
    await temperamentsBDHelper(temperament);
  });

  return await loadTemperamentsBDHelper();
};

module.exports = { getTemperamentController };
