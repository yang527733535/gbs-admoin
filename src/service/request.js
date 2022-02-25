import axios from 'axios';
import { Message } from '@arco-design/web-react';

const ConfigBaseURL = 'http://dev-service.mengmohmg.com/'; // 默认路径，这里也可以使用env来判断环境

// 使用create方法创建axios实例
export const Service = axios.create({
  timeout: 7000, // 请求超时时间
  baseURL: ConfigBaseURL,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});
// 添加请求拦截器
Service.interceptors.request.use((config) => {
  if (localStorage.getItem('token')) {
    config.headers.Authorization = localStorage.getItem('token');
  }
  return config;
});
// 添加响应拦截器
Service.interceptors.response.use(
  (response) => {
    const { data, message } = response.data;
    if (response.data.code !== 200) {
      Message.error(message);
      window.localStorage.clear();
      window.location.reload();
    }
    // Message
    if (response.data.code == 4002 || response.data.code == 4003) {
      Message({
        message: '长时间未操作,已强制退出,请重新登录',
        type: 'error',
        duration: 3 * 1000,
      });
      window.localStorage.clear();
      window.location.reload();
    }
    return response.data;
  },
  (error) => {
    const msg = error.Message !== undefined ? error.Message : '';
    Message({
      message: `网络错误${msg}`,
      type: 'error',
      duration: 3 * 1000,
    });
    return Promise.reject(error);
  }
);
