import Vue from 'vue'
import axios from 'axios'

var router = null
var showLoading = true

export function createHttp ($router) {
  Vue.prototype.$http = axios
  router = $router

  initInterceptersRequest()
  initInterceptersResponse()
}

const initInterceptersRequest = () => {
  axios.interceptors.request.use(config => {
    if (typeof config.showLoading === 'boolean') showLoading = config.showLoading
    if (typeof config.showLoading !== 'boolean') showLoading = true

    showLoading && Vue.prototype.Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      loadingType: 'spinner',
      message: '加载中...'
    })

    const CONFIG = config

    const auth = sessionStorage.getItem('auth') || '25adbe41dfb69b5ad5454c4a5dd9b78d'
    const data = {
      version: '0.0.1',
      os: 'ios',
      sign: 'ABCDEFG',
      order_no: new Date().getTime(),
      imei: '123456',
      sourceType: 'weixin_public'
    }

    if (auth) {
      CONFIG.headers.common.token = auth
    } else {
      router.push('/auth-wechat')
    }

    if (CONFIG.url && CONFIG.url.includes('/uploadFile')) {
      CONFIG.headers['Content-Type'] = 'multipart/form-data'
      return CONFIG
    }

    CONFIG.headers['Content-Type'] = 'application/json'
    CONFIG.url = process.env.VUE_APP_AJAX_PROXY
    CONFIG.method = 'POST'
    CONFIG.data = Object.assign(CONFIG.data, data)

    return CONFIG
  })
}

const initInterceptersResponse = () => {
  axios.interceptors.response.use(
    async response => {
      Vue.prototype.Toast.clear()

      // 请求成功
      if (response.data.code === '0000') return response

      // 微信登录时，如果没有绑定手机号，就重新获取微信code，然后跳转到绑定手机号
      if (response.data.code === '10015') return router.push('/auth-wechat?type=bindingPhone')

      Vue.prototype.$toast(response.data.message)

      return Promise.reject(response.data.message)
    },
    error => {
      return Promise.reject(error)
    }
  )
}
