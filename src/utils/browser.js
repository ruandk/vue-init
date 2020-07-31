const Browser = {
  /**
   * @description: 移动终端浏览器版本信息
   * @param {type}
   * @return:
   */
  version: function () {
    const u = navigator.userAgent
    return {
      trident: u.includes('Trident'), // IE内核
      presto: u.includes('Presto'), // opera内核
      webKit: u.includes('AppleWebKit'), // 苹果、谷歌内核
      gecko: u.includes('Gecko') && u.includes('KHTML'), // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      android: u.includes('Android') || u.includes('Linux'), // android终端或者uc浏览器
      iPhone: u.includes('iPhone'), // 是否为iPhone或者QQHD浏览器
      iPad: u.includes('iPad'), // 是否iPad
      weixin: /MicroMessenger/i.test(u) // 微信
    }
    /**
     * @description: 硬件设备
     * @param {type}
     * @return:
     */
  },
  device: function () {
    const ret = {
      mobile: false, // 移动端
      pc: false, // pc端
      ios: false, // ios
      weixin: false, // 微信
      iPad: false, // iPad,
      weApp: false // 小程序
    }

    const os = this.version()
    if (os.mobile || os.ios || os.android || os.iPad || os.iPad) {
      // 判断为移动端
      ret.mobile = true
    } else {
      ret.pc = true
    }

    if (os.ios || os.iPhone || os.iPad) {
      ret.ios = true
    }

    if (os.iPad) {
      ret.iPad = true
    }

    if (os.weixin) {
      ret.weixin = true
    }

    return ret
  }
}

export default Browser
