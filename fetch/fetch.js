import Utils from './utils'
class Easyfetch {
  constructor(defaults) {
    Object.assign(this, {
      defaults
    })
    this.__init()
  }

  /**
    * 初始化
    */
  __init() {
    this.__initInterceptor()
    this.__initDefault()
    this.__initMethods()
  }

  /**
    * 初始化默认拦截器
    */
  __initInterceptor() {}

  /**
     * 初始化默认参数
     */
  __initDefaults() {
    const defaults = {
      // 基础请求路径
      baseURL: '',
      // 请求路径
      url: '',
      // 请求头
      header: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      mode: 'cors',
      catch: 'force-cache',
      method: 'get',
      params: {}
    }

    // 合并参数
    this.defaults = Object.assign({}, defaults, this.defaults)
  }

  /**
     * 遍历对象构造方法,
     */
  __initMethods() {
    const methods = ['options', 'get', 'head', 'post', 'put', 'delete', 'trace', 'connect']
    methods.forEach(method => {
      this[method] = (url, params, config) => {
        // 合并参数
        return this.__defaultRequest(
          Object.assign({}, config, {
            url,
            method,
            params
          })
        )
      }
    })

    // request - 基础请求方法
    this.request = (...args) => this.__defaultRequest(...args)

    // Promise.all - 合并处理请求
    this.all = promises => Promise.all(promises)
  }

  /**
   * 以fetch作为底层方法
   */
  __defaultRequest(config) {
    // 合并自身默认参数,这里写的不是太好
    const defaults = Object.assign(
      this.defaults,
      config
    )

    const { baseURL, header, validateStatus, ...rest } = defaults

    // 配置请求参数
    const $$config = {
      url: defaults.url,
      body: defaults.params,
      header: defaults.header,
      fetchConfig: defaults.fetchConfig
    }

    // 配置请求路径 baseURL
    if (baseURL && !isAbsoluteURL($$(config.url))) {
      $$config.url = Utils.combineURLs(baseURL, $$config.url)
    }

    // 发起HTTP请求
    const
  }
}



