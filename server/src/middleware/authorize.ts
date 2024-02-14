import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';

dotenv.config();

export const authorize = (request: Request, response: Response, next: NextFunction) => {
    const authKey = request.headers.authorization;

    if (!authKey || authKey !== process.env.AUTH_KEY) {
        return next(createHttpError(401, 'Unauthorized'));
    }
    next();
};
