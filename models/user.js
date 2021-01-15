const bcrypt = require('bcrypt');

'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
		email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    full_name: DataTypes.STRING,
    last_access: DataTypes.DATE
	}, {
		paranoid: true
	});
	
  User.associate = function(models) {
		User.hasMany(models.Employee, {as: 'Employee'})
		User.hasMany(models.AuthToken);
	};
	
	User.authenticate = async function(username, password) {
    const user = await User.findOne({ where: { username } });
    if (bcrypt.compareSync(password, user.password)) {
      return user.authorize();
    }

    throw new Error('invalid password');
	}
	
	User.prototype.authorize = async function () {
    const { AuthToken } = sequelize.models;
    const user = this
    const authToken = await AuthToken.generate(this.id);
    await user.addAuthToken(authToken);

    return { user, authToken }
  };

  User.prototype.logout = async function (token) {
    sequelize.models.AuthToken.destroy({ where: { token } });
	};
	
  return User;
};