var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController')
var EmployeeController = require('../controllers/EmployeeController')

// All users
router.get('/', UserController.getAllUsers);

// Authorization
router.post('/login', UserController.login);
router.delete('/logout', UserController.logout);
router.get('/me', UserController.me);

// Crud
router.post('/', UserController.register);
router.get('/:id', UserController.getUser);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

router.get('/:id/employees', EmployeeController.getAll);
router.post('/:id/employees', EmployeeController.create);
router.get('/:id/employees/:employeeId', EmployeeController.getOne);
router.put('/:id/employees/:employeeId', EmployeeController.update);
router.delete('/:id/employees/:employeeId', EmployeeController.delete);

module.exports = router;
