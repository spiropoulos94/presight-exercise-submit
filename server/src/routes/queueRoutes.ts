import { Router } from 'express';
import { QueueController } from '../controllers/queueController';

const router = Router();

// Process a request in the background
router.post('/', QueueController.processRequest);

// Cancel all pending requests
router.post('/cancel-all', QueueController.cancelAllRequests);

export default router;
