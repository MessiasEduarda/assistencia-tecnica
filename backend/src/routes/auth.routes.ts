import { Router } from 'express';
import { login, me, checkEmail } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.post('/check-email', checkEmail);
router.post('/login', login);
router.get('/me', authenticate, me);

export default router;