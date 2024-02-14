import express from 'express';
import { resetPassword, signIn, signUp } from '../controller/auth';
const router = express.Router();

router.post('/signin', signIn);
router.post('/signup', signUp);
router.post('/resetPassword', resetPassword);

export default router;
