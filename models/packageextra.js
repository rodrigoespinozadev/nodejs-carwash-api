'use strict';
module.exports = (sequelize, DataTypes) => {
  const PackageExtra = sequelize.define('PackageExtra', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT
  }, {
		paranoid: true
	});
  PackageExtra.associate = function(models) {
		PackageExtra.hasMany(models.PackageOptionExtra, {onDelete: 'cascade'})
  };
  return PackageExtra;
};