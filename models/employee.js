'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    full_name: DataTypes.STRING,
		photo: DataTypes.STRING
  }, {
		paranoid: true
	});
  Employee.associate = function(models) {
    // associations can be defined here
    Employee.belongsTo(models.User, {as: 'User'})
    Employee.hasMany(models.Reservation)
	};

	return Employee;
};