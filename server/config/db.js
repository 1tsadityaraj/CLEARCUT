const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
        if (mongoose.connection.readyState >= 1) {
            return;
        }

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        console.warn('Continuing without database connection (API functionality will be limited)');
        // Don't exit process in serverless/production to avoid crashing the container immediately
        // allowing potential retry or partial functionality
    }
};

module.exports = connectDB;
