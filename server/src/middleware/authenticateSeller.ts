import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { Schema } from 'mongoose';
import Seller, { ISeller } from '../models/Seller';
import asyncErrorHandler from '../utils/asyncErrorHandler';

dotenv.config();
export interface IRequest extends Request {
    userId?: Schema.Types.ObjectId;
}
export const authenticateSeller = asyncErrorHandler(
    async (request: IRequest, response: Response, next: NextFunction) => {
        const userId = request.userId;

        // Check in DB
        const seller: ISeller | null = await Seller.findOne({ userId });

        if (seller) {
            return next();
        }
        next(createHttpError(401, 'Only sellers are allowed'));
    }
);
