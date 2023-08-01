/* eslint-disable no-debugger */
import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { message } from 'antd'

export const BASEURL = `https://ibdhub.gjzqth.com`

const service: AxiosInstance = axios.create({
  baseURL: `${BASEURL}/hermes`,
  // baseURL: BASEURL,
  timeout: 5000,
  withCredentials: true, // 允许把cookie传递到后台
  headers: Object.assign(axios.defaults.headers, {
    'Content-Type': 'application/json;charset=UTF-8',
    name: 'luoli1',
  }),
})

function handleError(err: any) {
  if (err.response.status === 401) {
    const btoaUrl = window.btoa(window.encodeURIComponent(window.location.href))
    const openUrl = `${BASEURL}/hermes/oauth2/authorization/hydra?redirectUrl=${btoaUrl}`
    // window.electron.openUrl(openUrl)
    window.open(openUrl, '_self')
  } else if (err.response.status === 403) {
    message.error('操作失败，您没有该操作权限~')
  } else {
    message.error('网络有问题，请联系管理员~')
  }
  return Promise.reject(err.response.status)
}

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
    return handleError(err)
  }
)
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 请求之前做些什么
    return config
  },
  (err) => {
    return handleError(err)
  }
)

export default service
