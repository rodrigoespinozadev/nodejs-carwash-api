'use strict';
module.exports = (sequelize, DataTypes) => {
  const ClientProfile = sequelize.define('ClientProfile', {
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
		paranoid: true
	});
  ClientProfile.associate = function(models) {
    ClientProfile.belongsTo(models.Client, {as: 'Client'})
	};
	
	ClientProfile.generate = async (ClientId, email, phone, full_name) => {
    if (!ClientId) {
      throw 'requires a user ID'
		}

    return ClientProfile.create({ email, ClientId, phone, full_name })
	}
	
  return ClientProfile;
};