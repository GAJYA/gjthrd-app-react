import service from '@/utils/request'

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

export const checkLogin = () => {
  return service({
    url: '/sys/user/checkLogin',
    method: 'get',
  })
}

export const getSession = () => {
  return service({
    url: '/sys/sessionToken',
    method: 'get',
  })
}
