import defaultConfig from './defaultConfig';
import InterceptorManager from './interceptorManager';
import fetchServer from './fetch';

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
  }

  /**
   * 初始化默认参数
   */
  __initDefaults() {
    const defaults = defaultConfig;
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
        return this.request(Object.assign({}, config, { url, body, method }));
      };
    });

    // Promise.all - 合并处理请求
    this.all = promises => Promise.all(promises);
  }

  request(config) {
    // 合并参数
    // const defaults = { ...this.defautls, ...config };
    this.defaults = Object.assign({}, this.defaults, config);

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
    let promise = Promise.resolve(this.defaults);

    // 分类缓存拦截器
    this.interceptors.forEach(n => {
      if (n.request || n.requestError) {
        requestInterceptors.set(n.request, n.requestError);
      }
      if (n.response || n.responseError) {
        // 这里有问题
        responseInterceptors.set(n.response, n.responseError);
      }
    });

    // 注入请求拦截器
    // 下面这里buble 不支持转换set 、map类型，只能转换成数组
    promise = chainInterceptors(promise, Array.from(requestInterceptors));

    // 发起请求
    promise = promise.then(fetchServer);

    // 注入相应拦截器
    promise = chainInterceptors(promise, Array.from(responseInterceptors));

    return promise;
  }
}

export default Easyfetch;
