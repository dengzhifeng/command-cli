/*
 * @description:
 * @author: steve.deng
 * @Date: 2021-02-03 17:04:31
 * @LastEditors: steve.deng
 * @LastEditTime: 2021-03-11 17:54:44
 */
import path from 'path';
import ts from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve'; // 帮助寻找node_modules里的包
import commonjs from '@rollup/plugin-commonjs'; // 将非ES6语法的包转为ES6可用
import json from '@rollup/plugin-json'; // 可导入json
import { terser } from 'rollup-plugin-terser'; // 压缩包

const env = process.env.NODE_ENV;
console.log(env);
const config = {
    input: 'src/index.ts',
    output: {
        banner: '#! /usr/bin/env node',
        exports: 'auto', // 它根据entry模块导出的内容猜测你的意图 https://www.rollupjs.com/guide/big-list-of-options
        format: 'cjs', // umd格式  //cjs commonjs
        file: path.resolve('bin/bundle.js') // 输出路径 根目录下的bin
    },
    plugins: [
        // ts编译插件
        ts({
            tsconfig: path.resolve('tsconfig.json')
        }),
        // node模块路径解析 可以使用node_module里面的模块
        nodeResolve({
            extensions: ['.js', '.ts'],
            preferBuiltins: true // preferBuiltins: true'来禁用此警告  =>  插件node-resolve:更喜欢内置模块'util'而不是本地可选模块'F: git\tool-cli\node_modules\util\util。. js'
        }),
        commonjs(), // commonjs模块转成es6才能 import xx from xx 🍣 A Rollup plugin to convert CommonJS modules to ES6, so they can be included in a Rollup bundle
        json()
    ]
};
// 生产打包要压缩
if (env === 'production') {
    config.plugins.push(terser());
}
export default config;
