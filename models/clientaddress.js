'use strict';
module.exports = (sequelize, DataTypes) => {
  const ClientAddress = sequelize.define('ClientAddress', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING
  }, {
		paranoid: true
	});
  ClientAddress.associate = function(models) {
    // associations can be defined here
    ClientAddress.belongsTo(models.Client, {as: 'Client'})
  };
  return ClientAddress;
};