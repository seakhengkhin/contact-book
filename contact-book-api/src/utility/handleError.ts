import ErrorCodeEnum from "../enum/errorCodeEnum";
import { getErrorMessage, getErrorCode } from "../helper/errorCodeHelper";

export const handleError = (e: any) => {
    return {
        data: {},
        errorCode: getErrorCode(e) || ErrorCodeEnum.GeneralError,
        message: getErrorMessage(e) || "An unexpected error occurred.",
    };
};