var express = require('express');
var router = express.Router();
var ClientController = require('../controllers/ClientController')
var CarController = require('../controllers/CarController')
var AddressController = require('../controllers/AddressController')
var ReservationController = require('../controllers/ReservationController')

// All users
router.get('/', ClientController.getAll);

// Authorization
router.post('/login', ClientController.login);
router.delete('/logout', ClientController.logout);
router.get('/me', ClientController.me);

// Client Crud
router.post('/', ClientController.register);
router.get('/:id', ClientController.getClient);
router.put('/:id', ClientController.update);
router.delete('/:id', ClientController.delete);

// Client Car Crud
router.post('/:id/cars', CarController.create);
router.get('/:id/cars', CarController.getAll);
router.get('/:id/cars/:carId', CarController.getCar);
router.put('/:id/cars/:carId', CarController.update);
router.delete('/:id/cars/:carId', CarController.delete);

// Client Address Crud
router.post('/:id/addresses', AddressController.create);
router.get('/:id/addresses', AddressController.getAll);
router.get('/:id/addresses/:addressId', AddressController.getAddress);
router.put('/:id/addresses/:addressId', AddressController.update);
router.delete('/:id/addresses/:addressId', AddressController.delete);

// Client Reservation Crud
router.get('/:id/reservations', ReservationController.getAllByClientId);
router.get('/:id/unavailable/dates', ReservationController.getUnavailableDates);
router.post('/:id/reservations', ReservationController.create);
router.get('/:id/reservations/:reservationId', ReservationController.getOne);
router.put('/:id/reservations/:reservationId', ReservationController.update);
//router.delete('/:id/reservation/:reservationId', ReservationController.delete);

module.exports = router;
