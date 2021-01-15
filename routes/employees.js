var express = require('express');
var router = express.Router();
var EmployeeController = require('../controllers/EmployeeController')

router.get('/', EmployeeController.getAll);
router.post('/', EmployeeController.create);
router.get('/:id', EmployeeController.getOne);
router.put('/:id', EmployeeController.update);
router.delete('/:id', EmployeeController.delete);

module.exports = router;
