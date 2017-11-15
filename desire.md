
```js
fetch()
```

### 现在作为get请求的url拼接有三种方法

1

```js
  if (type === 'GRT') {
    let params = ''
    for (let i in data) {
      params += `${i} = ${data[i]}&`
    }
    if (params !== '') {
      params = params.substr(0, params.lastIndexOf('&'))
      url = `${url}?${params}`
    }
  }
```

2 这个是我自己写的, 得回家才能看到

```js

```

3 skyvow 的

```js
  buildUrl(url, obj) {
      const serializedParams = this.paramSerializer(obj)
      if (serializedParams.length > 0) {
          url += ((url.indexOf('?') == -1) ? '?' : '&') + serializedParams
      }
      return url
  },
```

**综合比较一些，从第二种和第三种里面取其一**\


## 整体思路


## 这些请求参数分为三类

**第一类 任何http请求都会有的**
url, method, headers, body, 

**第二类 fetch方法独有的**
credentials, catch, mode

**第三类 自行封装的一些方法，（这类参数可暂时不写）**
suffix, baseURL, transformRequest, transformResponse, validateStatus


**需要自行添加的方法**
Interceptor拦截器(这个第一个要有), timeout(), jsonp(这个就先算了), abort(这个再说), progress(这个最后再说)


**fetch底层使用方法**

```js
fetch(url, param)

// example
const word = 'fetch'
const url = `https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd=${word}`
fetch(url, {mode: 'cors'})
```
