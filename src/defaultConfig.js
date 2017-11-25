export default {
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

  //url 前缀
  suffix: ''
};
