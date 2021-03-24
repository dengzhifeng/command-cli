/*
 * @description:
 * @author: steve.deng
 * @Date: 2021-02-03 16:57:56
 * @LastEditors: steve.deng
 * @LastEditTime: 2021-03-24 11:48:38
 */
import program from 'commander';
import config from './config';
import { version } from '../package.json';
import chalk from 'chalk';
import { push, replaceFile } from './command';

const defaultConfig: { [name: string]: any } = {};
const usageList: string[] = [];
// 定义命令版本
program.version(version).description(`这是一个命令行工具 版本v${version}`);
// 定义命令参数提示
Object.entries(config).forEach(([key, value]) => {
    defaultConfig[key] = value.default;
    usageList.push(value.usage);
    program.option(value.option, value.descriptor);
});
// 定义帮助例子
program.on('--help', () => {
    console.log('Examples:');
    usageList.forEach((line) => {
        console.log(`${'  ' + chalk.green(line)}`);
    });
});
// 提交代码
push(program);
replaceFile(program);
// 解析传入参数 必须放到最后
program.parse(process.argv);
