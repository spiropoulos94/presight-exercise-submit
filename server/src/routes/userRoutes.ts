import { Router } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();

// Get users with pagination and filtering
router.get('/', UserController.getUsers);

// Get filters for UI
router.get('/filters', UserController.getFilters);

export default router; 