const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define("dog", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    imagen: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altura: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
      },
    },
    peso: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
      },
    },
    anios: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
      },
    },
  });
};
