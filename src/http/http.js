import axios from 'axios'
import { Message } from 'element-ui'
import { Storage } from '@/utils'
import router from '@/router'

class Http {
  baseURL = process.env.VUE_APP_HOST

  reqNum = 0

  constructor (host) {
    if (host) this.baseURL = host
    this.init()
  }

  init () {
    this.initInterceptorsRequest()
    this.initInterceptorsResponse()
  }

  startLoading () {
    if (this.reqNum === 0) {
      console.log('开始loading')
    }
    this.reqNum++
  }

  closeLoading () {
    if (this.reqNum <= 0) return
    this.reqNum--
    if (this.reqNum === 0) {
      console.log('结束loading')
    }
  }

  endLoading () {
    // 合并800ms内的请求
    setTimeout(() => this.closeLoading(), 800)
  }

  request (url, method = 'get', data = {}) {
    const userInfo = Storage.getItem(Storage.USER_INFO)
    const token = userInfo && userInfo.token

    return axios.request({
      url,
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      ...method.toLowerCase() === 'get' ? { params: data } : { data }
    })
  }

  // 请求拦截
  initInterceptorsRequest = () => {
    axios.interceptors.request.use(
      config => {
        this.startLoading()
        config.baseURL = this.baseURL
        // if (config.url && config.url.includes('/uploadFile')) {
        //   config.headers['Content-Type'] = 'multipart/form-data'
        //   return config
        // }
        return config
      },
      error => Promise.reject(error)
    )
  }

  // 响应拦截
  initInterceptorsResponse = () => {
    axios.interceptors.response.use(
      async response => {
        this.endLoading()
        const { data: { data, code, message } } = response

        if (code === 403) {
          router.replace('/login')
          return Promise.reject(message)
        }

        if (code !== 200) {
          Message({ message, type: 'error' })
          return Promise.reject(message)
        }

        return data
      },
      error => {
        // 公共错误判断
        // if (error.response) {
        //   switch (error.response.status) {
        //     case 404:
        //       console.log('找不到页面'); break
        //     case 500:
        //       console.log('服务器错误'); break
        //     default: break
        //   }
        // }
        // 结束loading
        this.endLoading()
        return Promise.reject(error)
      }
    )
  }
}

export default Http
