const Utils = {
  isEmpty (value) {
    if (value == null || value === undefined) return true
    if (typeof value === 'string' && value === '') return true
    if (Array.isArray(value) && value.length === 0) return true
    if (typeof value === 'object' && Object.keys(value).length === 0) return true
    return false
  },
  isPhoneNum (value) {
    return (/^1[345789]\d{9}$/).test(value)
  },
  isIdCard (value) {
    return (/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/).test(value)
  },
  isPhoneNo (val) {
    const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
    return reg.test(val)
  },
  isIDCardNo (val) {
    const reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
    return reg.test(val)
  },
  isNumber (val) {
    const reg = /^[0-9]*$/
    return reg.test(val)
  },
  hellow () {
    const hours = new Date().getHours()
    if (hours > 6 && hours <= 12) return '上午好'
    if (hours > 12 && hours <= 18) return '下午好'
    return '晚上好'
  },

  /**
     * @desc 函数防抖
     * @param func 函数
     * @param wait 延迟执行毫秒数
     * @param immediate true 表立即执行，false 表非立即执行
     */
  debounce (func, wait = 500, immediate = true) {
    let timeout
    return function () {
      const context = this
      const args = arguments

      if (timeout) clearTimeout(timeout)
      if (immediate) {
        const callNow = !timeout
        timeout = setTimeout(() => {
          timeout = null
        }, wait)
        if (callNow) func.apply(context, args)
      } else {
        timeout = setTimeout(() => {
          func.apply(context, args)
        }, wait)
      }
    }
  },
  /**
     * @desc 函数节流
     * @param func 函数
     * @param wait 延迟执行毫秒数
     * @param type 1 时间戳版，2 定时器版
     */
  throttle (func, wait = 500, type = 1) {
    let previous = 0
    let timeout
    return function () {
      const context = this
      const args = arguments

      if (type === 1) {
        const now = Date.now()
        if (now - previous > wait) {
          func.apply(context, args)
          previous = now
        }
      } else if (type === 2) {
        if (!timeout) {
          timeout = setTimeout(() => {
            timeout = null
            func.apply(context, args)
          }, wait)
        }
      }
    }
  },
  /**
     * 简单深拷贝
     * @param {Object} obj
     */
  deepCopy (obj) {
    if (typeof obj === 'object') {
      return JSON.parse(JSON.stringify(obj))
    }
    return obj
  },
  /**
     * 时间格式化
     * @param time 时间戳
     * @param fmt 格式
     */
  dateFormat (time, fmt = 'YYYY-MM-DD hh:mm:ss') {
    if (typeof time === 'string') {
      time = new Date(time.replace(/-/g, '/'))
    } else {
      time = new Date(time)
    }
    const obj = {
      'Y+': time.getFullYear(),
      'M+': time.getMonth() + 1,
      'D+': time.getDate(),
      'h+': time.getHours(),
      'm+': time.getMinutes(),
      's+': time.getSeconds()
    }
    Object.keys(obj).forEach(key => {
      const reg = new RegExp(key)
      const val = obj[key]
      if (reg.test(fmt)) {
        fmt = fmt.replace(reg, val < 10 ? `0${val}` : val)
      }
    })
    return fmt
  },
  /**
     * 判断此对象是否是Object类型
     * @param {Object} obj
     */
  isObject (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
  },
  /**
     * 判断此类型是否是Array类型
     * @param {Array} arr
     */
  isArray (arr) {
    return Object.prototype.toString.call(arr) === '[object Array]'
  },
  /**
     *  深度比较两个对象是否相同
     * @param {Object} oldData
     * @param {Object} newData
     */
  equalsObj (oldData, newData) {
    // 类型为基本类型时,如果相同,则返回true
    if (oldData === newData) return true
    if (this.isObject(oldData) && this.isObject(newData) && Object.keys(oldData).length === Object.keys(newData).length) {
      // 类型为对象并且元素个数相同
      // 遍历所有对象中所有属性,判断元素是否相同
      for (const key in oldData) {
        if (Object.prototype.hasOwnProperty.call(oldData, key)) {
          if (!this.equalsObj(oldData[key], newData[key])) {
            // 对象中具有不相同属性 返回false
            return false
          }
        }
      }
    } else if (this.isArray(oldData) && this.isArray(oldData) && oldData.length === newData.length) {
      // 类型为数组并且数组长度相同
      for (let i = 0, length = oldData.length; i < length; i++) {
        if (!this.equalsObj(oldData[i], newData[i])) {
          // 如果数组元素中具有不相同元素,返回false
          return false
        }
      }
    } else {
      // 其它类型,均返回false
      return false
    }
    // 走到这里,说明数组或者对象中所有元素都相同,返回true
    return true
  },
  /**
     * 对象数组去重
     * @param arr
     * @param k
     */
  unique (arr, key) {
    if (!arr || !key || !arr.length) return []
    const res = []; const list = []
    arr.forEach(item => {
      const val = item[key]
      if (!list.includes(val)) {
        res.push(item)
        list.push(val)
      }
    })
    return res
  },
  /**
    * 获取链接参数
    * @param url
    * @param key
    */
  getUrlParam (url, key) {
    if (!url || !key) return null
    const reg = new RegExp('[?&#]' + key + '=([^&#]+)')
    const parameter = url.match(reg)
    if (!parameter) return null
    return parameter && parameter[1]
  },
  /**
     * 解决计算精度丢失
     * @param value
     */
  mathFormat (value) {
    return Number(value.toFixed(2))
  }
}

export default Utils
