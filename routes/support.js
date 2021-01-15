var express = require('express');
var router = express.Router();
var SupportController = require('../controllers/SupportController')

// Contact
router.post('/contact', SupportController.contact_us);

module.exports = router;
