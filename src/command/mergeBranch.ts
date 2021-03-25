/*
 * @description: 合并代码命令
 * @author: steve.deng
 * @Date: 2021-03-12 17:43:20
 * @LastEditors: steve.deng
 * @LastEditTime: 2021-03-25 11:33:55
 */

import { CommanderStatic } from 'commander';
import { format_time } from '../utils';
import util from 'util';
import cp from 'child_process';
const exec = util.promisify(cp.exec);
const mergeBranch = function (program: CommanderStatic) {
    program
        .command('merge-branch')
        .option('-t, --targetBranch [targetBranch]', 'merge target branch')
        .option('-m, --mainBranch [mergeBranch]', 'main branch to merge others') // 例如master(mainBranch)合并dev(targetBranch)
        .description('merge branch')
        .action(async function (options) {
            try {
                console.log('merge-branch', options);
                const targetBranch = options.targetBranch || `dev`;
                const mainBranch = options.mainBranch || `master`;
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

                console.log('代码合并成功');
            } catch (error) {
                console.log('command push---->', error);
            }
        });
};
export default mergeBranch;
