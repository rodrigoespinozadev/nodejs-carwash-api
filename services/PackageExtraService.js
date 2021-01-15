const { PackageExtra } = require('../models')

module.exports.getAll = async () => {
	return await PackageExtra.findAll()
}

module.exports.getOne = async (id) => {
	return await PackageExtra.findOne({ where : { id: id }, include: [{ all: true, nested: true }] })
}

module.exports.create = async (obj) => {
	return await PackageExtra.create(obj)
}

module.exports.update = async (id, updateObj) => {
	try {
		const ojbToUpdate = await PackageExtra.findOne({ where : {id : id} })

		if (ojbToUpdate) {
			await ojbToUpdate.update(updateObj)
			return updateObj
		}
	} catch (err) {
		throw err
	}
}

module.exports.delete = async (id) => {
	try {
		const objToDelete = await PackageExtra.findOne({ where: { id: Number(id) } });

		if (objToDelete) {
			const deletedObj = await PackageExtra.destroy({ where: { id: Number(id) } });
			return deletedObj;
		}
		return null;
	} catch (error) {
		throw error;
	}
}