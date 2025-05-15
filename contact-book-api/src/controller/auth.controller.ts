import { Request, Response, NextFunction } from "express";
import { registerUserService, loginUserService } from "../service/auth.service";
import { addNewUserFormValidator } from "../validator/addNewUserFormRequest";
import { loginFormValidator } from "../validator/loginFormValidator";
import { handleError } from "../utility/handleError";
import ErrorCodeEnum from "../enum/errorCodeEnum";

const registerNewUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        addNewUserFormValidator(req.body);
        const result = await registerUserService(req.body);
        res.status(200).json({
            data: result,
            errorCode: ErrorCodeEnum.Success,
            message: "User registered successfully",
        });
    } catch (error: any) {
        res.status(200).json(handleError(error));
    }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        loginFormValidator(req.body);
        const result = await loginUserService(req.body);
        res.status(200).json({
            data: result,
            errorCode: ErrorCodeEnum.Success,
            message: "Login successful",
        });
    } catch (error: any) {
        res.status(200).json(handleError(error));
    }
};

export { registerNewUser, loginUser };