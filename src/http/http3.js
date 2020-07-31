import QS from 'qs'
import { Toast } from 'antd-mobile'

const BaseUrl = '/api'
// const BaseUrl = 'https://api.xxx.com'

/**
 *
 * @url     {请求地址}
 * @params  {请求参数}
 * @method  {请求方式,可不传,默认post}
 *
 */

export function fetchHttp (url, params = {}, method = 'post', uploadImg = '') {
  // Toast.loading('加载中...', 0)
  method = method.toLowerCase()
  const paramsArray = Object.keys(params)
  let paramsString = ''
  // let formData = new FormData()
  const paramsObj = {
    method
  }
  if (uploadImg !== 'img') {
    paramsObj.headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    })
  }
  if (method === 'get' || method === 'delete') {
    if (paramsArray.length) {
      paramsArray.forEach(key => {
        paramsString += `&${key}=${params[key]}`
      })
      paramsString = '?' + paramsString.substr(1)
    }
    url += paramsString
  }
  if (method === 'post' || method === 'put') {
    // if (paramsArray.length) {
    //     for (let key in params) {
    //         formData.append(key, params[key])
    //     }
    // }
    if (uploadImg === 'img') {
      paramsObj.body = params
    } else {
      paramsObj.body = QS.stringify(params)
    }
  }
  return new Promise((resolve, reject) => {
    fetch(BaseUrl + url, paramsObj).then(res => res.json()).then(data => {
      Toast.hide()
      if (data.status === 'ok') {
        resolve(data)
      } else {
        reject(data.error)
        Toast.fail(data.error)
      }
    }).catch(err => {
      console.log(err)
      Toast.fail('网络错误')
    })
  })
}
