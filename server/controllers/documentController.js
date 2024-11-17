import multer from 'multer';
import fs from 'fs';
import path from 'path';
import stream from 'stream';
import Document from '../models/documentModel.js';
import { documentStatus } from '../shareVariable.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';
import { saveEncryptedFile, getEncryptedFile } from '../utils/encryption.js';
import config from '../config/config.js';
import { __dirname } from '../shareVariable.js';
import { where } from 'sequelize';

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

    console.log(filePath);


    const doc = await Document.create({
        title: title,
        type: ext,
        size: req.file.size,
        content: filePath,
        public: false,
        status: documentStatus.Pending,
        createdBy: req.user.id,
    })

    res.status(201).json({
        status: 'success',
        data: {
            doc
        }
    });
})

export const getDoc = catchAsync(async (req, res, next) => {
    const doc = await Document.findByPk(req.params.id);

    if (!doc) {
        return next(new AppError('Document not found', 404));
    }

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

    res.status(204).json({
        status: 'success',
        data: null
    });
});