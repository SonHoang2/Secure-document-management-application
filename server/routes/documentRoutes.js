import { Router } from 'express';
import * as documentController from '../controllers/documentController.js';
import * as authController from '../controllers/authController.js';

const router = Router();

router.route("/:id")
    .get(documentController.getDoc);

router.use(authController.protect);

router.post(
    "/upload",
    documentController.uploadDoc,
    documentController.createDoc
);


export default router;