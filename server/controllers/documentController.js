import multer from 'multer';
import fs from 'fs';
import path from 'path';
import stream from 'stream';
import Document from '../models/documentModel.js';
import Permission from '../models/permissionModel.js';
import AuditLog from '../models/auditLogModel.js';
import User from '../models/userModel.js';
import { auditLogAction, documentStatus, roleName } from '../shareVariable.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';
import { saveEncryptedFile, getEncryptedFile } from '../utils/encryption.js';
import config from '../config/config.js';
import { query } from '../utils/filter.js';
import sequelize from '../db.js';
import { Op } from 'sequelize';

const readDocument = (doc, res) => {
    const buffer = getEncryptedFile(doc.content, config.secretKey, config.iv);
    const readStream = new stream.PassThrough();
    readStream.end(buffer);
    res.writeHead(200, {
        "Content-disposition": "attachment; fileName=" + doc.title,
        "Content-Type": "application/octet-stream",
        "Content-Length": buffer.length
    });
    res.end(buffer);
}


const multerStorage = multer.memoryStorage()

const multerFilter = (req, file, cb) => {
    if (file.mimetype === 'text/plain') {
        cb(null, true); // Accept the file
    } else {
        cb(new AppError("Only TXT files are allowed.", 400), false);
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

    let ext;

    if (req.file.mimetype === 'text/plain') {
        ext = 'txt';
    }

    const title = `user-${req.user.id}-${Date.now()}`
    const fileName = `${title}.${ext}`;
    const filePath = path.join("./upload/files", fileName);

    const originalName = req.file.originalname;
    const nameWithoutExt = path.basename(originalName, path.extname(originalName));

    saveEncryptedFile(req.file.buffer, filePath, config.secretKey, config.iv);

    const doc = await Document.create({
        title: nameWithoutExt,
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

    if (!doc) {
        return next(new AppError('Document not found', 404));
    }

    fs.unlinkSync(doc.content);

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

    const docs = await Document.findAndCountAll({
        limit: limit,
        offset: (page - 1) * limit,
        order: sort,
        attributes: fields,
        include: [
            {
                model: AuditLog,
                where: {
                    userId: req.user.id,
                },
                order: [['timestamp', 'DESC']],
                attributes: ['timestamp', 'action'],
                limit: 1,
            },
            {
                model: User,
                attributes: ['email'],
            }
        ]
    });

    res.status(200).json({
        status: 'success',
        total: docs.count,
        data: {
            docs: docs.rows,
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
        include: [
            {
                model: AuditLog,
                where: {
                    userId: req.user.id,
                },
                order: [['timestamp', 'DESC']],
                attributes: ['timestamp', 'action'],
                limit: 1,
            },
            {
                model: User,
                attributes: ['email'],
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

export const updateDoc = catchAsync(async (req, res, next) => {
    const doc = await Document.findByPk(req.params.id);

    if (!doc) {
        return next(new AppError('Document not found', 404));
    }

    const allowedFields = ['title', 'type', "size", "content", "public", "status", "createdBy", "updatedAt"];

    req.body.updatedAt = Date.now();

    await doc.update(req.body, { fields: allowedFields });

    await AuditLog.create({
        action: auditLogAction.Modified,
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

export const updateDocContent = catchAsync(async (req, res, next) => {
    const doc = await Document.findByPk(req.params.id);

    saveEncryptedFile(req.body.content, doc.content, config.secretKey, config.iv);

    await doc.update(
        { updatedAt: Date.now() },
    );

    await AuditLog.create({
        action: auditLogAction.Modified,
        documentId: doc.id,
        userId: req.user.id
    });

    res.status(201).json({
        status: 'success',
        data: {
            doc
        }
    });
});

export const getRecentDocs = catchAsync(async (req, res, next) => {
    const { page, limit } = query(req);

    const docs = await sequelize.query(`
        SELECT DISTINCT ON ("documentId") 
	        "auditLogs"."documentId" as "id",
	        "auditLogs".action, "auditLogs".timestamp,
	        documents."title", documents.type, documents.size, 
            documents.content, documents.public, documents.status, 
            documents."createdAt", documents."createdBy", documents."updatedAt",
            users.email
        FROM "auditLogs"
        LEFT JOIN documents ON "auditLogs"."documentId" = documents.id
        LEFT JOIN users ON documents."createdBy" = users.id
        WHERE "auditLogs"."userId" = :userId AND "auditLogs".action = :action
        ORDER BY "auditLogs"."documentId", "auditLogs".timestamp DESC
        LIMIT :limit OFFSET :offset;
    `, {
        replacements: {
            userId: req.user.id,
            action: auditLogAction.Read,
            limit: limit,
            offset: (page - 1) * limit,
        },
        type: sequelize.QueryTypes.SELECT,
    });

    res.status(200).json({
        status: 'success',
        total: docs.count,
        data: {
            docs
        }
    });
});

export const getMyDocs = catchAsync(async (req, res, next) => {
    const { page, limit } = query(req);

    const docs = await Document.findAndCountAll({
        limit: limit,
        offset: (page - 1) * limit,
        where: {
            createdBy: req.user.id
        },
        include: [
            {
                model: AuditLog,
                where: {
                    userId: req.user.id,
                },
                order: [['timestamp', 'DESC']],
                attributes: ['timestamp', 'action'],
                limit: 1,
            },
            {
                model: User,
                attributes: ['email'],
            }
        ]
    });

    res.status(200).json({
        status: 'success',
        total: docs.count,
        data: {
            docs: docs.rows
        }
    });
});



export const searchDocs = catchAsync(async (req, res, next) => {
    const { name } = req.params;
    const { role } = req.user;

    let docs;
    if (role === roleName.Admin || role === roleName.Manager) {
        docs = await Document.findAndCountAll({
            where: {
                title: {
                    [Op.iLike]: `%${name}%`
                }
            }
        });
    }
    else {
        docs = await Document.findAndCountAll({
            where: {
                title: {
                    [Op.iLike]: `%${name}%`
                },
                status: documentStatus.Approved,
                public: true
            }
        });
    }


    res.status(200).json({
        status: 'success',
        total: docs.count,
        data: {
            docs: docs.rows
        }
    });
});