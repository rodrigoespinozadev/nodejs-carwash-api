const { ClientAddress } = require('../models')

module.exports.create = async (obj) => {
	return await ClientAddress.create(obj)
}

module.exports.getAll = async (ClientId) => {
	return await ClientAddress.findAll({ where : { ClientId } })
}

module.exports.getAddress = async (ClientId, id) => {
	return await ClientAddress.findOne({ where : { ClientId, id } })
}

module.exports.update = async (id, updateObj) => {
	try {
		const addressToUpdate = await ClientAddress.findOne({ where : {id : id, ClientId : updateObj.ClientId} })

		if (addressToUpdate) {
			await addressToUpdate.update(updateObj)
			return updateObj
		}
	} catch (err) {
		throw err
	}
}

module.exports.delete = async (ClientId, id) => {
	try {
		const addressToDelete = await ClientAddress.findOne({ where: { id: Number(id), ClientId: Number(ClientId) } });

		if (addressToDelete) {
			const deletedAddress = await ClientAddress.destroy({ where: { id: Number(id), ClientId: Number(ClientId) } });
			return deletedAddress;
		}
		return null;
	} catch (error) {
		throw error;
	}
}