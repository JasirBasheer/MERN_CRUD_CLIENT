import axios from 'axios'
import Cookies from 'js-cookie';
import { setToken } from '../redux/features/userSlice';
import store from '../redux/app/store';

const instance = axios.create({
  baseURL: 'https://mern-crud-server-snowy.vercel.app/',
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const response = await instance.post('/refresh-token', {}, { withCredentials: true });
        if (response.data.newAccessToken) {
          Cookies.set('accessToken', response.data.newAccessToken, { path: '/', sameSite: 'None', secure: true });
          originalRequest.headers['Authorization'] = `Bearer ${response.data.newAccessToken}`;
          store.dispatch(setToken({ token: response.data.newAccessToken }));
          return instance(originalRequest);
        }
      } catch (refreshError) {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
      }
    }
    else if (error.response.status === 402 && !originalRequest._retry ) {
      originalRequest._retry =true
      try {
        const response = await instance.post('/admin/refresh-token', {}, { withCredentials: true });
        if (response.data.newAdminAccessToken) {
          Cookies.set('AdminAccessToken', response.data.newAdminAccessToken, { path: '/', sameSite: 'None', secure: true });
          originalRequest.headers['Authorization'] = `Bearer ${response.data.newAdminAccessToken}`;
          return instance(originalRequest);
        }
      } catch (refreshError) {
        Cookies.remove('AdminAccessToken');
        Cookies.remove('AdminRefreshToken');
      }
    }

    return Promise.reject(error);
  }
);

export default instance