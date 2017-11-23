# easyfetch-desire

## rollup + buble 指南

[最轻量的 ES2015 编译配置](https://egoist.moe/2017/04/28/the-most-lightweight-es2015-setup/)
[优雅地打包前端 JavaScript 库](https://egoist.moe/2016/11/16/bundle-front-end-js-library/)

## 整体思路

## 这些默认参数分为三类

**第一类 任何 http fetch 请求都会有的** url, method, headers, body

**第二类 fetch 方法独有的** credentials, catch, mode

**第三类（此类不算请求参数） 自行封装的一些方法，（这类参数可暂时不写）** suffix, baseURL,
transformRequest, transformResponse, validateStatus

**需要自行添加的方法** Interceptor 拦截器 ( 这个第一个要有 ), timeout(), jsonp( 这个就先算了 ),
abort( 这个再说 ), progress( 这个最后再说 )

**fetch 底层使用方法**

```js
// example
const word = 'fetch';
const url = `https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd=${word}`;
fetch(url, { mode: 'cors', body: params });
```

### Fetch API 取回的数据，就是 ArrayBuffer 对象。

```js
fetch(url)
  .then(function(response) {
    return response.arrayBuffer();
  })
  .then(function(arrayBuffer) {
    // ...
  });
```

### fetch 处理的几种数据

1. 处理正常的 json 数据及接口

```js
fetch('./example.json')
  .then(res => res.json()
  .then(data => {
    // 这里的data就是js的 object
  })
```

2. 处理基本的 Text/Html 相应

```js
fetch('http://example.com/page)
  .then(res => res.text())
  .then(data => {
    // <!DOCTYPE...
  })
```

3. 处理 Blob 结果（加载图像或者其他二进制数据）

```js
fetch('butterfly.jpg')
  .then(res => res.blob())
  .then(imageBlob => {
    // document.querySelector('img').src = URL.createObjectURL(imageBlob)
  });
```

响应 Body mixin 的 blob() 方法处理响应流 (Response stream), 并且将其读完

4. 提交表单

```js
fetch('/submit', {
  method: 'post',
  body: new FormData(document.getElementById('comment-form))
})
```

5. 提交 json

```js
fetch('/submit-json', {
  method: 'post',
  body: JSON.stringify({
    email: '233@foxmail.com',
    answer: 'jiubugaosuni'
  })
});
```

### mode 属性

`mode` 属性用来决定是否允许跨域请求，以及哪些 response 属性可读。可选的 mode 属性值为
`same-origin`，`no-cors` （默认）以及 `cors`

`same-origin` 模式很简单，如果一个请求是跨域的，那么返回一个简单的 error，这样确保所有的请求遵守
同源策略。

`no-cors`模式允许来自 CDN 的脚本、其他域的图片和其他一些跨域资源，但是首先有个前提条件，就是请求
的 method 只能是 "HEAD","GET" 或者 "POST"。此外，任何 ServiceWorkers 拦截了这些请求，它不能随意
添加或者改写任何 headers，除了这些。第三，**JavaScript 不能访问 Response 中的任何属性**

### 参考资料 / 推荐阅读

#### Fetch 相关

[这个 API 很 “ 迷人 ”——( 新的 Fetch API)](https://www.w3ctech.com/topic/854)

[Fetch 进阶指南](http://louiszhai.github.io/2016/11/02/fetch/#mode)

[【译】Fetch 用法说明](https://segmentfault.com/a/1190000007019545)

[Fetch 简介 : 新一代 Ajax API](http://blog.csdn.net/renfufei/article/details/51494396)

#### Promise 相关

[谈谈使用 promise 时候的一些反模式](http://efe.baidu.com/blog/promises-anti-pattern/) baiduFE 的
这篇文章讲的真详细，能把你对 promise 的所有困惑都讲出来， 5 星推荐

#### Axios 相关

[Axios- 源码分析](http://hejx.space/2017/08/25/Axios-%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90/)
