import { Router } from 'express';
import protect from '../controllers/authController.js';
import * as documentController from '../controllers/documentController.js';

const router = Router();

router.get(
    "/download/:id",
    documentController.downloadDoc
);

router.post(
    "/upload",
    protect,
    documentController.uploadDoc,
    documentController.createDoc
);


export default router;