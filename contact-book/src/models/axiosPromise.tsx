import  type{ IApiResponse } from './apiResponse';

export interface IAxiosResponse<T = any> {
    data: IApiResponse<T>
}

export type IAxiosPromise<T = any> = Promise<IAxiosResponse<T>>
