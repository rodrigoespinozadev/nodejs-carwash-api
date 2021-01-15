'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    notes: DataTypes.TEXT,
    schedule_date: DataTypes.DATE,
    payment: DataTypes.STRING,
    status: DataTypes.INTEGER,
    canceled_date: DataTypes.DATE
  }, {
		paranoid: true
	});
  Reservation.associate = function(models) {
    // associations can be defined here
    Reservation.belongsTo(models.Client, {as: 'Client'})
    Reservation.belongsTo(models.Employee, {as: 'Employee'})
    Reservation.belongsTo(models.ClientAddress, {as: 'ClientAddress'})
    Reservation.belongsTo(models.ClientCar, {as: 'ClientCar'})
    Reservation.belongsTo(models.Package, {as: 'Package'})
    Reservation.belongsToMany(models.PackageOptionExtra, {through: 'ReservationOption'});
	};
	
	Reservation.prototype.setCanceled = function() {
		this.canceled_date = sequelize.literal('NOW()')
		this.save()
	}

	Reservation.prototype.removeOptionExtras = async function(options = []) {
		await sequelize.query(`DELETE FROM ReservationOption WHERE ReservationId = ${this.id}`)

		return new Promise((resolve, reject) => {
			if (options.length) {
				for (let x in options) {
					this.addPackageOptionExtra(options[x])
				}
			}
			setTimeout( function() {
				resolve("Success!")
			}, 250) 
		})
	}

	Reservation.countReservations = async function(query) {
		return await Reservation.count({where : query})
	}

  return Reservation;
};