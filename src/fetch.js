import utils from './utils';
const fetchServer = config => {
  const $$config = {
    url: config.url,
    method: config.method,
    headers: config.headers,
    mode: config.mode,
    catch: config.catch,
    credentials: config.credentials
  };

  // 配置请求路径 baseURL
  if (config.baseURL && !utils.isAbsoluteURL($$config.url)) {
    $$config.url = utils.combineURLs(config.baseURL, $$config.url);
  }

  if (config.method === 'get') {
    $$config.url = utils.buildUrl($$config.url, config.body);
  }

  return fetch($$config.url, $$config).then(res => {
    return config.validateStatus(res.status) ? res.json() : Promise.reject(res.json());
  });
};

export default fetchServer;
