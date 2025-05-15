import { IUser } from "../interface/registerNewUser";
import { generateNewError } from "../helper/errorCodeHelper";
import ErrorCodeEnum from "../enum/errorCodeEnum";
export function addNewUserFormValidator (req: IUser) {
    if(!req.fullName)
        throw generateNewError(ErrorCodeEnum.FieldRequired, 'Full name is required', 'fullName')
    if(!req.fullName.match(/^[a-zA-Z ]+$/))
        throw generateNewError(ErrorCodeEnum.FieldRequired, 'Full name is invalid', 'fullName');
    if(!req.email)
        throw generateNewError(ErrorCodeEnum.FieldRequired, 'Email is required', 'email');
    if(!req.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))
        throw generateNewError(ErrorCodeEnum.FieldRequired, 'Email is invalid', 'email');
    if(!req.password)
        throw generateNewError(ErrorCodeEnum.FieldRequired, 'Password is is required', 'password');
    if(!req.password.match(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{8,}$/))
        throw generateNewError(ErrorCodeEnum.FieldRequired, 'Password is is required least 8 characters, include latter, number and specail character', 'password');
}  