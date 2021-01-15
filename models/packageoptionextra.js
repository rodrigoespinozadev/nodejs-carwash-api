'use strict';
module.exports = (sequelize, DataTypes) => {
  const PackageOptionExtra = sequelize.define('PackageOptionExtra', {
    PackageId: DataTypes.INTEGER,
    PackageExtraId: DataTypes.INTEGER
  }, {
		paranoid: true
	});
  PackageOptionExtra.associate = function(models) {
    PackageOptionExtra.belongsToMany(models.Reservation, {through: 'ReservationOption'});
    PackageOptionExtra.belongsTo(models.Package, {as: 'Package'})
    PackageOptionExtra.belongsTo(models.PackageExtra, {as: 'PackageExtra', onDelete: 'cascade'} )
  };
  return PackageOptionExtra;
};