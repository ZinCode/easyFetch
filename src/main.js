import Utils from './utils';
import InterceptorManager from './interceptorManager';
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
  __initInterceptor() {
    this.interceptors = new InterceptorManager();
    this.interceptors.use({
      // 请求前
      request(request) {
        request.requestTimestamp = new Date().getTime();
        return request;
      },
      // 请求失败后
      requestError(requestError) {
        return Promise.reject(requestError);
      },
      // 相应前
      response(response) {
        response.responseTimestamp = new Date().getTime();
        return response;
      },
      // 响应失败后
      responseError(responseError) {
        return Promise.reject(responseError);
      }
    });
  }

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

    if (config.method === 'get') {
      $$config.url = Utils.buildUrl($$config.url, defaults.body);
    } else {
      $$config.body = defaults.body;
    }

    // 看看Map类型能不能实现这样的方式，key和value一一对应
    const chainInterceptors = (promise, interceptors) => {
      for (let [thenFn, rejectFn] of interceptors) {
        promise = promise.then(thenFn, rejectFn);
      }
      return promise;
    };

    // 所有请求拦截
    let requestInterceptors = new Map();
    // 所有响应拦截
    let responseInterceptors = new Map();
    let promise = Promise.resolve($$config);

    // 分类缓存拦截器
    this.interceptors.forEach(n => {
      if (n.request || n.requestError) {
        requestInterceptors.set(n.request, n.requestError);
        // requestInterceptors.push(n.request, n.requestError);
      }
      if (n.response || n.responseError) {
        // 这里有问题
        responseInterceptors.set(n.response, n.responseError);
      }
    });

    // 注入请求拦截器
    // 下面这里buble 不支持转换set， map类型，只能转换成数组
    promise = chainInterceptors(promise, Array.from(requestInterceptors));
    promise = fetch($$config.url, $$config);
    return promise;
  }
}

export default Easyfetch;
