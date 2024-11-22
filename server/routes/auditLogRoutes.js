import { Router } from 'express';
import * as authController from '../controllers/authController.js';

const router = Router();

router.use(authController.protect);


export default router;