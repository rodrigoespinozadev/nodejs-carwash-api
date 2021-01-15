const { 
	Employee, 
	Reservation, 
	Client, 
	ClientProfile, 
	ClientAddress, 
	ClientCar, 
	Package, 
	PackageOptionExtra, 
	PackageExtra, 
	File 
} = require('../models')

module.exports.getAll = async () => {
	return await Employee.findAll() // { include: [{ all: true, nested: true }]}
}

module.exports.getOne = async (EmployeeId) => {
	return await Employee.findOne({ where : { id: EmployeeId }, include: [
		//{ all: true, nested: true }
		{ model: Reservation, include: [
			//{ model: Employee, as: 'Employee', attributes: ['id', 'full_name', 'photo'] },
			{ model: Client, as: 'Client', attributes: ['id'], include: [{ model: ClientProfile, attributes: ['full_name', 'email', 'phone'] }] },
			{ model: ClientAddress, as: 'ClientAddress', attributes: ['id', 'name', 'address', 'lat', 'lng'] },
			{ model: ClientCar, as: 'ClientCar', attributes: ['id', 'name', 'description', 'make', 'model', 'year'], include: [{ model: File }] },
			{ model: Package, as: 'Package', include: [{ model: PackageOptionExtra, attributes: ['id'], include: [ { model: PackageExtra, attributes: ['id', 'name', 'description', 'price'], as: 'PackageExtra' } ] }] }
		] }
	] })
}

module.exports.create = async (obj) => {
	return await Employee.create(obj)
}

module.exports.update = async (id, updateObj) => {
	try {
		const ojbToUpdate = await Employee.findOne({ where : {id : id} })

		if (ojbToUpdate) {
			await ojbToUpdate.update(updateObj)
			return updateObj
		}
	} catch (err) {
		throw err
	}
}

module.exports.delete = async (EmployeeId) => {
	try {
		const objToDelete = await Employee.findOne({ where: { id: EmployeeId } });

		if (objToDelete) {
			const deletedObj = await Employee.destroy({ where: { id: EmployeeId } });
			return deletedObj;
		}
		return null;
	} catch (error) {
		throw error;
	}
}