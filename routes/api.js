const express = require('express');
const { body, validationResult } = require('express-validator');
const userController = require('../controllers/userController');
const employeeController = require('../controllers/employeeController');
const router = express.Router();

// User routes
router.post('/user/signup', 
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ status: false, message: errors.array() });
        next();
    },
    userController.signup
);

router.post('/user/login', 
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ status: false, message: errors.array() });
        next();
    },
    userController.login
);

// Employee routes
router.get('/emp/employees', employeeController.getAllEmployees);
router.post('/emp/employees', 
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('position').notEmpty().withMessage('Position is required'),
    body('salary').isNumeric().withMessage('Salary must be a number'),
    body('date_of_joining').isDate().withMessage('Valid date of joining is required'),
    body('department').notEmpty().withMessage('Department is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ status: false, message: errors.array() });
        next();
    },
    employeeController.createEmployee
);

router.get('/emp/employees/:eid', employeeController.getEmployeeById);
router.put('/emp/employees/:eid', employeeController.updateEmployee);
router.delete('/emp/employees', employeeController.deleteEmployee);

module.exports = router;
