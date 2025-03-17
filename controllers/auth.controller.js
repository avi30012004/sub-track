import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from '../models/user.model.js';
import { JWT_SECRET, JWT_EXPIRE_IN } from '../config/env.js'

export const signup = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const { name, email, password } = req.body;
        
        //user already exists
        const existinguser = await User.findOne({ email });
        if(existinguser){
            const error = new Error("User already exists");
            error.statusCode = 400;
            throw error;
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //create user
        const newUser = await User.create([{ name, email, password: hashedPassword }], { session });
        const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRE_IN });
        await session.commitTransaction();
        session.endSession();
        res.status(201).json({ 
            success: true, 
            message: "User created successfully",
            data:{
                token,
                user: newUser[0],
            }
        });
    }catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

export const login = async (req, res, next) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if(!user){
            const error = new Error("Invalid credentials");
            error.statusCode = 401;
            throw error;
        }

        const ispasswordValid = await bcrypt.compare(password, user.password);
        if(!ispasswordValid){
            const error = new Error("Invalid credentials");
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRE_IN });
        res.status(200).json({ 
            success: true, 
            message: "User logged in successfully",
            data:{
                token,
                user,
            }
        });
    }catch(error){
        next(error);
    }
};

export const logout = async (req, res, next) => {};