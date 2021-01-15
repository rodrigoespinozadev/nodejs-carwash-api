const AddressService = require('../services/AddressService')

module.exports.getAll = async (req, res) => {
	const { user, headers: { 'x-access-token': authToken } } = req
	const { id } = req.params;
	
	try {
		let cars = await AddressService.getAll(authToken ? user.id : id)
		res.json(cars)
	} catch (err) {
		res.status(400).send(err);
	}
}

module.exports.create = async (req, res) => {
	const { user, headers: { 'x-access-token': authToken } } = req
	const { name, lat, lng, address } = req.body
	const { id } = req.params;
	
	if (!name || !lat || !lng) {
    return res.status(400).send('request missing required params');
	}
	
	try {
		let addressObj = await AddressService.create({ name, lat, lng, address, ClientId : authToken ? user.id : id })
		res.json(addressObj)
	} catch (err) {
		res.status(400).send(err);
	}
}

module.exports.update = async (req, res) => {
	const { user, headers: { 'x-access-token': authToken } } = req
	const { name, lat, lng, address } = req.body
	const { id, addressId } = req.params;

	if (!name || !lat || !lng) {
    return res.status(400).send('request missing required params');
	}
	
	try {
		let addressUpdate = await AddressService.update(addressId, { name, lat, lng, address, ClientId : authToken ? user.id : id })
		res.json(addressUpdate)
	} catch (err) {
		res.status(400).send(err);
	}
}

module.exports.delete = async (req, res) => {
	const { user, headers: { 'x-access-token': authToken } } = req
	const { id, addressId } = req.params;

	if (!Number(id) || !Number(addressId)) {
		return res.status(400).send('Please input a valid numeric value');
	}

	try {
		const addressToDelete = await AddressService.delete(authToken ? user.id : id, addressId);

		if (addressToDelete) {
			res.status(200).send('address deleted')
		} else {
			res.status(404).send(`address with the id ${addressId} cannot be found`);
		}
	} catch (err) {
		res.status(400).send(err);
	}
}

module.exports.getAddress = async (req, res) => {
	const { id, addressId } = req.params;
	let address = await AddressService.getAddress(id, addressId)
	res.json(address)
}
