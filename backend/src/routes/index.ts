import { Router } from 'express';
import authRoutes         from './auth.routes';
import clientRoutes       from './client.routes';
import equipmentRoutes    from './equipment.routes';
import serviceOrderRoutes from './serviceOrder.routes';
import partRoutes         from './part.routes';
import userRoutes         from './user.routes';
import dashboardRoutes    from './dashboard.routes';
import publicRoutes       from './public.routes';

export const router = Router();

router.use('/auth',           authRoutes);
router.use('/clients',        clientRoutes);
router.use('/equipment',      equipmentRoutes);
router.use('/service-orders', serviceOrderRoutes);
router.use('/parts',          partRoutes);
router.use('/users',          userRoutes);
router.use('/dashboard',      dashboardRoutes);
router.use('/public',         publicRoutes);
