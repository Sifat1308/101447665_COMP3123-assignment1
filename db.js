const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/comp3123'; 

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

module.exports = connectDB;


