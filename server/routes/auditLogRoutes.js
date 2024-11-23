import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import * as auditLogController from '../controllers/auditLogController.js';

const router = Router();

router.use(authController.protect);

router.route('/')
    .get(
        authController.restrictTo('admin'),
        auditLogController.getAllAuditLogs
    );

export default router;