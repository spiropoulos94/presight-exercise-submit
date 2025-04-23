import { Router } from 'express';
import userRoutes from './userRoutes';
import streamRoutes from './streamRoutes';
import queueRoutes from './queueRoutes';

const router = Router();

// Mount routes
router.use('/api/users', userRoutes);
router.use('/api/stream-text', streamRoutes);
router.use('/api/process-request', queueRoutes);

export default router; 