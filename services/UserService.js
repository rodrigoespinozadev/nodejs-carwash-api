const bcrypt = require('bcrypt');
const { User } = require('../models')

module.exports.addUser = async (obj) => { 
	const hash = bcrypt.hashSync(obj.password, 10);
  return await User.create(Object.assign(obj, { password: hash }));
};

module.exports.authenticate = async ({username, password}) => {
	return await User.authenticate(username, password)
}

module.exports.getAllUsers = async () => {
  return await User.findAll({ 
		attributes: ['id', 'email', 'username', 'full_name', 'last_access', 'createdAt', 'updatedAt'],
		include: [{ all: true, nested: true }]
	});
};

module.exports.getUser = async id => {
  return await User.findOne({
		where: { id: id},
		attributes: ['id', 'email', 'username', 'full_name', 'last_access', 'createdAt', 'updatedAt'],
		include: [{ all: true, nested: true }]
	});
};

module.exports.update = async (id, objUpdate) => {
	try {
		const userToUpdate = await User.findOne({ where : {id : id}})

		if (userToUpdate) {
			await User.update(objUpdate, { where : { id: id }})
			return objUpdate
		}
	} catch (err) {
		throw err
	}
}

module.exports.delete = async (id) => {
	try {
		const userToDelete = await User.findOne({ where: { id: Number(id) } });

		if (userToDelete) {
			const deletedUser = await User.destroy({
				where: { id: Number(id) }
			});
			return deletedUser;
		}
		return null;
	} catch (error) {
		throw error;
	}
}