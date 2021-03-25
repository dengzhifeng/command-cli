/*
 * @description:
 * @author: steve.deng
 * @Date: 2021-03-12 17:44:26
 * @LastEditors: steve.deng
 * @LastEditTime: 2021-03-25 11:26:37
 */
import push from './push';
import replaceFile from './replaceFile';
import mergeBranch from './mergeBranch';
import pushMerge from './pushMerge';

let commandFn: any[] = [push, replaceFile, mergeBranch, pushMerge];
// export default { push, replaceFile, mergeBranch, pushMerge };
export default commandFn;
