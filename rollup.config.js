/*
 * @description:
 * @author: steve.deng
 * @Date: 2021-02-03 17:04:31
 * @LastEditors: steve.deng
 * @LastEditTime: 2021-03-11 07:44:22
 */
import path from 'path';
import ts from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'src/index.ts',
    output: {
        export: 'auto', // 它根据entry模块导出的内容猜测你的意图 https://www.rollupjs.com/guide/big-list-of-options
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
            extensions: ['.js', '.ts']
        }),
        commonjs() // commonjs模块转成es6才能 import xx from xx 🍣 A Rollup plugin to convert CommonJS modules to ES6, so they can be included in a Rollup bundle
    ]
};
