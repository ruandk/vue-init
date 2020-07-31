import Http from './http'

const http = new Http()
// const http2 = new Http(process.env.VUE_APP_HOST2)

// -------------------------账户接口-------------------------
// 登录
export const USER_LOGIN = (data) => http.request('/user/login', 'POST', data)
