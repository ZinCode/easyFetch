## 我想使用fetch的方法

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