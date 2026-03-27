import { Router } from 'express';
import { authenticate } from '../middlewares/auth';
import * as ctrl from '../controllers/part.controller';

const router = Router();
router.use(authenticate);
router.get('/', ctrl.list);
router.get('/low-stock', ctrl.lowStock);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.post('/:id/movement', ctrl.movement);
export default router;
