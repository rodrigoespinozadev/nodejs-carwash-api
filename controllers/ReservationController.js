const ReservationService = require('../services/ReservationService')

module.exports.getAll = async (req, res) => {
	try {
		let objs = await ReservationService.getAll()
		res.json(objs)
	} catch (err) {
		res.status(400).send(err);
	}
}

module.exports.getUnavailableDates = async (req, res) => {
	try {
		let dates = []
		let objs = await ReservationService.getUnavailableDates(req)

		objs.forEach(item => {
			if (item.count >= 12) {
				dates.push(item.date)
			}
		})

		res.json(dates)
	} catch (err) {
		res.status(400).send(err);
	}
}

module.exports.getAllByClientId = async (req, res) => {
	const { user, headers: { 'x-access-token': authToken } } = req
	const { id } = req.params
	const filter = req.query

	try {
		let objs = await ReservationService.getAllByClientId(authToken ? user.id : id, filter)
		res.json(objs)
	} catch (err) {
		res.status(400).send(err);
	}
}

module.exports.getOne = async (req, res) => {
	const { user, headers: { 'x-access-token': authToken } } = req
	const { id, reservationId } = req.params;
	let obj = await ReservationService.getOne(authToken ? reservationId : id)
	res.json(obj)
}

module.exports.create = async (req, res) => {
	const { user, headers: { 'x-access-token': authToken } } = req
	const { id, notes, schedule_date, payment, ClientId, ClientAddressId, ClientCarId, PackageId, options } = req.body

	let clientId = ClientId
	let obj

	if (user && authToken) {
		clientId = user.id
	}
	
	if (!schedule_date && !payment && !clientId && !ClientAddressId && !ClientCarId && !PackageId) {
  	return res.status(400).send('request missing required params');
	}
	
	if (id) {
		try {
			obj = await ReservationService.update(id, req.body, true)
			let reservation = await ReservationService.getOne(obj.id)
			res.json(reservation)
		} catch (err) {
			res.status(400).send(err);
		}
	} else {	
		try {
			obj = await ReservationService.create({ notes, schedule_date, payment, ClientId: clientId, ClientAddressId, ClientCarId, PackageId, status: 0 })
			
			if (options.length) {
				options.forEach(option => {
					obj.addPackageOptionExtra(option)
				})
			}
	
			let reservation = await ReservationService.getOne(obj.id)
			res.json(reservation)
		} catch (err) {
			res.status(400).send(err);
		}
	}	
}

module.exports.update = async (req, res) => {
	const { user, headers: { 'x-access-token': authToken } } = req
	const { id, reservationId } = req.params;

	try {
		let obj = await ReservationService.update(authToken ? reservationId : id, req.body)
		res.json(obj)
	} catch (err) {
		res.status(400).send(err);
	}
}

// module.exports.delete = async (req, res) => {
// 	const { id, optionid } = req.params;

// 	if (!Number(id)) {
// 		return res.status(400).send('Please input a valid numeric value');
// 	}

// 	try {
// 		const obToDelete = await ReservationService.delete(id, optionid);

// 		if (obToDelete) {
// 			res.status(200).send('package option deleted')
// 		} else {
// 			res.status(404).send(`package option with the id ${id} cannot be found`);
// 		}
// 	} catch (err) {
// 		res.status(400).send(err);
// 	}
// }
