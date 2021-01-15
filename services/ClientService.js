const bcrypt = require('bcrypt');
const { Client, ClientProfile, Sequelize } = require('../models')

const isUniqueUsername = (where) => {
  return Client.count(where)
  .then(count => {
    return (count > 0) ? true : false
  });
}

const isUniqueEmail = (where) => {
  return ClientProfile.count(where)
  .then(count => {
    return (count > 0) ? true : false
  });
}

module.exports.createClient = async (obj) => {
	//const checkUsername = await isUniqueUsername({where : { username : obj.username }})
	const checkEmail = await isUniqueEmail({where: { email : obj.email }})

	//if (checkUsername) {
		//throw "username already exists";
	//}
	if (checkEmail) {
		throw "Eliga otra cuenta de correo";
	}

	const hash = bcrypt.hashSync(obj.password, 10);
	delete obj.email
	delete obj.telefono
	delete obj.full_name
	obj.username = 'username_' + new Date().getTime()
	return await Client.create(Object.assign(obj, { password: hash }));
}

module.exports.authenticate = async ({username, password}) => {
	return await Client.authenticate(username, password)
}

module.exports.getAll = async () => {
	return await Client.findAll({ attributes: ['id', 'username', 'last_access', 'createdAt', 'updatedAt'], include: [{ all: true, nested: true }]});
};

module.exports.getClient = async id => {
  return await Client.findOne({
		where: { id: id},
		attributes: ['id', 'username', 'last_access', 'createdAt', 'updatedAt'],
		include: [{ all: true, nested: true }]
	});
};

module.exports.update = async (id, objUpdate) => {	
	//if (objUpdate.email) {
		const checkEmail = await isUniqueEmail({where: { email : objUpdate.email, ClientId : { [Sequelize.Op.notIn] : [id]} }})
		if (checkEmail) {
			throw "email already exists";
		}
	//}
	
	// if (objUpdate.username) {
	// 	const checkUsername = await isUniqueUsername({where : { username : objUpdate.username, id : { [Sequelize.Op.notIn]: [id] } }})		
	// 	if (checkUsername) {
	// 		throw "username already exists";
	// 	}
	// }

	// if (objUpdate.password) {
	// 	const hash = bcrypt.hashSync(objUpdate.password, 10);
	// 	objUpdate.password = hash
	// }

	try {
		const clientToUpdate = await ClientProfile.findOne({where : {ClientId : id}})

		if (clientToUpdate) {
			//if (objUpdate.ClientProfile) {
			return await clientToUpdate.update(objUpdate)
			//}
			//await Client.update(objUpdate, { where : { id: id }})
			//return objUpdate
		}
	} catch (err) {
		throw err
	}
}

module.exports.delete = async (id) => {
	try {
		const clientToDelete = await Client.findOne({ where: { id: Number(id) } });

		if (clientToDelete) {
			const deletedClient = await Client.destroy({
				where: { id: Number(id) }
			});
			return deletedClient;
		}
		return null;
	} catch (error) {
		throw error;
	}
}