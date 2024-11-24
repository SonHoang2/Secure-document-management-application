import multer from 'multer';
import fs from 'fs';
import path from 'path';
import stream from 'stream';
import Document from '../models/documentModel.js';
import Permission from '../models/permissionModel.js';
import AuditLog from '../models/auditLogModel.js';
import { auditLogAction, documentStatus } from '../shareVariable.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';
import { saveEncryptedFile, getEncryptedFile } from '../utils/encryption.js';
import config from '../config/config.js';
import { __dirname } from '../shareVariable.js';
import { query } from '../utils/filter.js';


const readDocument = (doc, res) => {
    const fileName = `${doc.title}.${doc.type}`;

    const buffer = getEncryptedFile(path.join("./upload/files", fileName), config.secretKey, config.iv);
    const readStream = new stream.PassThrough();
    readStream.end(buffer);
    res.writeHead(200, {
        "Content-disposition": "attachment; fileName=" + fileName,
        "Content-Type": "application/octet-stream",
        "Content-Length": buffer.length
    });
    res.end(buffer);
}


const multerStorage = multer.memoryStorage()

const multerFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype === 'text/plain') {
        cb(null, true); // Accept the file
    } else {
        cb(new AppError("Only PDF and TXT files are allowed.", 400), false);
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
})

export const uploadDoc = upload.single('file');

export const createDoc = catchAsync(async (req, res, next) => {
    if (!req.file) {
        return next(new AppError('Please upload a file', 400));
    }

    const ext = req.file.mimetype.split('/')[1];
    const title = `user-${req.user.id}-${Date.now()}`
    const fileName = `${title}.${ext}`;
    const filePath = path.join("./upload/files", fileName);

    saveEncryptedFile(req.file.buffer, filePath, config.secretKey, config.iv);

    const doc = await Document.create({
        title: req.file.originalname,
        type: ext,
        size: req.file.size,
        content: filePath,
        public: false,
        status: documentStatus.Pending,
        createdBy: req.user.id,
    })

    await AuditLog.create({
        action: auditLogAction.Created,
        documentId: doc.id,
        userId: req.user.id
    });

    res.status(201).json({
        status: 'success',
        data: {
            doc
        }
    });
})

export const getPublicDocContent = catchAsync(async (req, res, next) => {
    const doc = await Document.findOne({
        where: {
            id: req.params.id,
            public: true
        }
    })

    if (!doc) {
        return next(new AppError('Document not found or need to login to access', 404));
    }

    readDocument(doc, res);
});

export const getDocContent = catchAsync(async (req, res, next) => {
    const doc = await Document.findByPk(req.params.id);

    if (!doc) {
        return next(new AppError('Document not found', 404));
    }

    if (
        doc.public ||
        doc.createdBy === req.user.id ||
        req.user.role === 'admin' ||
        req.user.role === 'manager'
    ) {
        await AuditLog.create({
            action: auditLogAction.Read,
            documentId: doc.id,
            userId: req.user.id
        });

        readDocument(doc, res);
    } else {
        const permission = await Permission.findOne({
            where: {
                documentId: req.params.id,
                userId: req.user.id
            }
        });

        if (!permission) {
            return next(new AppError('You do not have permission to access this document', 403));
        }

        await AuditLog.create({
            action: auditLogAction.Read,
            documentId: doc.id,
            userId: req.user.id
        });

        readDocument(doc, res);
    }
});

export const deleteDoc = catchAsync(async (req, res, next) => {
    const doc = await Document.findByPk(req.params.id);

    console.log(doc);

    if (!doc) {
        return next(new AppError('Document not found', 404));
    }

    const fileName = `${doc.title}.${doc.type}`;
    const filePath = path.join("./upload/files", fileName);
    // Delete file from disk
    fs.unlinkSync(filePath);

    // Delete record from database
    await Document.destroy({
        where: {
            id: req.params.id
        }
    });

    await AuditLog.create({
        action: auditLogAction.Deleted,
        documentId: doc.id,
        userId: req.user.id
    });

    res.status(204).json({
        status: 'success',
        data: null
    });
});

export const getAllDocs = catchAsync(async (req, res, next) => {
    const { page, limit, sort, fields } = query(req);

    const docs = await Document.findAll({
        limit: limit,
        offset: (page - 1) * limit,
        order: sort,
        attributes: fields,
    });

    res.status(200).json({
        status: 'success',
        data: {
            docs
        }
    });
});

export const getAllPendingDocs = catchAsync(async (req, res, next) => {
    const { page, limit, sort, fields } = query(req);

    const docs = await Document.findAll({
        where: {
            status: documentStatus.Pending
        },
        limit: limit,
        offset: (page - 1) * limit,
        order: sort,
        attributes: fields,
    });

    res.status(200).json({
        status: 'success',
        data: {
            docs
        }
    });
});

export const updateDocument = catchAsync(async (req, res, next) => {
    const doc = await Document.findByPk(req.params.id);

    if (!doc) {
        return next(new AppError('Document not found', 404));
    }

    const allowedFields = ['title', 'type', "size", "content", "public", "status", "createdBy"];

    await doc.update(req.body, { fields: allowedFields });

    await AuditLog.create({
        action: auditLogAction.Updated,
        documentId: doc.id,
        userId: req.user.id
    });

    res.status(200).json({
        status: 'success',
        data: {
            doc
        }
    });
});

export const getRecentDocs = catchAsync(async (req, res, next) => {
    const { page, limit, sort, fields } = query(req);

    const docs = await Document.findAll({
        limit: limit,
        offset: (page - 1) * limit,
        order: sort,
        attributes: fields,
        where: {
            createdBy: req.user.id
        },
        include: [
            {
                model: AuditLog,
                where: {
                    userId: req.user.id
                },
                order: [['createdAt', 'DESC']],
            }
        ]
    });

    res.status(200).json({
        status: 'success',
        data: {
            docs
        }
    });
});
