const { PackageOptionExtra } = require('../models')

module.exports.getAll = async (id) => {
	return await PackageOptionExtra.findAll({ where : { PackageId: id }, include: [{ all: true, nested: true }]})
}

module.exports.getOne = async (id, PackageOptionId) => {
	return await PackageOptionExtra.findOne({ where : { PackageId: id, id: PackageOptionId }, include: [{ all: true, nested: true }] })
}

module.exports.create = async (obj) => {
	return await PackageOptionExtra.create(obj)
}

module.exports.update = async (id, updateObj) => {
	try {
		const ojbToUpdate = await PackageOptionExtra.findOne({ where : {id : id} })

		if (ojbToUpdate) {
			await ojbToUpdate.update(updateObj)
			return updateObj
		}
	} catch (err) {
		throw err
	}
}

module.exports.delete = async (id, PackageOptionId) => {
	try {
		const objToDelete = await PackageOptionExtra.findOne({ where: { PackageId: id, id: PackageOptionId } });

		if (objToDelete) {
			const deletedObj = await PackageOptionExtra.destroy({ where: { PackageId: id, id: PackageOptionId } });
			return deletedObj;
		}
		return null;
	} catch (error) {
		throw error;
	}
}

module.exports.deleteAll = async (PackageId) => {
	await PackageOptionExtra.destroy({ where: { PackageId } });
}