/*
 * @description:
 * @author: steve.deng
 * @Date: 2021-02-03 16:57:56
 * @LastEditors: steve.deng
 * @LastEditTime: 2021-03-11 18:22:39
 */
import program from 'commander';
import cp from 'child_process';
import util from 'util';
import path from 'path';
import config from './config';
import { version } from '../package.json';
const exex = util.promisify(cp.exec);

const defaultConfig = {};
const usageList = [];
program.version(version).description(`这是一个命令行工具 版本v${version}`);
Object.entries(config).forEach(([key, value]) => {});

// 解析传入参数
program.parse(process.argv);

let b = 2;
console.log(b);
