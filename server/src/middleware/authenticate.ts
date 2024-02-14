import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { Schema } from 'mongoose';
import User, { IUser } from '../models/User';
import asyncErrorHandler from '../utils/asyncErrorHandler';

dotenv.config();
export interface IRequest extends Request {
    userId?: Schema.Types.ObjectId;
}
export const authenticate = asyncErrorHandler(
    async (request: IRequest, response: Response, next: NextFunction) => {
        const token = request.headers.authorization;
        if (token) {
            const userData = jwt.verify(token, process.env.JWT_SECRET_KEY!) as {
                _id: Schema.Types.ObjectId;
            };
            // Check in DB
            const user: IUser | null = await User.findById(userData._id);
            if (user) {
                request.userId = userData._id;
                return next();
            }
            return next(createHttpError(401, 'Only sellers are allowed'));
        } else {
            return next(createHttpError(404, 'Token not found'));
        }
    }
);
