import { Request, Response } from "express";
import ErrorCodeEnum from "../enum/errorCodeEnum";

const uploadFile = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                data: {},
                errorCode: ErrorCodeEnum.NoFileUploaded,
                message: "No file uploaded",
            });
        }
        res.status(200).json({
            data: {
                filePath: `/uploads/${req.file.filename}`,
                fileName: req.file.filename,
            },
            errorCode: ErrorCodeEnum.Success,
            message: "File uploaded successfully",
        });
    } catch (error) {
        res.status(200).json({
            data: {},
            errorCode: ErrorCodeEnum.GeneralError,
            message: "An error occurred during file upload",
        });
    }
};
export { uploadFile };