import multer from 'multer';
import config from '../config/config.js';
import { __dirname } from '../shareVariable.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';
import Document from '../models/documentModel.js';
import { documentStatus } from '../shareVariable.js';
import fs from 'fs';

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/files');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];

        cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
    }
});

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

    let fileType;
    if (req.file.mimetype === 'application/pdf') fileType = 'pdf';
    if (req.file.mimetype === 'text/plain') fileType = 'text';

    const doc = await Document.create({
        title: req.file.filename,
        type: fileType,
        size: req.file.size,
        content: req.file.path,
        public: false,
        status: documentStatus.Pending,
        createdBy: req.user.id,
    })

    res.status(201).json({
        status: 'success',
        message: 'File uploaded successfully',
        data: req.file,
    });
})

export const getDoc = catchAsync(async (req, res, next) => {
    const doc = await Document.findByPk(req.params.id);

    if (!doc) {
        return next(new AppError('Document not found', 404));
    }

    const file = `${__dirname}/${doc.content}`;

    const dataBuffer = fs.readFileSync(file);

    res.send(dataBuffer);

    // const dataBuffer = fs.readFileSync(file);

    // console.log(dataBuffer);

    // // Extract text content from the PDF
    // const pdfData = await pdfParse(dataBuffer);
});


// export const encryptFile = (req, res, next) => {
//     try {
//         console.log(req.file);

//         const outputFilePath = `upload/files/${req.file.filename}`;
//         const tempFilePath = req.file.path;

//         const iv = crypto.randomBytes(16);
//         const cipher = crypto.createCipheriv(
//             encryptionMethod,
//             Buffer.from(secretKey),
//             iv
//         );

//         const input = fs.createReadStream(tempFilePath);
//         const output = fs.createWriteStream(outputFilePath);

//         // Write the IV as the first piece of data to the output file (in hex format)
//         output.write(iv.toString("hex") + ":", "utf8");

//         input
//             .pipe(cipher)
//             .pipe(output);

//         // Delete the temp file when the encryption is complete
//         output.on("finish", () => {
//             fs.unlinkSync(tempFilePath);
//         });

//         output.on("error", (err) => {
//             throw new Error(err);
//         });

//         res.status(200).json({
//             status: 'success',
//             message: 'File encrypted successfully',
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             status: 'error',
//             message: 'An error occurred while encrypting the file',
//         });
//     }
// }

// export const decryptFile = (req, res, next) => {
// }
