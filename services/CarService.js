const { ClientCar, File } = require('../models')

module.exports.create = async (obj) => {
	return await ClientCar.create(obj)
}

module.exports.getAll = async (ClientId) => {
	return await ClientCar.findAll({ where : { ClientId }, include: [File] })
}

module.exports.getCar = async (ClientId, id) => {
	return await ClientCar.findOne({ where : { ClientId, id }, include: [File] })
}

module.exports.update = async (id, updateObj) => {
	try {
		const carToUpdate = await ClientCar.findOne({ where : {id : id, ClientId : updateObj.ClientId} })

		if (carToUpdate) {
			await carToUpdate.update(updateObj)
			return updateObj
		}
	} catch (err) {
		throw err
	}
}

module.exports.delete = async (ClientId, id) => {
	try {
		const carToDelete = await ClientCar.findOne({ where: { id: Number(id), ClientId: Number(ClientId) } });

		if (carToDelete) {
			const deletedCar = await ClientCar.destroy({ where: { id: Number(id), ClientId: Number(ClientId) } });
			return deletedCar;
		}
		return null;
	} catch (error) {
		throw error;
	}
}