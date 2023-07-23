import service from '@/utils/request'
import WwLogin from './wwLogin-1.2.7'

export interface LoginParam {
  username: string
  password: string
  captcha?: string
}

export interface CheckLoginParam {
  qywx: string
  code: string
  state?: string
  appid: string
}

export const login = (param: LoginParam) => {
  return service({
    url: '/user/login',
    method: 'post',
    data: param,
  })
}

export const getCaptcha = () => {
  return service({
    url: '/user/captcha',
    method: 'get',
  })
}

export const loginWithQRCode = () => {
  return service({
    url: '/user/loginWithQRCode',
    method: 'get',
  })
}

export const wxLogin = () => {
  return WwLogin
}

export const checkLogin = (params: CheckLoginParam) => {
  return service({
    url: 'https://ibd.gjzq.cn/account_api/check_login',
    method: 'get',
    params,
  })
}
