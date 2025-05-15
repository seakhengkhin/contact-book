import ErrorCodeEnum from "../enum/errorCodeEnum";

const uploadFile = async (req: any, res: any) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                Data: {},
                ErrorCode: ErrorCodeEnum.NoFileUploaded,
                Message: "No file uploaded",
            });
        }
        res.status(200).json({
            Data: {
                filePath: `/uploads/${req.file.filename}`,
                fileName: req.file.filename,
            },
            ErrorCode: ErrorCodeEnum.Success,
            Message: "File uploaded successfully",
        });
    } catch (error) {
        res.status(200).json({
            Data: {},
            ErrorCode: ErrorCodeEnum.GeneralError,
            Message: "An error occurred during file upload",
        });
    }
};
export { uploadFile };