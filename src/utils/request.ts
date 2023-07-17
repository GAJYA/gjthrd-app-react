import axios, { AxiosRequestConfig } from 'axios'
import { message } from 'antd'

const serves = axios.create({
  baseURL: '/api',
  timeout: 5000,
})

// 设置请求发送之前的拦截器
serves.interceptors.request.use(
  (config) => {
    // 设置发送之前数据需要做什么处理
    return config
  },
  // eslint-disable-next-line promise/no-promise-in-callback
  (err) => Promise.reject(err)
)

// 设置请求接收拦截器
serves.interceptors.response.use(
  (res) => {
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

export interface BaseDataStruct<T> {
  data: T
}

const requestPlus = async <D = any, T = any>(params: AxiosRequestConfig<T>): Promise<BaseDataStruct<D>> => {
  // eslint-disable-next-line no-return-await
  return await serves(params)
}

// 将serves抛出去
export default requestPlus
