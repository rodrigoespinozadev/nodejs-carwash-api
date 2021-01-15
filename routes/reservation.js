var express = require('express');
var router = express.Router();
var ReservationController = require('../controllers/ReservationController')

// All reservations
router.get('/', ReservationController.getAll);
// Get single
router.get('/:id', ReservationController.getOne);
// Update reservation
router.put('/:id', ReservationController.update);
// Create reservation
router.post('/', ReservationController.create);

module.exports = router;
