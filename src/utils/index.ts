/*
 * @description:
 * @author: steve.deng
 * @Date: 2021-03-11 17:01:06
 * @LastEditors: steve.deng
 * @LastEditTime: 2021-04-29 16:45:09
 */
import path from 'path';
import util from 'util';
import cp from 'child_process';
import chalk from 'chalk';
import ProgressBar from 'ora-progress-bar';

// exec promise化
const exec = util.promisify(cp.exec);
// 解析路径
const resolve: (pathname: string) => string = (pathname) => {
    return path.resolve(process.cwd(), pathname);
};
// 推送代码
const gitPush: (message: string) => void = (message) => {
    return new Promise(async (resolve, reject) => {
        try {
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
            resolve('代码提交成功了');
        } catch (error) {
            reject(error);
        }
    });
};
const format_time = (value: any, type: string) => {
    if (!value) return null;
    let time;
    if (value.constructor === Date) {
        time = value;
    } else {
        time =
            value.toString().length > 10
                ? new Date(parseInt(value))
                : new Date(parseInt(value) * 1000);
    }
    let formatTime: string = type ? type : 'yyyy-MM-dd hh:mm:ss';
    let date: any = {
        'M+': time.getMonth() + 1,
        'd+': time.getDate(),
        'h+': time.getHours(),
        'm+': time.getMinutes(),
        's+': time.getSeconds(),
        'q+': Math.floor((time.getMonth() + 3) / 3),
        'S+': time.getMilliseconds()
    };
    if (/(y+)/i.test(formatTime)) {
        formatTime = formatTime.replace(
            RegExp.$1,
            (time.getFullYear() + '').substr(4 - RegExp.$1.length)
        );
    }
    for (let k in date) {
        if (new RegExp('(' + k + ')').test(formatTime)) {
            formatTime = formatTime.replace(
                RegExp.$1,
                RegExp.$1.length == 1
                    ? date[k]
                    : ('00' + date[k]).substr(('' + date[k]).length)
            );
        }
    }
    return formatTime;
};
const log = (message: string) => console.log(chalk.green(`${message}`));
const successLog = (message: string) => console.log(chalk.blue(`${message}`));
const errorLog = (error: string) => console.log(chalk.red(`${error}`));

// 动态计算进度 到90就停止 等自动完成
let st;
function setProgressBar(progressBar) {
    if (st) clearInterval(st);
    let i = 1;
    st = setInterval(() => {
        progressBar.progress(i);
        i++;
        if (i >= 90) {
            clearInterval(st);
        }
    }, 1000);
}
// 封装包含进度条的函数
const commonProgress = function (
    text: string,
    fn: any = () => {
        return true;
    }
) {
    return new Promise(async (resolve, reject) => {
        let progressBar = new ProgressBar(text || 'Progress bar', 100);

        try {
            setProgressBar(progressBar);
            await fn();
            progressBar.progress(99); // 1 + 99 = 100 就完成进度条
            clearInterval(st);
            resolve(true);
        } catch (error) {
            // spinner.fail('预览失败');
            progressBar.fail();
            console.error(chalk.red(error));
            reject(false);
        }
    });
};

export {
    format_time,
    resolve,
    exec,
    gitPush,
    log,
    successLog,
    errorLog,
    commonProgress
};
