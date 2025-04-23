import { Router } from 'express';
import { StreamController } from '../controllers/streamController';

const router = Router();

// Stream text character by character
router.get('/', StreamController.streamText);

export default router; 