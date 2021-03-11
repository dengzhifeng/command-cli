/*
 * @description:
 * @author: steve.deng
 * @Date: 2021-02-03 16:57:56
 * @LastEditors: steve.deng
 * @LastEditTime: 2021-03-11 07:43:29
 */
console.log('xxxx11');
import { Command } from 'commander';
const program = new Command();
let b = 2;
console.log(b);
let text = 0;
const c = () => {
    return 2;
};
text = c();
console.log(text);
