const EmployeeService = require('../services/EmployeeService')

module.exports.getAll = async (req, res) => {
	try {
		let objs = await EmployeeService.getAll()
		res.json(objs)
	} catch (err) {
		res.status(400).send(err);
	}
}

module.exports.getOne = async (req, res) => {
	const { id } = req.params;
	let obj = await EmployeeService.getOne(id)
	res.json(obj)
}

module.exports.create = async (req, res) => {
	const { full_name } = req.body
	const { id } = req.params;
	
	if (!full_name) {
  	return res.status(400).send('request missing required params');
	}
	
	try {
		let obj = await EmployeeService.create({ UserId: id, full_name })
		res.json(obj)
	} catch (err) {
		res.status(400).send(err);
	}
}

module.exports.update = async (req, res) => {
	const { full_name } = req.body
	const { id, employeeId } = req.params;

	if (!full_name) {
			return res.status(400).send('request missing required params');
	}
	
	try {
		let obj = await EmployeeService.update(employeeId, { UserId: id, full_name })
		res.json(obj)
	} catch (err) {
		res.status(400).send(err);
	}
}

module.exports.delete = async (req, res) => {
	const { id, employeeId } = req.params;

	if (!Number(id)) {
		return res.status(400).send('Please input a valid numeric value');
	}

	try {
		const obToDelete = await EmployeeService.delete(id, employeeId);

		if (obToDelete) {
			res.status(200).send('package option deleted')
		} else {
			res.status(404).send(`package option with the id ${id} cannot be found`);
		}
	} catch (err) {
		res.status(400).send(err);
	}
}
