import { Router } from 'express';
import protect from '../controllers/authController.js';
import { uploadFile } from '../controllers/fileController.js';

const router = Router();

router.route('/upload')
    .post(
        protect,
        uploadFile
    );

export default router;