import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth';
import * as ctrl from '../controllers/user.controller';

const router = Router();
router.use(authenticate);
router.get('/',                ctrl.list);
router.post('/',               ctrl.create);
router.put('/:id',             ctrl.update);
router.patch('/:id/toggle',    ctrl.toggle);
router.delete('/:id',          authorize('ADMIN'), ctrl.remove); // ← nova rota
export default router;