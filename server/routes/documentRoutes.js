import { Router } from 'express';
import * as documentController from '../controllers/documentController.js';

const router = Router();

router.get(
    "/download/:id",
    documentController.downloadDoc
);

router.post(
    "/upload",
    documentController.uploadDoc,
    documentController.createDoc
);


export default router;