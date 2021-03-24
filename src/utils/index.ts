/*
 * @description:
 * @author: steve.deng
 * @Date: 2021-03-11 17:01:06
 * @LastEditors: steve.deng
 * @LastEditTime: 2021-03-23 17:39:28
 */
import path from 'path';
import util from 'util';
import cp from 'child_process';

// exec promise化
const exec = util.promisify(cp.exec);
// 解析路径
const resolve: (pathname: string) => string = (pathname) => {
    return path.resolve(process.cwd(), pathname);
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

export { format_time, resolve, exec };
