import { Router } from 'express';
import * as documentController from '../controllers/documentController.js';
import * as authController from '../controllers/authController.js';

const router = Router();

router.use(authController.protect);

router.post("/", documentController.createDoc);

router.get('/search/:name', documentController.searchDocs);

router.get('/recent', documentController.getRecentDocs);

router.get('/me', documentController.getMyDocs);

router.route("/:id/content")
    .get(documentController.getDocContent)
    .patch(
        documentController.uploadDoc,
        documentController.updateDocContent
    );

router.post(
    "/upload",
    documentController.uploadDoc,
    documentController.createDocByUpload
);

router.use(authController.restrictTo("admin", "manager"));

router.get(
    "/status/pending",
    documentController.getAllPendingDocs
)

router.patch(
    "/:id",
    documentController.updateDoc
)

router.get(
    "/",
    documentController.getAllDocs
)

router.delete("/:id",
    authController.restrictTo("admin"),
    documentController.deleteDoc
);

export default router;