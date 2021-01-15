const { Package, PackageOptionExtra, PackageExtra } = require('../models')

module.exports.getAll = async () => {
	return await Package.findAll({include: [{
		model: PackageOptionExtra,
		include: [{ model: PackageExtra, as: 'PackageExtra' }]
	}]})
}

module.exports.getOne = async (id) => {
	return await Package.findOne({ where : { id: id }, include: [{ all: true, nested: true }] })
}

module.exports.create = async (obj) => {
	return await Package.create(obj)
}

module.exports.update = async (id, updateObj) => {
	try {
		const ojbToUpdate = await Package.findOne({ where : {id : id} })

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
		const objToDelete = await Package.findOne({ where: { id: Number(id) } });

		if (objToDelete) {
			const deletedObj = await Package.destroy({ where: { id: Number(id) } });
			return deletedObj;
		}
		return null;
	} catch (error) {
		throw error;
	}
}