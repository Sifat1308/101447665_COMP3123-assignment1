const Employee = require('../models/Employee');

// Get all employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        res.status(400).json({ status: false, message: err.message });
    }
};

// Create new employee
exports.createEmployee = async (req, res) => {
    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;
    const newEmployee = new Employee({ first_name, last_name, email, position, salary, date_of_joining, department });

    try {
        await newEmployee.save();
        res.status(201).json({ message: "Employee created successfully.", employee_id: newEmployee._id });
    } catch (err) {
        res.status(400).json({ status: false, message: err.message });
    }
};

// Get employee by ID
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);
        if (!employee) return res.status(404).json({ status: false, message: "Employee not found" });
        res.status(200).json(employee);
    } catch (err) {
        res.status(400).json({ status: false, message: err.message });
    }
};

// Update employee details
exports.updateEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
        res.status(200).json({ message: "Employee details updated successfully." });
    } catch (err) {
        res.status(400).json({ status: false, message: err.message });
    }
};

// Delete employee by ID
exports.deleteEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.query.eid);
        res.status(204).json({ message: "Employee deleted successfully." });
    } catch (err) {
        res.status(400).json({ status: false, message: err.message });
    }
};
