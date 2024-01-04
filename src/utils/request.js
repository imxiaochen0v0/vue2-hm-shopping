import axios from 'axios'
import { Toast } from 'vant'
// 创建axios实例
const instance = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api',
  timeout: 5000
})

// 自定义配置
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 开启loading 禁止背景点击 (节流处理, 防止多次无效触发)
  Toast.loading({
    message: '加载中...',
    forbidClick: true, // 禁止背景点击
    duration: 0 // 持续展示 toast
  })
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数
  const res = response.data
  if (res.status !== 200) {
    // Toast默认为单例 同时只能存在一个 新的覆盖旧的
    Toast(res.message)
    // 抛出一个错误的 promise
    return Promise.reject(res.message)
  } else {
    // 正确情况
    Toast.clear()
  }
  // 对响应数据做点什么(axios会多包一层data)
  return response.data
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance
