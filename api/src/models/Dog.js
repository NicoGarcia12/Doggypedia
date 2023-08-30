const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define("dog", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "1 - 1"
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "1 - 1"
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "0 - 1 years"
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};
