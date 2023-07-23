import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { message } from 'antd'

const service: AxiosInstance = axios.create({
  // baseURL: process.env.BASEURL_API,
  // baseURL: '/api',
  timeout: 5000,
  // withCredentials: true, // 允许把cookie传递到后台
})

// 响应拦截器
service.interceptors.response.use(
  (res: AxiosResponse) => {
    // 设置接受数据之后，做什么处理
    if (res.data.code === 50000) {
      message.error(res.data.reason)
    }
    return res
  },
  // eslint-disable-next-line consistent-return
  (err) => {
    const { status } = err.response
    if (status === 401) {
      // 未登录
      const redirectUrl = window.btoa(encodeURIComponent(window.location.href))
      const openUrl = `https://ibdhub.gjzqth.com/oauth2/authorization/hydra?redirectUrl=${redirectUrl}}`

      window.open(openUrl, '_self')
    } else {
      // 判断请求异常信息中是否含有超时timeout字符串
      if (err.message.includes('timeout')) {
        message.error('网络超时')
      }
      if (err.message.includes('Network Error')) {
        message.error('服务端未启动，或网络连接错误')
      }
      return Promise.reject(err)
    }
  }
)
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 请求之前做些什么
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default service
