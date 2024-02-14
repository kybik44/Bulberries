import express from 'express';
import {
    basketCount,
    becomeSeller,
    getProducts,
    getProductsByCategory,
    search,
    updateBasket,
    viewBasket,
} from '../controller/client';
const router = express.Router();

router.get('/getProducts', getProducts);
router.get('/getProductsByCategory', getProductsByCategory);
router.get('/viewBasket', viewBasket);
router.get('/search/:searchTerm', search);
router.get('/basketCount', basketCount);
router.post('/becomeSeller', becomeSeller);
router.post('/updateBasket', updateBasket);

export default router;
