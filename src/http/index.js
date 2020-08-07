import Http from './http'

const http = new Http()
// const http2 = new Http(process.env.VUE_APP_HOST2)

// -------------------------账户接口-------------------------
// 登录
export const USER_LOGIN = (data) => http.request('/user/login', 'POST', data)

// 用户信息
export const USER_INFO = (data) => http.request('/user/info', 'GET', data)

// -------------------------其他接口-------------------------
// 文件上传
export const UPLOAD_FILE = (file, data) => {
  const formData = new FormData()
  formData.append('uploadFile', file)
  Object.keys(data).forEach(key => {
    formData.append(key, data[key])
  })
  return http.request('/oss/upload', 'POST', formData)
}
