const bcrypt = require('bcrypt');

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    last_access: DataTypes.STRING
  }, {
		paranoid: true
	});
  Client.associate = (models) => {
    // associations can be defined here
    Client.hasOne(models.ClientProfile)
    Client.hasMany(models.ClientAddress, {as: 'ClientAddress'})
    Client.hasMany(models.ClientCar, {as: 'ClientCar'})
		Client.hasMany(models.Reservation, {as: 'Reservation'})
		Client.hasMany(models.ClientAuthToken);
	};
	
	Client.authenticate = async (email, password) => {
		const { ClientProfile, ClientAuthToken } = sequelize.models;
		const clientProfile = await ClientProfile.findOne({ where: { email } });
		const client = await Client.findByPk(clientProfile.ClientId);
		client.update({ last_access: sequelize.literal('NOW()') })
		
		if (bcrypt.compareSync(password, client.password)) {
			//ClientAuthToken.destroy({ where: { ClientId: client.id } })
      return client.authorize();
    }

    throw 'invalid password';
	}

	Client.prototype.generateProfile = async function(email, phone, full_name) {
		const { ClientProfile } = sequelize.models;
		const clientObj = this
		const clientProfile = await ClientProfile.generate(this.id, email, phone, full_name);
		let client = clientObj.toJSON()
		delete client.password
    return { client, clientProfile }
	};
	
	Client.prototype.authorize = async function() {
    const { ClientAuthToken, ClientProfile } = sequelize.models;
    const clientOld = this
		const clientAuthToken = await ClientAuthToken.generate(this.id);
		const clientProfile = await ClientProfile.findOne({where : {ClientId: this.id}});
		//await clientOld.addClientAuthToken(clientAuthToken);
		let client = clientOld.toJSON()
		delete client.password
    return { client, clientAuthToken, clientProfile }
  };

  Client.prototype.logout = async (token) => {
		const { ClientAuthToken } = sequelize.models
		ClientAuthToken.destroy({ where: { token } });
	};

  return Client;
};