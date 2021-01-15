'use strict';
module.exports = (sequelize, DataTypes) => {
  const ClientCar = sequelize.define('ClientCar', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    year: DataTypes.INTEGER,
    photo: DataTypes.STRING
  }, {
		paranoid: true
	});
  ClientCar.associate = function(models) {
    // associations can be defined here
		ClientCar.belongsTo(models.Client, {as: 'Client'})
		ClientCar.belongsTo(models.File)
  };
  return ClientCar;
};