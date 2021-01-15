var express = require('express');
var router = express.Router();
var PackageExtraController = require('../controllers/PackageExtraController')

router.get('/', PackageExtraController.getAll);
router.post('/', PackageExtraController.create);
router.get('/:id', PackageExtraController.getOne);
router.put('/:id', PackageExtraController.update);
router.delete('/:id', PackageExtraController.delete);

module.exports = router;
