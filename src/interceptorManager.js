class InterceptorManager {
  constructor() {
    this.handlers = [];

    // 使用默认拦截器
    this.use({
      // 请求前
      request(request) {
        return request;
      },
      // 请求失败后
      requestError(requestError) {
        return Promise.reject(requestError);
      },
      // 相应前
      response(response) {
        return response;
      },
      // 响应失败后
      responseError(responseError) {
        return Promise.reject(responseError);
      }
    });
  }

  /**
   * 添加一个拦截器
   */
  use(obj) {
    return this.handlers.push(obj) - 1;
  }

  /**
   * 移除一个拦截器
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }

  /**
   * 遍历所有已注册的拦截器
   */
  forEach(fn) {
    this.handlers.forEach(h => {
      if (h != null) {
        fn(h);
      }
    });
  }
}

export default InterceptorManager;
