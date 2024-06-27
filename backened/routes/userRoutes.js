import express from 'express';
import auth from '../middleware/auth.js';
import {createUser,editUser , allUser , getUser} from '../controller/userController.js'
import {adminAuth} from '../middleware/admin.js'
const router = express.Router();

router.post('/create', auth,adminAuth, createUser);
router.put('/edit', auth, adminAuth,editUser);
router.get('/allUser',auth,allUser)
router.get('/:userId',getUser)
export default router;
