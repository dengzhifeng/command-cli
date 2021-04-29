/*
 * @description: 上传、小程序代码   使用要全局安装mp-ci   npm i mp-ci -g
                借助/mp-cli包实现  本质是用微信原生miniprogram-ci 
                https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html
 * @author: steve.deng
 * @Date: 2021-04-28 14:50:48
 * @LastEditors: steve.deng
 * @LastEditTime: 2021-04-29 16:05:42
 */
import inquirer from 'inquirer';
import path from 'path';
import { CommanderStatic } from 'commander';
import util from 'util';
import cp from 'child_process';
import chalk from 'chalk';
import ProgressBar from 'ora-progress-bar';
import { commonProgress } from 'src/utils';

const exec = util.promisify(cp.exec);
// 检查是否安装了mp-ci
async function checkMpCi() {
    try {
        await exec(`mp-ci -V`);
        return true;
    } catch (error) {
        console.log('请全局mp-ci, 安装命令: npm i mp-ci -g');
        console.log(error);
        return false;
    }
}
async function autoUploadMini() {
    const answers = await inquirer
        .prompt([
            {
                type: 'input',
                name: 'version',
                message: '请输入版本号',
                validate: function (input) {
                    // @ts-ignore
                    let done = this.async();
                    if (input == '') {
                        done('版本号不能为空');
                        return;
                    }
                    if (/[^\d^\.]+/.test(input)) {
                        done('版本号必须为数字');
                        return;
                    }
                    done(null, true);
                }
            },
            {
                type: 'input',
                name: 'describe',
                message: '请输入版本描述(可为空)',
                default: ''
            }
        ])
        .then(async function (res) {
            let { version, describe } = res;
            // https://www.npmjs.com/package/mp-ci
            // rollup直接引入微信的miniprogram-ci包有问题，commonjs插件遇到八进制会报错 所以借助mp-ci直接使用算了
            console.log(res);
            // 执行命令触发就好了
            if (checkMpCi()) {
                try {
                    console.log('上传中...');
                    await commonProgress(
                        'upload Progress',
                        commonExec(
                            `mp-ci upload --ver ${version} --desc ${describe} --pkp ${path.join(
                                process.cwd(),
                                'private.key'
                            )}`
                        )
                    );
                    console.log('上传成功');
                    // spinner.succeed('上传成功');
                } catch (error) {
                    console.log('上传失败');
                    console.error(chalk.red(error));
                }
            }
        });
}

// 公共的cmd函数
function commonExec(cmd: string) {
    return async () => {
        await exec(cmd);
        return Promise.resolve(true);
    };
}
async function autoPreview() {
    if (checkMpCi()) {
        try {
            console.log('上传中...');
            await commonProgress(
                'preview Progress',
                commonExec(
                    `mp-ci preview --pkp ${path.join(
                        process.cwd(),
                        'private.key'
                    )}`
                )
            );
            console.log(
                chalk.blue(
                    '\n\rgenerate preview.png,  please open to scan!\n\r'
                )
            );
            console.log('完成...');
        } catch (error) {
            console.error(chalk.red(error));
        }
    }
}

const uploadMini = function (program: CommanderStatic) {
    // 上传
    program
        .command('uploadMini')
        .description('run upload miniprogrammer  commands')
        .action(async function () {
            try {
                autoUploadMini();
            } catch (error) {
                console.log('上传错误了,', error);
            }
        });
    // 预览
    program
        .command('previewMini')
        .description('run preview miniprogrammer  commands')
        .action(async function () {
            try {
                autoPreview();
            } catch (error) {
                console.log('预览错误了,', error);
            }
        });
    // test
    program
        .command('loading')
        .description('loading')
        .action(async function () {
            await commonProgress('test progress bar');
        });
};

export default uploadMini;
