/*
 * @description: 提交代码命令
 * @author: steve.deng
 * @Date: 2021-03-12 17:43:20
 * @LastEditors: steve.deng
 * @LastEditTime: 2021-03-15 18:18:51
 */

import { CommanderStatic } from 'commander';
import { format_time } from '../utils';
import util from 'util';
import cp from 'child_process';
const exec = util.promisify(cp.exec);
const push = function (program: CommanderStatic) {
    console.log('program');
    program
        .command('push')
        .option('-m, --message <message>', 'commit message')
        .description('run push commands')
        .action(async function (options) {
            console.log(options);
            try {
                const tagName = `${format_time(
                    new Date().getTime(),
                    'yyyy-MM-dd-hh:mm:ss'
                )}`;
                const message = options.message || `feat:${tagName}`;
                await exec(`git init`);
                await exec(`git add .`);
                await exec(`git stash`);
                await exec(`git pull origin`);
                await exec(`git stash pop`);
                await exec(`git add .`);
                await exec(`git commit -m ${message}`).catch((error) => {
                    console.log('commit---->', error);
                });
                await exec(`git push origin`);
                console.log('代码提交成功');
            } catch (error) {
                console.log('command push---->', error);
            }
        });
};
export default push;
