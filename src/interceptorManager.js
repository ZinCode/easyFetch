class InterceptorManager {
  constructor() {
    this.handlers = [];
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
