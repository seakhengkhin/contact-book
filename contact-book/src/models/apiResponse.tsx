import EnumApiErrorCode from '../enums/enumApiErrorCode';

export interface IApiResponse<T = any> {
  data: T,
  errorCode: EnumApiErrorCode,
  message: string,
}

export class ApiResponse<T = any> implements IApiResponse {
  data: T = {} as T;
  errorCode: EnumApiErrorCode = EnumApiErrorCode.Success;
  message = '';

  get IsSuccess(): boolean {
    return this.errorCode === EnumApiErrorCode.Success;
  }

  constructor(init: IApiResponse) {
    Object.assign(this, init);
  }
}
