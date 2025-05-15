import { ApiResponse } from '../models/apiResponse';
import type { IAxiosPromise } from '../models/axiosPromise';
import apiCalling from './apiCalling';
import type { IContact } from '../models/contact';
import { Contact } from '../models/contact';
import type { IUser } from '../models/user';
import type { IUploadFileResponse } from '../models/uploadFileResponse';

const getResponse = (response: IAxiosPromise) => response.then((value) => new ApiResponse(value.data));

export default {
    callGetAllContacts(): Promise<ApiResponse<IContact[]>> {
      const response = getResponse(apiCalling.callGetAllContacts());
      return response.then((data) => {
        data.Data = data.Data.map((contact: IContact) => new Contact(contact));
        return data;
      });
    },
    callUpsertContact(contact: IContact): Promise<ApiResponse<null>> {
      const response = getResponse(apiCalling.callUpsertContact(contact));
      return response.then((data) => {
        data.Data = new Contact(data.Data);
        return data;
      });
    },
    callDeleteContact(contactId: number): Promise<ApiResponse<null>> {
      const response = getResponse(apiCalling.callDeleteContact(contactId));
      return response;
    },
    callRegisterUser(user: IUser): Promise<ApiResponse<IUser>> {
      const response = getResponse(apiCalling.callRegisterUser(user));
      return response;
    },
    callLoginUser(user: IUser): Promise<ApiResponse<IUser>> {
      const response = getResponse(apiCalling.callLoginUser(user));
      return response;
    },
    callUpdateUser(user: IUser): Promise<ApiResponse<IUser>> {
      const response = getResponse(apiCalling.callUpdateUser(user));
      return response;
    },
    uploadFile(files: File[]): Promise<ApiResponse<IUploadFileResponse>> {
      const form = new FormData();
      files.forEach((file) => {
        form.append('file', file);
      });
      const response = apiCalling.callUploadFile(form);
      return getResponse(response);
    },
}