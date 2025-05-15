import ErrorCodeEnum from "../enum/errorCodeEnum";
import { getPrismaErrorMessage, getPrismaErrorCode } from "../helper/prismaHelper";

export const handleError = (e: any) => {
    return {
        data: {},
        errorCode: getPrismaErrorCode(e) || ErrorCodeEnum.GeneralError,
        message: getPrismaErrorMessage(e) || "An unexpected error occurred.",
    };
};