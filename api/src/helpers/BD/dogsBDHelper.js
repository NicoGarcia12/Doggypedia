const { Dog, Temperament } = require("../../db");

const { Op } = require("sequelize");
const { relationsDogsTemperaments } = require("./temperamentsBDHelper");
const getDogsNameBD = async (name) => {
  const dogs = await Dog.findAll({
    where: { name: { [Op.like]: `%${name}%` } },
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  return dogs;
};

const getDogsBD = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getDogPk = async (id) => {
  return await Dog.findByPk(id, {
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const postDog = async (
  image,
  name,
  height,
  weight,
  life_span,
  temperaments
) => {
  const newDog = await Dog.create({
    image,
    name,
    height,
    weight,
    life_span,
    temperaments,
  });
  relationsDogsTemperaments(newDog, temperaments);
};

module.exports = {
  getDogsNameBD,
  getDogsBD,
  getDogPk,
  postDog,
};
