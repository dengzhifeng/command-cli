/*
 * @description: 提交代码命令
 * @author: steve.deng
 * @Date: 2021-03-12 17:43:20
 * @LastEditors: steve.deng
 * @LastEditTime: 2021-03-12 17:57:20
 */

import { CommanderStatic } from 'commander';

const pushxx = function (program: CommanderStatic) {
    program.command('push').description('run push commands for all envs');
};
export default pushxx;
