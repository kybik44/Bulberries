import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { IRequest } from '../middleware/authenticateSeller';
import Basket, { IBasket } from '../models/Basket';
import Product from '../models/Product';
import Seller, { ISeller } from '../models/Seller';
import asyncErrorHandler from '../utils/asyncErrorHandler';

// Become to Seller
export const becomeSeller = asyncErrorHandler(
    async (request: IRequest, res: Response, next: NextFunction) => {
        const userId = request.userId;
        const { licenseId } = request.body;
        const sellerExist = await Seller.findOne({ userId });
        if (!sellerExist) {
            if (userId) {
                const seller = new Seller<ISeller>({ userId, licenseId });
                const response = await seller.save();
                const responseObj = response.toObject();
                return res.status(201).json({ status: 'success', ...responseObj });
            }
        } else {
            return res
                .status(200)
                .json({ status: 'success', message: 'Вы продавец' });
        }
        next(createHttpError(401, 'Request not allowed'));
    }
);

// Get all products
export const getProducts = asyncErrorHandler(
    async (request: Request, response: Response, next: NextFunction) => {
        const { pageNumber, limit } = request.query;
        const query = Product.find()
            .sort({ created: -1 })
            .skip((Number(pageNumber) - 1) * Number(limit))
            .limit(Number(limit));
        const products = await query.exec();
        response.json(products);
    }
);

// Get products by category with default sorting
export const getProductsByCategory = asyncErrorHandler(
    async (request: Request, response: Response, next: NextFunction) => {
        const { category, pageNumber, limit } = request.query;
        const query = Product.find({ category: category })
            .sort({ created: -1 })
            .skip((Number(pageNumber) - 1) * Number(limit))
            .limit(Number(limit));
        const products = await query.exec();
        response.json(products);
    }
);

// Add to basket
export const updateBasket = asyncErrorHandler(
    async (req: IRequest, res: Response, next: NextFunction) => {
        const userId = req.userId;
        const { productId, quantity } = req.body;
        if (userId) {
            if (quantity == 0) {
                await Basket.findOneAndDelete({ userId, productId });
                return res.json({
                    status: 'success',
                    message: 'Товар удален',
                });
            }
            const updateBasket = await Basket.findOneAndUpdate(
                { productId, userId },
                { $inc: { quantity } },
                { new: true }
            );
            if (updateBasket) {
                return res.json(updateBasket);
            }
            const basket = new Basket<IBasket>({ productId, userId, quantity });
            const result = await basket.save();
            return res.json(result);
        }
        next(createHttpError(404, 'Пользователь не найден'));
    }
);

// View Basket
export const viewBasket = asyncErrorHandler(
    async (req: IRequest, res: Response, next: NextFunction) => {
        const userId = req.userId;
        if (userId) {
            const basket = await Basket.aggregate([
                {
                    $lookup: {
                        from: 'products',
                        localField: 'productId',
                        foreignField: '_id',
                        as: 'productData',
                    },
                },
            ]);
            return res.json(basket);
        }
        next(createHttpError(404, 'Пользователь не найден'));
    }
);

// Get Basket Count
export const basketCount = asyncErrorHandler(
    async (req: IRequest, res: Response, next: NextFunction) => {
        const userId = req.userId;
        const count = await Basket.countDocuments({ userId });
        return res.json(count);
    }
);

// Search
export const search = asyncErrorHandler(async (req, res, next) => {
    const { searchTerm } = req.params;
    const results = await Product.find({
        $or: [
            { name: { $regex: searchTerm, $options: 'i' } },
            { description: { $regex: searchTerm, $options: 'i' } },
        ],
    }).exec();
    console.log(results);

    res.json(results);
});
// TODO:
// Add to wishList
// Remove from wishlist
// Product rating
// Product Reviews
