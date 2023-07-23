import Mock from 'mockjs'

Mock.setup({
  timeout: 800,
})
interface Idata {
  code: number
  msg: string
  data: any
}
const userData: Idata = {
  code: 200,
  msg: 'success',
  data: {
    token: 'qwer_test_token',
    username: 'gjth',
    role: 'admin',
    id: 1,
  },
}
const captchaData = () => {
  return {
    code: 200,
    msg: 'success',
    data: {
      captcha: Mock.Random.dataImage('120x40', 'gjth'),
    },
  }
}
Mock.mock('/api/user/login', 'post', (options: { body: any }) => {
  const { username, password, captcha } = JSON.parse(options.body)
  let result
  if (username === 'admin' && password === 'admin' && captcha === 'gjth') {
    result = userData
  } else if (username !== 'admin' && password === 'admin' && captcha === 'gjth') {
    result = '账号错误'
  } else if (username === 'admin' && password !== 'admin' && captcha === 'gjth') {
    result = '密码错误'
  } else if (username === 'admin' && password === 'admin' && captcha !== 'gjth') {
    result = '验证码错误'
  } else {
    result = '登录失败'
  }
  return result
})
// 验证码
Mock.mock('/api/user/captcha', 'get', captchaData)

// Mock a redirect
Mock.mock('/api/redirect', 'get', () => {
  return {
    status: 302,
    headers: {
      location: 'https://www.baidu.com?code=test123123',
    },
    body: '',
  }
})
