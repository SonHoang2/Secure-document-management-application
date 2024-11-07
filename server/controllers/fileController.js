import multer from 'multer';

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/files');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        console.log(file.mimetype);
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

export const uploadFile = upload.single('file');