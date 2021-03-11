/*
 * @description:
 * @author: steve.deng
 * @Date: 2021-03-11 17:01:06
 * @LastEditors: steve.deng
 * @LastEditTime: 2021-03-11 17:04:17
 */
import path from 'path';
// 解析路径
export const resolve: (pathname: string) => string = (pathname) => {
    return path.resolve(process.cwd(), pathname);
};
