import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import Seller from '../models/Seller';
import User, { IUser } from '../models/User';
import asyncErrorHandler from '../utils/asyncErrorHandler';
import { encPassword, verifyPassword } from '../utils/password';

dotenv.config();

// Signup
export const signUp = asyncErrorHandler(
    async (req: Request, res: Response) => {
        const { name, email, password } = req.body;
        const hashedPassword = await encPassword(password);
        const user = new User({ name, email, password: hashedPassword });
        const response = await user.save();
        const responseObject = response.toObject();
        delete responseObject.password;
        const token = jwt.sign(responseObject, process.env.JWT_SECRET_KEY!);
        res.cookie('cookieName', 'cookies', { maxAge: 900000, httpOnly: true });
        res.json(responseObject);
    }
);

// Signin
export const signIn = asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        const user: IUser | null = await User.findOne({
            email: email.toLowerCase(),
        }).select('+password');

        if (user) {
            const hashedPassword = user.password as string;
            const isMatch = await verifyPassword(password, hashedPassword);

            if (isMatch) {
                const response = user.toObject();
                const checkSeller = await Seller.findOne({
                    userId: response._id,
                });
                const licenseId = checkSeller?.licenseId || 0;

                delete response.password;
                const token = jwt.sign(response, process.env.JWT_SECRET_KEY!);
                res.cookie('ezToken', token);
                res.json({ status: 'Success', licenseId, ...response, token });
            } else {
                next(createHttpError(404, 'Пользователь не найден'));
            }
        } else {
            next(createHttpError(404, 'Пользователь не найден'));
        }
    }
);

// Reset password
export const resetPassword = asyncErrorHandler(
    async (request: Request, response: Response, next: NextFunction) => {
        const { email, password } = request.body;
        const hashedPassword = await encPassword(password);

        const user: IUser | null = await User.findOneAndUpdate(
            {
                email: email.toLowerCase(),
            },
            { password: hashedPassword },
            {
                new: true,
            }
        );
        if (user) {
            response.json({ status: 'Success', message: 'Пароль изменён' });
        } else {
            next(createHttpError(404, 'Пользователь не найден'));
        }
    }
);
