import { NextFunction, Response } from 'express';
import createHttpError from 'http-errors';
import { v4 as uuidv4 } from 'uuid';
import { IRequest } from '../middleware/authenticateSeller';
import Product, { IProduct } from '../models/Product';
import asyncErrorHandler from '../utils/asyncErrorHandler';
import uploadImage from '../utils/uploadImage';

// Add Product
export const addProduct = asyncErrorHandler(
    async (request: IRequest, response: Response, next: NextFunction) => {
        const userId = request.userId;
        const { name, category, description, price, base64Image } = request.body;
        const imageId = uuidv4().split('-')[0];

        const imageUrl = await uploadImage(base64Image, imageId);
        if (typeof imageUrl != 'string') {
            return next(createHttpError(500, 'Unknow error occured'));
        }

        if (userId) {
            const product = new Product<IProduct>({
                name,
                category,
                description,
                price,
                imageUrl,
                userId,
            });
            const result = await product.save();
            return response.json(result);
        }
        next(createHttpError(401, 'Request not allowed'));
    }
);

// Delete product
export const deleteProduct = asyncErrorHandler(
    async (request: IRequest, response: Response, next: NextFunction) => {
        const userId = request.userId;
        const { productId } = request.body;

        if (userId) {
            const product = Product.findOneAndDelete({
                _id: productId,
                userId: userId,
            });
            const deletedProduct = await product.exec();
            if (deletedProduct) {
                response.json({ status: 'success', message: 'Product deleted' });
            } else {
                next(createHttpError(404, 'Product not found'));
            }
        }
    }
);

// Get Seller Products
export const getProducts = asyncErrorHandler(
    async (request: IRequest, response: Response, next: NextFunction) => {
        const userId = request.userId;
        const { pageNumber, limit } = request.params;
        const query = Product.find({ userId })
            .sort({ created: -1 })
            .skip((Number(pageNumber) - 1) * Number(limit))
            .limit(Number(limit));
        const products = await query.exec();
        response.json(products);
    }
);

//TODO: Update Product
