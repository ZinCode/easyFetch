const toString = Object.prototype.toString;

/**
 * 合并路径
 * @param {string} baseURL 基础路径
 * @param {string} relativeURL 相对路径
 * @returns {string} 合并后的路径
 */
const combineURLs = (baseURL, relativeURL) => {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

/**
 * 判断是否绝对路径
 * @param {string} url 路径
 * @returns {boolean} 返回真值表示绝对路径，假值表示非绝对路径
 */
const isAbsoluteURL = url => {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

/**
 * 判断是否是数组
 * @param {Array} value
 * @return {Boolean} true: 是数组，false: 不是数组
 */
const isArray = value => {
  return Array.isArray(value);
};

/**
 * 判断是否是对象
 * @param {Object} value
 * @return {Boolean} true: 是对象, false: 不是对象
 */
const isObject = value => {
  return value !== null && typeof value === 'object';
};

/**
 * 判断是否是数字
 * @param {Number} value
 * @return {Boolean} true: 是数字， false: 不是数字
 */
const isNumber = value => {
  return typeof value === 'number';
};

/**
 * 判断是否是时间
 * @param {Date} value
 * @return {Boolean} true: 是时间， false: 不是时间
 */
const isDate = value => {
  return toString(value) === '[object Date]';
};

/**
 * 判断是否是未定义
 * @param {Undefined} value
 * @return {Boolean} true: 是， false: 不是
 */
const isUndefined = value => {
  return typeof value === 'undefined';
};

/**
 * 将对象转换为 JSON 字符串
 * @param {Object} obj 将要序列化的对象
 * @param {Number, String} pretty 控制缩进的间距
 * @return {String} 转换后的JSON
 */
const toJson = (obj, pretty) => {
  if (isUndefined(obj)) return undefined;
  if (!isNumber(pretty)) {
    pretty = pretty ? 2 : null;
  }
  return JSON.stringify(obj, null, pretty);
};

/**
 * 序列化
 * @param {Object} value  序列化
 */
const serializeValue = value => {
  if (isObject(value)) return isDate(value) ? value.toISOString() : toJson(value);
  return value;
};

const encodeUriQuery = (value, pctEncodeSpaces) => {
  return encodeURIComponent(value)
    .replace(/%40/gi, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%3B/gi, ';')
    .replace(/%20/g, pctEncodeSpaces ? '%20' : '+');
};

const paramSerializer = obj => {
  if (!obj) return '';
  let parts = [];
  for (let key in obj) {
    const value = obj[key];
    if (value === null || isUndefined(value)) return;
    if (isArray(value)) {
      value.forEach(v => {
        parts.push(encodeUriQuery(key) + '=' + encodeUriQuery(serializeValue(v)));
      });
    } else {
      parts.push(encodeUriQuery(key) + '=' + encodeUriQuery(serializeValue(value)));
    }
  }
  return parts.join('&');
};

const buildUrl = (url, obj) => {
  const serializedParams = paramSerializer(obj);
  if (serializedParams.length > 0) {
    url += (url.indexOf('?') == -1 ? '?' : '&') + serializedParams;
  }
  return url;
};

export default {
  combineURLs,
  isAbsoluteURL,
  isArray,
  isObject,
  isNumber,
  isDate,
  isUndefined,
  toJson,
  serializeValue,
  encodeUriQuery,
  paramSerializer,
  buildUrl
};
