var express = require('express');
var router = express.Router();
var PackageController = require('../controllers/PackageController')
var PackageOptionController = require('../controllers/PackageOptionController')

router.get('/', PackageController.getAll);
router.post('/', PackageController.create);
router.get('/:id', PackageController.getOne);
router.put('/:id', PackageController.update);
router.delete('/:id', PackageController.delete);

router.get('/:id/options', PackageOptionController.getAll);
router.post('/:id/options', PackageOptionController.create);
router.get('/:id/options/:optionid', PackageOptionController.getOne);
router.put('/:id/options/:optionid', PackageOptionController.update);
router.delete('/:id/options/:optionid', PackageOptionController.delete);

module.exports = router;
