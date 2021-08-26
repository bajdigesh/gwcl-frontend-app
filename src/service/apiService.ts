import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { store } from 'store';
import { logout } from 'store/authentication';
import tokenService from './tokenService';

// Default API will be your root

const API_ROOT = process.env.REACT_APP_ENDPOINT || '';
const TIMEOUT = 20000;

type HeaderType = 'json' | 'multipart';

interface IApiServiceTypes {
  baseURL?: string;
  timeout?: number;
  headerType?: HeaderType;
}

/**
 *
 * @param {}
 * @returns
 */
const apiService = ({ baseURL = API_ROOT, timeout = TIMEOUT, headerType = 'json' }: IApiServiceTypes) => {
  const headers = getHeader(headerType);

  const client: AxiosInstance = axios.create({
    baseURL,
    timeout,
    headers,
  });

  // Intercept response object and handleSuccess and Error Object
  client.interceptors.response.use(handleSuccess, handleError);

  function getHeader(headerType: HeaderType) {
    const access_token = tokenService.getAccessToken();
    let header: HeadersInit = {};

    switch (headerType) {
      case 'json':
        header = {
          'Content-Type': 'application/json',
          Authorization: access_token ? `Bearer ${access_token}` : '',
          debug: 'false',
        };
        break;

      case 'multipart':
        header = {
          'Content-Type': 'multipart/form-data',
          Authorization: access_token ? `Bearer ${access_token}` : '',
          debug: 'false',
        };
        break;

      default:
        header = { 'Content-Type': 'application/json', debug: 'false' };
    }

    return header;
  }

  function handleSuccess(response: AxiosResponse) {
    return response;
  }

  /** Intercept any unauthorized request.
   * status 401 means either accessToken is expired or invalid
   * dispatch logout action accordingly **/
  function handleError(error: AxiosError) {
    const status = error.response?.status;
    const data = error.response?.data;
    if (status === 401) {
      const dispatch = store.dispatch;
      dispatch(logout());
    }
    return Promise.reject(data);
  }

  function get(path: string) {
    return client.get(path).then(response => response.data);
  }

  function post(path: string, payload: any) {
    return client.post(path, payload).then(response => response.data);
  }

  function put(path: string, payload: any) {
    return client.put(path, payload).then(response => response.data);
  }

  function patch(path: string, payload: any) {
    return client.patch(path, payload).then(response => response.data);
  }

  function _delete(path: string, data?: any) {
    if (data) {
      return client.delete(path, { data: data }).then(response => response.data);
    }
    return client.delete(path).then(response => response.data);
  }

  return {
    get,
    post,
    put,
    patch,
    delete: _delete,
  };
};

export default apiService;
