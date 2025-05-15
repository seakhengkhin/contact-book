import { IUser } from "../interface/registerNewUser";
import { generateNewError } from "../helper/errorCodeHelper";
import ErrorCodeEnum from "../enum/errorCodeEnum";
export function loginFormValidator (req: IUser) {
    if(!req.email)
        throw generateNewError(ErrorCodeEnum.FieldRequired, 'Email is required', 'email');
    if(!req.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))
        throw generateNewError(ErrorCodeEnum.FieldRequired, 'Email is invalid', 'email');
    if(!req.password)
        throw generateNewError(ErrorCodeEnum.FieldRequired, 'Password is is required', 'password');
    if(!req.password.match(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{8,}$/))
        throw generateNewError(ErrorCodeEnum.FieldRequired, 'Password is is required least 8 characters, include latter, number and specail character', 'password');
}  