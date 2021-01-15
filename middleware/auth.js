const { User, Client, AuthToken, ClientAuthToken } = require('../models');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const authToken = await AuthToken.findOne({ 
			where: { token }, 
			include: [
				{ 
					model : User,
					attributes: ['id', 'email', 'username', 'full_name', 'last_access', 'createdAt', 'updatedAt']
				}
			]
		});

    if (authToken) {
			req.user = authToken.User;
    } else {
			return res.status(401).send('Acceso no authorizado');
		}
	}
	
	const clientToken = req.headers['x-access-token']
	console.log('clientToken', clientToken)

	if (clientToken && clientToken != 'null') {
    const clientAuthToken = await ClientAuthToken.findOne({ 
			where: { token: clientToken }, 
			include: [
				{ 
					model : Client,
					attributes: ['id']
				}
			]
		});

    if (clientAuthToken) {
			req.user = clientAuthToken.Client;
    } else {
			return res.status(401).send('Acceso no authorizado');
		}
	}

	next();
}