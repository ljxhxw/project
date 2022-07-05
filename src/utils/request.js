import router from '@/router'
import theAxios from 'axios'
import { Notify } from 'vant'
import { removeToken } from '@/utils/token.js'
// import { getToken } from './token'
const axios = theAxios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 20000
})

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么

  if (error.response.status === 401) {
    Notify({ type: 'warning', message: '身份已过期' })
    removeToken()
    router.replace('/loginpage')
  }
  return Promise.reject(error)
})

// 导出自定义函数, 参数对象解构赋值
export default ({ url, method = 'GET', params = {}, data = {}, headers = {} }) => {
  return axios({
    url,
    method,
    params,
    data,
    headers
  })
}
