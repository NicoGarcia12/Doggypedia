const { Temperament } = require("../../db");

const relationsDogsTemperaments = async (newDog, temperaments) => {
  const foundTemperaments = await Temperament.findAll({
    where: { name: temperaments },
  });
  await newDog.addTemperament(foundTemperaments);
};

const temperamentsBDHelper = async (temperament) => {
  await Temperament.findOrCreate({ where: { name: temperament } });
};

module.exports = {
  relationsDogsTemperaments,
  temperamentsBDHelper,
};
