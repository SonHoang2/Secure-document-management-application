import { Router } from 'express';
import protect from '../controllers/authController.js';
import * as fileController from '../controllers/fileController.js';

const router = Router();

router.route('/upload')
    .post(
        protect,
        fileController.uploadFile,
        fileController.createFile
    );

export default router;