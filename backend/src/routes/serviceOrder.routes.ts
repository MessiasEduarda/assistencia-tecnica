import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth';
import * as ctrl from '../controllers/serviceOrder.controller';

const router = Router();
router.use(authenticate);
router.get('/', ctrl.list);
router.post('/', ctrl.create);
router.get('/:id', ctrl.getOne);
router.put('/:id', ctrl.update);
router.patch('/:id/status', ctrl.changeStatus);
router.delete('/:id', authorize('ADMIN'), ctrl.remove);
export default router;
