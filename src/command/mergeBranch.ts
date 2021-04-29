/*
 * @description: 合并代码命令
 * @author: steve.deng
 * @Date: 2021-03-12 17:43:20
 * @LastEditors: steve.deng
 * @LastEditTime: 2021-04-29 16:12:55
 */

import { CommanderStatic } from 'commander';
import { commonProgress, format_time, gitPush } from '../utils';
import util from 'util';
import cp from 'child_process';
const exec = util.promisify(cp.exec);
const mergeBranch = function (program: CommanderStatic) {
    program
        .command('merge-branch')
        .option('-t, --targetBranch [targetBranch]', 'merge target branch')
        .option('-m, --mainBranch [mergeBranch]', 'main branch to merge others') // 例如master(mainBranch)合并dev(targetBranch)
        .option('-p, --push [push]', 'push code') // 例如master(mainBranch)合并dev(targetBranch)
        .description('merge branch')
        .action(async function (options) {
            try {
                console.log('merge-branch', options);
                const targetBranch = options.targetBranch || `dev`;
                const mainBranch = options.mainBranch || `master`;

                await commonProgress(
                    'merge branch Progress',
                    async function () {
                        const message = `feat:合并更改`;
                        await gitPush(message);

                        await exec(`git init`);
                        await exec(`git checkout ${mainBranch}`);
                        await exec(`git pull`);
                        await exec(`git merge ${targetBranch}`);
                        // await exec(`git add .`);
                        // await exec(
                        //     `git commit -m ${mainBranch}合并${targetBranch}分支`
                        // ).catch((error) => {
                        //     console.log('commit---->', error);
                        // });
                        await exec(`git push origin`);
                        return true;
                    }
                );

                console.log('代码合并成功');
            } catch (error) {
                console.log('command push---->', error);
            }
        });
};
export default mergeBranch;
