import express from 'express';
import { login, signup } from '../controller/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', signup);
// router.get('/logout', logout);

export default router;
