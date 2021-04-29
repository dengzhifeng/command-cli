/*
 * @description:
 * @author: steve.deng
 * @Date: 2021-03-12 17:44:26
 * @LastEditors: steve.deng
 * @LastEditTime: 2021-04-28 18:07:36
 */
import push from './push';
import replaceFile from './replaceFile';
import mergeBranch from './mergeBranch';
import uploadMini from './autoUploadMini';

let commandFn: any[] = [push, replaceFile, mergeBranch, uploadMini];
// export default { push, replaceFile, mergeBranch, pushMerge };
export default commandFn;
