import EnumApiErrorCode from '../enums/enumApiErrorCode';

export interface IApiResponse<T = any> {
  Data: T,
  ErrorCode: EnumApiErrorCode,
  Message: string,
}

export class ApiResponse<T = any> implements IApiResponse {
  Data: T = {} as T;
  ErrorCode: EnumApiErrorCode = EnumApiErrorCode.Success;
  Message = '';

  get IsSuccess(): boolean {
    return this.ErrorCode === EnumApiErrorCode.Success;
  }

  constructor(init: IApiResponse) {
    Object.assign(this, init);
  }
}
