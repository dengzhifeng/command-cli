/*
 * @description: 提交代码命令
 * @author: steve.deng
 * @Date: 2021-03-12 17:43:20
 * @LastEditors: steve.deng
 * @LastEditTime: 2021-03-12 18:07:37
 */

import { CommanderStatic } from 'commander';

const push = function (program: CommanderStatic) {
    console.log('program');
    program
        .command('push')
        .description('run push commands for all envs')
        .action(async function (env, options) {
            console.log('env, options');
            console.log(env, options);
        });
};
export default push;
