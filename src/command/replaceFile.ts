/*
 * @description: 替换文件命令
 * @author: steve.deng
 * @Date: 2021-03-15 18:19:27
 * @LastEditors: steve.deng
 * @LastEditTime: 2021-03-24 07:00:40
 */

import { CommanderStatic } from 'commander';
import { resolve, exec } from '../utils';
import chalk from 'chalk';

const replaceFile = function(program: CommanderStatic) {
    program
        .command('replace-file')
        .option('-o, --oldFile <oldFile>', 'old file path') // 旧文件， 被覆盖的文件
        .option('-n, --newFile <newFile>', 'new file path') // 新的文件
        .description('relace oldFile to newFile ')
        .action(async function(options) {
            console.log(options);
            try {
                const oldFile = options.oldFile;
                const newFile = options.newFile;
                await exec(`cp -f ${resolve(newFile)} ${resolve(oldFile)}`);
                console.log(chalk.green('替换文件成功'));
            } catch (error) {
                console.log('replace error---->', error);
            }
        });
};
export default replaceFile;
