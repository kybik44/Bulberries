import express from 'express';
import { addProduct, deleteProduct, getProducts } from '../controller/seller';
const router = express.Router();

router.get('/getProducts', getProducts);
router.post('/addProduct', addProduct);
router.post('/deleteProduct', deleteProduct);

export default router;
