## 我想使用 fetch 的方法

```js
const easy = new EasyFetch({
  baseURL: 'http://example.com'
})

/**
 * @param {String} url 请求的url
 * @param {Object} params 请求的参数
 * @param {Object} config 请求的配置项
 */
easy.get(url, params, config)
easy.post(url, params, config)
...

// 最终默认调用的方式

easy.request(config)

// example
easy.request({
  baseURL: 'http://example.com',
  url: 'api/v1'，
  method: 'get'，
  headers: {
    'ssadf':'asdfa'
  },
  params: {},

})
```

**本项目旨在写一个类似 axios 的网络请求库， 使用的底层请求方法是 fetch, 用法上面尽量保持和 axios
一致 , 目前只写了一个大概思路**

参考了 axios 拦截器的实现方式

很遗憾的是因为 fetch 是基于 promise 设计的，所以并没有 timeout、abort 、 progress 等方法 ,

那些用 setTimeout 和 Promise.race() 方法包装的 fetch 并不能做到真正的中断请求， 超时后请求还是会
发出，只是请求的内容被丢弃了，

### bug

目前使用还有些问题
