'use strict';
module.exports = (sequelize, DataTypes) => {
  const Package = sequelize.define('Package', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.TEXT,
    photo: DataTypes.STRING
  }, {
		paranoid: true
	});
  Package.associate = function(models) {
		Package.hasMany(models.PackageOptionExtra)
  };
  return Package;
};