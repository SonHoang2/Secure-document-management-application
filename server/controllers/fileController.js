import multer from 'multer';
import fs from 'fs';
import crypto from 'crypto';
import config from '../config.js';

const { secretKey, encryptionMethod } = config

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/files');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        console.log(ext);
        cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
    }
});

const multerFilter = (req, file, cb) => {
    cb(null, true);
}

const upload = multer({
    storage: multerStorage,
    // fileFilter: multerFilter,
})

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

export const uploadFile = upload.single('file');