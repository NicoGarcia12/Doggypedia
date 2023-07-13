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

const loadTemperamentsBDHelper = async () => {
  let temperaments = await Temperament.findAll();
  temperaments = temperaments.map((temperament) => temperament.dataValues.name);
  return temperaments;
};

module.exports = {
  relationsDogsTemperaments,
  temperamentsBDHelper,
  loadTemperamentsBDHelper,
};
