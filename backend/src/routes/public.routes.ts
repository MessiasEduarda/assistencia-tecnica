import { Router } from 'express';
import { getByToken } from '../controllers/public.controller';

const router = Router();
router.get('/os/:token', getByToken);
export default router;
