const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://sifatanand13:gdeo6E2tW8VznrJE@cluster1.knby9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1'; 

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


