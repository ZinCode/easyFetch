import Utils from './utils';
// import default from '../otherfetch/fetch1';
class Easyfetch {
  constructor(defaults) {
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
      mode: 'same-origin',
      catch: 'force-cache',
      credentials: 'include',

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
    const defaults = Object.assign({}, this.defaults, config);

    const $$config = {
      url: defaults.url,
      mode: defaults.mode,
      cache: defaults.cache,
      method: defaults.method,
      headers: defaults.headers,
      credentials: defaults.credentials
    };

    // 在这里转换请求体
    // 随便改一个东西看看
    if (config.method === 'get') {
      $$config.url = Utils.buildUrl($$config.url, defaults.body);
    } else {
      $$config.body = defaults.body;
    }
    return fetch($$config.url, $$config).then(res => res);
  }
}

export default new Easyfetch();
