import { NextFunction, Request, Response } from 'express';
import { isHttpError } from 'http-errors';

export const errorHandler = (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    let statusCode = 500;
    let errorMessage = 'Server Error';
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    response.status(statusCode).json({ status: 'failed', message: errorMessage });
};
