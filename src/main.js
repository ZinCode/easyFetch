import Utils from './utils';

class Easyfetch {
  constructor(defaults = {}) {
    this.defaults = defaults;
    this.__init();
  }

  /**
    * 初始化
    */
  __init() {
    this.__initInterceptor();
    this.__initDefaults();
    this.__initMethods();
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
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'get',
      body: {},

      /* fetch专有参数 */
      mode: 'cors',
      catch: 'default',
      credentials: 'same-origin',

      /* 额外参数 */
      // 验证返回状态码
      validateStatus: status => status === 304 || (status >= 200 && status < 300),
      suffix: ''
    };
    // 合并参数
    this.defaults = Object.assign({}, defaults, this.defaults);
  }

  /**
   * 遍历对象构造方法,
   */
  __initMethods() {
    const methods = ['get', 'post', 'put', 'delete'];
    methods.forEach(method => {
      this[method] = (url, body = {}, config) => {
        return this.__defaultRequest(Object.assign({}, config, { url, body, method }));
        // return this.__defaultRequest({ ...config, url, body, method });
      };
    });

    // request - 基础请求方法
    this.request = (...args) => this.__defaultRequest(...args);

    // Promise.all - 合并处理请求
    this.all = promises => Promise.all(promises);
  }

  /**
   * 以fetch作为底层方法
   */
  __defaultRequest(config) {
    // 合并参数
    // const defaults = { ...this.defautls, ...config };
    const defaults = Object.assign({}, this.defaults, config);

    // 下面这里也要改一改
    const $$config = {
      url: defaults.url,
      mode: defaults.mode,
      cache: defaults.cache,
      method: defaults.method,
      headers: defaults.headers,
      credentials: defaults.credentials
    };

    // 配置请求路径 baseURL
    if (defaults.baseURL && !Utils.isAbsoluteURL($$config.url)) {
      $$config.url = Utils.combineURLs(defaults.baseURL, $$config.url);
    }

    // 在这里转换请求体
    // 随便改一个东西看看
    if (config.method === 'get') {
      $$config.url = Utils.buildUrl($$config.url, defaults.body);
    } else {
      $$config.body = defaults.body;
    }

    // 转换相应数据
    const transformResponse = res => {
      const __res = Object.assign({}, res, {});
    };
    return fetch($$config.url, $$config);
  }
}

export default Easyfetch;
