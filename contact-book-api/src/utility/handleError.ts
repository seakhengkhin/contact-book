import ErrorCodeEnum from "../enum/errorCodeEnum";
import { getPrismaErrorMessage, getPrismaErrorCode } from "../helper/prismaHelper";

export const handleError = (e: any) => {
    return {
        Data: {},
        ErrorCode: getPrismaErrorCode(e) || ErrorCodeEnum.GeneralError,
        Message: getPrismaErrorMessage(e) || "An unexpected error occurred.",
    };
};