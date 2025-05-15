import multer from "multer";
import { diskStorage } from "multer";
import { extname } from "path";
import ErrorCodeEnum from "../enum/errorCodeEnum";

const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
    },
});

const fileFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});

export const uploadMiddleware = (req: any, res: any, next: any) => {
    upload.single("file")(req, res, (err: any) => {
        if (err instanceof multer.MulterError) {
            return res.status(200).json({
                data: {},
                errorCode: ErrorCodeEnum.FileUploadError,
                message: err,
            });
        } else if (err) {
            return res.status(200).json({
                data: {},
                errorCode: ErrorCodeEnum.FileUploadError,
                message: err.message || "An error occurred during file upload",
            });
        }
        next();
    });
};