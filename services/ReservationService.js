const { 
	Client, 
	Package, 
	Employee, 
	ClientCar, 
	Sequelize,
	sequelize,
	Reservation, 
	PackageExtra, 
	ClientProfile,
	ClientAddress, 
	PackageOptionExtra
} = require('../models')
const mailService = require('../services/MailService')
const OneSignal = require('onesignal-node');
const moment = require('moment')

module.exports.getAll = async () => {
	return await Reservation.findAll({include: [ 
		{ model: Client, as: 'Client', attributes: ['id', 'username'], include: [ClientProfile] },
		{ model: Employee, as: 'Employee' },
		{ model: ClientAddress, as: 'ClientAddress' },
		{ model: ClientCar, as: 'ClientCar' },
		{ model: Package, as: 'Package' },
		{ model: PackageOptionExtra, include: [{model: PackageExtra, as: 'PackageExtra'}] }
	]})
}

module.exports.getUnavailableDates = async (req) => {
	const { date } = req.query
	let array_date = date.split('-')
	let year = array_date[0]
	let month = array_date[1]

	return await sequelize.query(`SELECT 
		scheduled_date,
		(SELECT COUNT(*) FROM Reservations WHERE status = 1 AND DATE(schedule_date) = scheduled_date) AS count 
	FROM (
		SELECT 
			DATE(schedule_date) AS scheduled_date
		FROM 
			Reservations WHERE status = 1
			AND YEAR(schedule_date) = ${year} 
			AND MONTH(schedule_date) = ${month}
	) tmp
	GROUP BY scheduled_date`, { type: Sequelize.QueryTypes.SELECT })
}

module.exports.getAllByClientId = async (ClientId, filter) => {
	return await Reservation.findAll({ where: { ClientId, ...filter }, order: [ ['createdAt', 'DESC'] ],  include: [ 
		{ model: Client, as: 'Client', attributes: ['id', 'username'], include: [ClientProfile] },
		//{ model: Employee, as: 'Employee' },
		{ model: ClientAddress, as: 'ClientAddress' },
		{ model: ClientCar, as: 'ClientCar' },
		{ model: Package, as: 'Package' },
		{ model: PackageOptionExtra, include: [{model: PackageExtra, as: 'PackageExtra'}] }
	]})
}

module.exports.getOne = async (id) => {
	return await Reservation.findOne({ where : { id: id }, include: [ 
		{ model: Client, as: 'Client', attributes: ['id', 'username'], include: [ClientProfile] },
		{ model: Employee, as: 'Employee' },
		{ model: ClientAddress, as: 'ClientAddress' },
		{ model: ClientCar, as: 'ClientCar' },
		{ model: Package, as: 'Package' },
		{ model: PackageOptionExtra, include: [{model: PackageExtra, as: 'PackageExtra'}] }
	]})
}

module.exports.create = async (obj) => {
	return await Reservation.create(obj)
}

module.exports.update = async (id, updateObj, reset_options = false) => {
	const OneSignalClient = new OneSignal.Client(process.env['ONESIGNAL_APP_ID'], process.env['ONESIGNAL_API_KEY']);

	try {
		const ojbToUpdate = await Reservation.findOne({ where : {id : id} })

		if (ojbToUpdate) {
			await ojbToUpdate.update(updateObj)

			if (reset_options) {
				await ojbToUpdate.removeOptionExtras(updateObj.options || [])	
			}

			if (updateObj.status) {
				switch (updateObj.status) {
					case 1: // aprobado
						moment.locale('es');
						let fechaReservacion = moment(ojbToUpdate.schedule_date).format('L h:mm A')
						const notification = {
							contents: {
								'en': `Su Reservacion del dia ${fechaReservacion} fue aprobada!`,
							},
							headings: { en: 'Reservación Aprobada' },
							android_channel_id: '',
							priority: 10,
							filters: [
								{ field: 'tag', key: 'UserId', relation: '=', value: ojbToUpdate.ClientId }
							]
						};
						
						// using async/await
						try {
							const response = await OneSignalClient.createNotification(notification);
							console.log(response.body.id);
						} catch (e) {
							if (e instanceof OneSignal.HTTPError) {
								// When status code of HTTP response is not 2xx, HTTPError is thrown.
								console.log(e.statusCode);
								console.log(e.body);
							}
						}
					break;
					case 2: // pospuesto
						
						break;
					case 3: // cancelado
						//ojbToUpdate.setCanceled()
						//mailService.send_mail_admin('Pedido Canelado', 'Mensaje del pedido cancelado')
						break;
					case 4: // finalizado

					break;
				}
			}

			return updateObj
		}
	} catch (err) {
		throw err
	}
}

module.exports.delete = async (id) => {
	try {
		const objToDelete = await Reservation.findOne({ where: { id: Number(id) } });

		if (objToDelete) {
			const deletedObj = await Reservation.destroy({ where: { id: Number(id) } });
			return deletedObj;
		}
		return null;
	} catch (error) {
		throw error;
	}
}