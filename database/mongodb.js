import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../config/env.js';

if(!DB_URI) {
throw new Error('Please define the MONOGDB_URI in the .env<developmemt/production>.local file');
}

const connectDB = async () => {
    try {    
            await mongoose.connect(DB_URI);
            console.log(`MongoDB connected: ${NODE_ENV}`);
        } catch (error) {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        }
};

export default connectDB;