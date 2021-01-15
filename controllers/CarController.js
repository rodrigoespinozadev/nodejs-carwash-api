const CarService = require('../services/CarService')

module.exports.getAll = async (req, res) => {
	const { user, headers: { 'x-access-token': authToken } } = req
	const { id } = req.params;

	try {
		let cars = await CarService.getAll(authToken ? user.id : id)
		res.json(cars)
	} catch (err) {
		res.status(400).send(err);
	}
}

module.exports.getCar = async (req, res) => {
	const { id, carId } = req.params;
	let car = await CarService.getCar(id, carId)
	res.json(car)
}

module.exports.create = async (req, res) => {
	const { user, headers: { 'x-access-token': authToken } } = req
	const { name, make, model, year, description, FileId } = req.body
	const { id } = req.params;
	
	console.log(req.body)

	if (!name || !description) {
    return res.status(400).send('request missing required params');
	}
	
	try {
		let car = await CarService.create({ name, make, model, year, description, FileId, ClientId : authToken ? user.id : id })
		let carObj = await CarService.getCar(authToken ? user.id : id, car.id)
		res.json(carObj)
	} catch (err) {
		res.status(400).send(err);
	}
}

module.exports.update = async (req, res) => {
	const { user, headers: { 'x-access-token': authToken } } = req
	const { name, make, model, year, description, FileId } = req.body
	const { id, carId } = req.params;

	if (!name || !description) {
    return res.status(400).send('request missing required params');
	}
	
	try {
		let car = await CarService.update(carId, { name, make, model, year, description, FileId, ClientId : authToken ? user.id : id })
		res.json(car)
	} catch (err) {
		res.status(400).send(err);
	}
}

module.exports.delete = async (req, res) => {
	const { user, headers: { 'x-access-token': authToken } } = req
	const { id, carId } = req.params;

	if (!Number(id) || !Number(carId)) {
		return res.status(400).send('Please input a valid numeric value');
	}

	try {
		const carToDelete = await CarService.delete(authToken ? user.id : id, carId);

		if (carToDelete) {
			res.status(200).send('car deleted')
		} else {
			res.status(404).send(`car with the id ${carId} cannot be found`);
		}
	} catch (err) {
		res.status(400).send(err);
	}
}
