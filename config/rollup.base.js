import chalk from 'chalk';

// rollup buble插件
import buble from 'rollup-plugin-buble';
// 验证入口点和所有导入的文件的 ESLint 插件
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
// 将commonjs模块转换为es6 (这个包如果不引入npm中的一些包的话，暂时用不到)
import commonjs from 'rollup-plugin-commonjs';
// 在打包文件的时候替换字符串
import replace from 'rollup-plugin-replace';
// 压缩js代码
import uglify from 'rollup-plugin-uglify';
import progress from 'rollup-plugin-progress';

// 打印当前构建环境
console.log('Target:', chalk.bold.green(process.env.NODE_ENV || 'development'));

switch (process.env.BUILD_ENV) {
  case 'DEV': {
    console.log(chalk.cyan`
+---------------+
| DEVELOP BUILD |
+---------------+
`);
    break;
  }
  case 'CI': {
    console.log(chalk.green`
+----------+
| CI BUILD |
+----------+
`);
    break;
  }
  default: {
    console.log(chalk.yellow`
+--------------+
| NORMAL BUILD |
+--------------+
`);
  }
}

export default {
  // 入口
  input: 'src/main.js',
  // 出口
  output: {
    // 编译后的文件名
    name: 'Easyfetch',
    // 打包的格式
    format: 'umd',
    // 提供sourcemap
    sourcemap: true
  },
  // 输出文件目录
  devDest: 'test/easy-fetch.dev.js',
  proDest: 'dist/easy-fetch.min.js',
  // 插件
  plugins: [
    progress({
      clearLine: false
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    replace({
      'process.env.NODE_ENV': `'${process.env.NODE_ENV || 'development'}'`
    }),
    commonjs(),
    eslint({
      exclude: ['**/*.html', '**/*.css', '**/*.eft', '**/*.json']
    }),
    buble({
      // object.assign方法使用编译规则
      objectAssign: 'Object.assign',
      // 指定转换哪些特性
      transforms: {
        // 禁用模块转换
        modules: false,
        // 箭头函数
        arrow: true,
        // for of
        dangerousForOf: true
        // 剩余操作符
        // spreadRest: true
      }
    }),
    // 更多支持的功能转换详见 https://buble.surge.sh/guide/#supported-features
    // 只有生产环境才压缩代码
    process.env.NODE_ENV === 'production' && uglify()
  ]
};

// rollup 中文文档 https://rollupjs.org/zh
// rollup 配置选项列表 https://rollupjs.org/zh#big-list-of-options
// 使用Rollup插件, 例如 rollup-plugin-node-resolve 和 rollup-plugin-commonjs 。这两个插件可以让你加载Node.js里面的CommonJS模块
