import axios from 'axios'
import { Toast } from 'vant'
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
      Toast.loading({
        duration: 0,
        forbidClick: true
      })
    }
    this.reqNum++
  }

  closeLoading () {
    if (this.reqNum <= 0) return
    this.reqNum--
    if (this.reqNum === 0) {
      console.log('结束loading')
      Toast.clear()
    }
  }

  endLoading () {
    // 合并800ms内的请求
    setTimeout(() => this.closeLoading(), 800)
  }

  request (url, method = 'get', data = {}) {
    const AUTH_TOKEN = Storage.getItem(Storage.AUTH_TOKEN)

    return axios.request({
      url,
      method,
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`
      },
      ...method.toUpperCase() === 'GET' ? { params: data } : { data }
    })
  }

  // 请求拦截
  initInterceptorsRequest = () => {
    axios.interceptors.request.use(
      config => {
        this.startLoading()
        config.baseURL = this.baseURL
        if (config.url.includes('/upload')) {
          config.headers['Content-Type'] = 'multipart/form-data'
          return config
        }
        config.headers['Content-Type'] = 'application/json'
        return config
      },
      error => Promise.reject(error)
    )
  }

  // 响应拦截
  initInterceptorsResponse = () => {
    axios.interceptors.response.use(
      async response => {
        const { data: { data, code, msg } } = response

        if (code === '403') {
          Storage.removeItem(Storage.AUTH_TOKEN)
          router.replace('/login')
          return Promise.reject(msg)
        }

        if (code !== '200') {
          Toast(msg)
          return Promise.reject(msg)
        }

        this.endLoading()
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
