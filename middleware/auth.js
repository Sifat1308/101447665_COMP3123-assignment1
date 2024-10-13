const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model defined

// Middleware function to verify JWT token
const auth = (req, res, next) => {
    // Get token from headers
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // Check if token is provided
    if (!token) {
        return res.status(401).json({ status: false, message: 'Access denied. No token provided.' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure you have a JWT_SECRET in your environment variables
        req.user = decoded; // Store user information in request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(400).json({ status: false, message: 'Invalid token.' });
    }
};

module.exports = auth;
