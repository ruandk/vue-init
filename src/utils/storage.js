
import { Base64 } from 'js-base64'

const Storage = {
  AUTH_TOKEN: 'AUTH_TOKEN', // token
  USER_INFO: 'USER_INFO', // 用户信息

  /**
   * @description: 获取存储数据
   * @param {type}
   * @return:
   */
  getItem: (key) => {
    if (key) {
      key = Base64.encode(key)
      const item = localStorage.getItem(key)
      if (item) return JSON.parse(Base64.decode(item))
      return null
    }
    return null
  },
  /**
   * @description: 存储数据
   * @param {type}
   * @return:
   */
  setItem: (key, value) => {
    if (!key || !value) return
    localStorage.setItem(Base64.encode(key), Base64.encode(JSON.stringify(value)))
  },
  /**
   * @description: 移除存储数据
   * @param {type}
   * @return:
   */
  removeItem: (key) => {
    if (!key) return
    localStorage.removeItem(Base64.encode(key))
  },
  /**
   * @description: 清除存储数据
   * @param {type}
   * @return:
   */
  clear: () => {
    localStorage.clear()
  }
}

export default Storage
