import base from './rollup.base';
import bsConfig from './bs-config';
// 浏览器同步工具  中文网 http://www.browsersync.cn/ github https://github.com/BrowserSync/browser-sync
// 类似于webpack的hot-reload 插件
import browsersync from 'rollup-plugin-browsersync';

base.output.file = base.devDest;
base.plugins.push(browsersync(bsConfig));
base.watch = {
  // 这里暂时用不着这个监控文件 https://github.com/paulmillr/chokidar
  chokidar: false,
  // 限制监控的文件
  include: 'src/**'
};

export default base;
