import { Request, Response, NextFunction } from "express";
import { verify} from "jsonwebtoken";
import ErrorCodeEnum from "../enum/errorCodeEnum";

declare module "express-serve-static-core" {
    interface Request {
        user?: any;
    }
}
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                Data: {},
                ErrorCode: ErrorCodeEnum.Unauthorized,
                Message: "Unauthorized: No token provided",
            });
        }
        const decoded = verify(token, process.env.JWT_SECRET || "default");
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            Data: {},
            ErrorCode: ErrorCodeEnum.Unauthorized,
            Message: "Invalid or expired token",
        });
    }
};

export default authMiddleware;