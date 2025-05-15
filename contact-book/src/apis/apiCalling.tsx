import axios from 'axios';
import type { IAxiosPromise } from '../models/axiosPromise';
import type { IContact } from '../models/contact';
import Cookies from "js-cookie";
import type { IUploadFileResponse } from '../models/uploadFileResponse';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
       Cookies.remove("authToken");
       window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default {
  callGetAllContacts(): IAxiosPromise<IContact> {
    return api.get('/get-all-contacts');
  },
  callUpsertContact(contact: IContact): IAxiosPromise<IContact> {
    return api.post('/upsert-contact', contact);
  },
  callDeleteContact(contactId: number): IAxiosPromise<IContact> {
    return api.delete(`/delete-contact/${contactId}`);
  },
  callRegisterUser(user: any): IAxiosPromise<IContact> {
    return api.post('/register', user);
  },
  callLoginUser(user: any): IAxiosPromise<IContact> {
    return api.post('/login', user);
  },
  callUpdateUser(user: any): IAxiosPromise<IContact> {
    return api.post('/update-user', user);
  },
  callUploadFile(params: FormData): IAxiosPromise<IUploadFileResponse> {
    return api.post('/upload-file', params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};