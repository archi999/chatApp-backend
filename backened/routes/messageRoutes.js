import express from 'express';
import { createMessage, getMessagesByGroup } from '../controller/messageController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/:groupId/:userId', auth, createMessage);
router.get('/:groupId', auth, getMessagesByGroup);

export default router;
