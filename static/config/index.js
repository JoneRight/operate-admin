/**
 * 开发环境
 */
;(function () {
  window.SITE_CONFIG = {}

  // api接口请求地址
  window.SITE_CONFIG['baseWebUrl'] = 'http://solacemeta.nat300.top' // web地址
  window.SITE_CONFIG['baseUrl'] = 'http://solacemeta.nat300.top/shoushu-admin'
  // window.SITE_CONFIG['baseWebUrl'] = 'https://www.solacemeta.com' // web地址
  // window.SITE_CONFIG['baseUrl'] = 'https://www.solacemeta.com/shoushu-admin'

  // cdn地址 = 域名 + 版本号
  window.SITE_CONFIG['domain'] = './' // 域名
  window.SITE_CONFIG['version'] = ''   // 版本号(年月日时分)
  window.SITE_CONFIG['cdnUrl'] = window.SITE_CONFIG.domain + window.SITE_CONFIG.version
})()
