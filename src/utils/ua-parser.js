export const BrowserType = {
  IE: 'microsoft internet explorer',
  IE6: 'msie 6.0',
  IE7: 'msie 7.0',
  IE8: 'msie 8.0',
  CHROME: 'chrome',
  NETSCAPE: 'netscape',
  OPERA: 'opera',
  FIREFOX: 'firefox',
  IPHONE: 'iphone',
  IPAD: 'ipad',
  ANDROID: 'android',
  WECHAT: 'micromessenger'
}

export const checkIsTargetBrowser = (type) => {
  if (!type) {
    return false
  } else if (type === BrowserType.IE || type === BrowserType.OPERA) {
    return navigator.appName.toLowerCase().indexOf(type) !== -1 && document.all
  } else {
    return navigator.userAgent.toLowerCase().indexOf(type) !== -1
  }
}
