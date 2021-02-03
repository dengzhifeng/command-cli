/*
 * @description:
 * @author: steve.deng
 * @Date: 2021-02-03 17:04:31
 * @LastEditors: steve.deng
 * @LastEditTime: 2021-02-03 17:33:22
 */
import path from 'path';
import ts from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: 'src/index.ts',
    output: {
        export: 'auto', // 它根据entry模块导出的内容猜测你的意图 https://www.rollupjs.com/guide/big-list-of-options
        format: 'umd', // umd格式
        file: path.resolve('bin/bundle.js') // 输出路径 根目录下的bin
    },
    plugins: [
        ts({
            tsconfig: path.resolve('tsconfig.json')
        }),
        nodeResolve({
            extensions: ['.js', '.ts']
        })
    ]
};
