import express from 'express';
import {
    createGroup,
    getGroup,
    updateGroup,
    deleteGroup,
    addMember,
    removeMember,
    allGroups,
    
} from '../controller/groupController.js';
import auth from '../middleware/auth.js';
import { adminAuth } from '../middleware/admin.js';

const router = express.Router();

router.post('/create', auth, createGroup);
router.delete('/delete/:groupId', auth, deleteGroup);
router.put('/addMember/:groupId', auth, addMember);
router.put('/:groupId/leave', auth, removeMember);
router.get('/groups', auth, allGroups); // <-- Place this route before /:groupId
router.get('/:groupId', auth, getGroup); // <-- This route should be after /groups



export default router;

