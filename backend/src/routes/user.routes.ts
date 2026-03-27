import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth';
import * as ctrl from '../controllers/user.controller';

const router = Router();
router.use(authenticate);
router.get('/', ctrl.list);
router.post('/', authorize('ADMIN'), ctrl.create);
router.put('/:id', authorize('ADMIN'), ctrl.update);
router.patch('/:id/toggle', authorize('ADMIN'), ctrl.toggle);
export default router;
