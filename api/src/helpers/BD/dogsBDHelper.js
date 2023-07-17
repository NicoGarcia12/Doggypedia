const { Dog, Temperament } = require("../../db");

const { Op } = require("sequelize");
const { relationsDogsTemperaments } = require("./temperamentsBDHelper");
const getDogsNameBD = async (name) => {
  // return 
  // const Dog =  await Dog.findAll({ where: { name: { [Op.startsWith]: name } } });
  // console.log(Dog)
  // const Temperaments = await Dog_Temperament.findAll({where:{idDog: Dog.id}}); 
  // console.log(Temperaments)
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
