module.exports = (sequelize, DataTypes) => {

  const ClientAuthToken = sequelize.define('ClientAuthToken', {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
		paranoid: true
	});

  ClientAuthToken.associate = function({ Client }) {
    ClientAuthToken.belongsTo(Client);
  };

  ClientAuthToken.generate = async function(ClientId) {
    if (!ClientId) {
      throw new Error('ClientAuthToken requires a user ID')
    }

    let token = '';

    const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
      'abcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 15; i++) {
      token += possibleCharacters.charAt(
        Math.floor(Math.random() * possibleCharacters.length)
      );
    }

    return ClientAuthToken.create({ token, ClientId })
  }

  return ClientAuthToken;
};