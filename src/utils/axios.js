import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import store from '@/store'

//建立axios对象
const service = axios.create({
  timeout: 10000
});
//添加请求拦截器
service.interceptors.request.use(config => {
  return config
}, err => {
  Promise.reject(err)
});
//添加响应拦截
service.interceptors.response.use(response => {
  const res = response.data;
  if (!res.success) {
    Message({
      message: res.msg,
      type: 'error',
      duration: 2 * 1000
    })
  } else {
    return res
  }
}, err => {
  switch (err.response.status) {
    case 400:
      Message({
        type: 'error',
        message: '服务器请求错误',
        duration: 2 * 1000
      });
      break;
    case 401:
      Message({
        type: 'error',
        message: '登录失效，请重新登录',
        duration: 2 * 1000
      });
      store.dispatch('toShowLoginDialog', true);
      setTimeout(function () {
        window.open('/#login');
      }, 600);
      break;
    case 403:
      Message({
        type: 'error',
        message: '无权限执行此操作',
        duration: 2 * 1000
      });
      break;
    case 500:
      Message({
        type: 'error',
        message: '系统出错，稍后再试',
        duration: 2 * 1000
      });
      break;
  }
});
export default service
