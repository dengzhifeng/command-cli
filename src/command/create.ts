/*
 * @description: 创建文件: 小程序文件或者vue文件
 * @author: steve.deng
 * @Date: 2021-04-28 18:15:00
 * @LastEditors: steve.deng
 * @LastEditTime: 2021-04-29 14:30:39
 */
import { CommanderStatic } from 'commander';
import inquirer from 'inquirer';
import { errorLog, successLog } from 'src/utils';
import fs from 'fs';
/**
 * @description: 自动生成文件方法  command-cli create
 * @param {type} path 生成的文件名（如/xx/a.js）
 * @return {type} tempate 模板文件
 */

// 生成文件
function generateFile(path, template) {
    if (fs.existsSync(path)) {
        errorLog(`${path}文件已存在`);
    } else {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, template, 'utf8', (err) => {
                if (err) {
                    errorLog(err.message);
                    reject(err);
                } else {
                    successLog(`${path}生成成功`);
                    resolve(true);
                }
            });
        });
    }
}

// 判断创建目录
function dotExistDirectoryCreate(directory) {
    return new Promise((resolve) => {
        mkdirs(directory, function () {
            resolve(true);
        });
    });
}

// 创建目录
async function mkdirs(directory, callback) {
    const exists = fs.existsSync(directory);
    if (exists) {
        // deletefolder(directory).then(() => {
        //     callback()
        // })
        callback();
    } else {
        mkdirs(path.dirname(directory), () => {
            fs.mkdirSync(directory);
            callback();
        });
    }
}

// 复制文件
function copyFile(srcPath, tarPath, cb) {
    return new Promise((resolve, reject) => {
        var rs = fs.createReadStream(srcPath);
        rs.on('error', function (err) {
            if (err) {
                console.log('read error', srcPath);
            }
            cb && cb(err);
            reject(err);
        });
        var ws = fs.createWriteStream(tarPath);
        ws.on('error', function (err) {
            if (err) {
                console.log('write error', tarPath);
            }
            cb && cb(err);
            reject(err);
        });
        ws.on('close', function (ex) {
            cb && cb(ex);
            resolve(ex);
        });
        rs.pipe(ws);
    });
}

// 拷贝文件以及目录
function copyFolder(srcDir, tarDir, cb) {
    return new Promise((resolve, reject) => {
        fs.readdir(srcDir, function (err, files) {
            var count = 0;
            var checkEnd = function () {
                if (++count == files.length) {
                    cb && cb();
                    resolve();
                }
            };
            if (err) {
                checkEnd();
                return;
            }
            files.forEach(function (file) {
                var srcPath = path.join(srcDir, file);
                var tarPath = path.join(tarDir, file);
                fs.stat(srcPath, function (err, stats) {
                    if (stats.isDirectory()) {
                        console.log('mkdir', tarPath);
                        fs.mkdir(tarPath, function (err) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            copyFolder(srcPath, tarPath, checkEnd);
                        });
                    } else {
                        copyFile(srcPath, tarPath, checkEnd);
                    }
                });
            });
            //为空时直接回调
            if (files.length === 0) {
                cb && cb();
                resolve();
            }
        });
    });
}

//删除文件
function deletefile(delpath, direct) {
    delpath = direct ? delpath : resolve(delpath); // path.join(__dirname, delpath)
    try {
        /**
         * @des 判断文件或文件夹是否存在
         */
        if (fs.existsSync(delpath)) {
            fs.unlinkSync(delpath);
        } else {
            console.log('inexistence path：', delpath);
        }
    } catch (error) {
        console.log('del error', error);
    }
}

//删除目录
function deletefolder(delpath) {
    delpath = resolve(delpath); //  path.join(__dirname, delpath)
    return new Promise((resolve, reject) => {
        try {
            if (fs.existsSync(delpath)) {
                const delfn = function (address) {
                    const files = fs.readdirSync(address);
                    for (let i = 0; i < files.length; i++) {
                        const dirpath = path.join(address, files[i]);
                        //fs.statSync(fullPath).isDirectory()
                        if (fs.statSync(dirpath).isDirectory()) {
                            delfn(dirpath);
                        } else {
                            deletefile(dirpath, true);
                        }
                    }
                    /**
                     * @des 只能删空文件夹
                     */
                    fs.rmdirSync(address);
                    resolve();
                };
                delfn(delpath);
            } else {
                console.log('do not exist: ', delpath);
                resolve();
            }
        } catch (error) {
            console.log('del folder error', error);
            reject();
        }
    });
}

//下载github仓库文件内容
function gitDownFile(directory, url) {
    return new Promise(async (resolve, reject) => {
        const gitCLoneUrl = `git clone --progress --verbose --recurse-submodules ${url} ${directory}`;
        try {
            console.log('克隆代码地址----->', gitCLoneUrl);
            console.log('代码克隆中···');
            await exec(gitCLoneUrl);
            console.log('代码完成');
        } catch (error) {
            console.log('gitDownFile---->', error);
        }
        resolve();
    });
}

function createFileCommander() {
    //选择框架命令
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'project',
                message: '请选择生成的脚手架类型',
                choices: [
                    {
                        name: '小程序page/component/H5-vue单文件',
                        value: 'file'
                    },
                    {
                        name: '小程序/uni-app/h5-vue开箱即用脚手架',
                        value: 'frame'
                    }
                    // { name: '小程序/uni-app/h5-vue活动模版(大转盘等)', value: 'frame' },
                ],
                default: ['file']
            }
        ])
        .then(async function (res) {
            console.log('prompt1--->', res);
            const { project } = res;
            if (project == 'file') {
                prompt1();
            } else if (project == 'frame') {
                prompt2();
            }
        });

    // 选择模版命令
    const prompt1 = () => {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'template',
                    message: '请选择生成的模板文件',
                    choices: [
                        { name: '小程序page文件', value: 'page' },
                        { name: '小程序component文件', value: 'component' },
                        { name: 'H5-vue文件', value: 'vue' }
                    ],
                    default: ['page']
                },
                {
                    type: 'input',
                    name: 'inputName',
                    message:
                        '请输入文件名即可(可不写文件格式, 如packageActive/pages/newPgae):'
                }
            ])
            .then(async function (res) {
                let { inputName, template } = res;
                if (!inputName) {
                    errorLog('tips: 请输入文件名');
                    throw Error('请输入文件名');
                    // return false;
                }
                // 去掉首个"/"  根目录开始不需要的
                if (inputName[0] == '/') {
                    inputName = inputName.slice(1);
                }
                let index = inputName.indexOf('.');
                if (index !== -1) {
                    // 去掉.号后面
                    inputName = inputName.slice(0, index);
                }
                const inputArr = inputName.split('/');
                console.log('inputArr', inputArr);
                // 循环遍历生成模板
                // __dirname： 运行的js的所在的目录    process.cwd() 用户输入命令时的所在目录
                async function forEachSetTemplate() {
                    if (template === 'vue') {
                        let templateFile = path.join(
                            __dirname,
                            `../template/${template}/${template}.vue`
                        );
                        await generateFile(
                            resolve(inputName + '.vue'),
                            fs.readFileSync(templateFile).toString()
                        );
                    } else {
                        ['.js', '.json', '.less', '.wxss', '.wxml'].forEach(
                            async (item, index) => {
                                let templateFile = path.join(
                                    __dirname,
                                    `../template/${template}/${template}${item}`
                                );
                                await generateFile(
                                    resolve(inputName + item),
                                    fs.readFileSync(templateFile).toString()
                                );
                            }
                        );
                    }
                }

                // 有/ 说明有目录结构 看是否要创建
                if (inputName.includes('/')) {
                    let directory = inputArr
                        .slice(0, inputArr.length - 1)
                        .join('/');
                    log(`正在生成目录`);
                    await dotExistDirectoryCreate(directory);
                    log(`正在生成 template 文件`);
                    await forEachSetTemplate();
                } else {
                    // 当前目录下创建
                    log(`正在生成 template 文件`);
                    await forEachSetTemplate();
                }
            });
    };

    //选择生成框架
    const prompt2 = () => {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'frame',
                    message: '请选择生成的框架',
                    choices: [
                        {
                            name: 'vue框架',
                            value:
                                'http://192.168.197.26:10080/act/classic-h5-demo.git'
                        }
                        // { name: 'uni-app框架', value: 'https://github.com/zhangli254804018/app-h5.git' },
                        // { name: '微信小程序原生框架(mobx)', value: 'https://github.com/zhangli254804018/app-miniProgram.git' },
                        // { name: 'umi框架(react-antd-pro)', value: 'umi' },
                        // { name: 'vue-admin框架(vue-admin-element)', value: 'https://github.com/zhangli254804018/app-admin.git' },
                    ],
                    default: ['page']
                },
                {
                    type: 'input',
                    name: 'inputName',
                    message: '请输入文件名即可(可不写文件格式, 如vue-app/):'
                }
            ])
            .then(async function (res) {
                let { inputName, frame } = res;
                console.log('prompt2------->', frame);
                // 新增修改函数
                const inputArr = inputName.split('/');
                function copyFolders(directory) {
                    if (frame.includes('.git')) {
                        gitDownFile(directory, frame);
                        return;
                    }
                    let framFile = path.join(__dirname, `../frame/${frame}`);
                    let tarFile = resolve(directory);
                    copyFolder(framFile, tarFile);
                }
                // 说明有目录结构 看是否要创建
                if (inputName.includes('/')) {
                    let directory = inputArr
                        .slice(0, inputArr.length - 1)
                        .join('/');
                    log(`正在生成目录`);
                    await dotExistDirectoryCreate(directory);
                    log(`正在生成 框架 文件`);
                    copyFolders(directory);
                } else {
                    await dotExistDirectoryCreate(inputName);
                    // 当前目录下创建
                    log(`正在生成 框架 文件`);
                    copyFolders(inputName);
                }
            });
    };
}

const create = function (program: CommanderStatic) {
    program
        .command('create')
        .description('run create template file commands')
        .action(function (options) {
            createFileCommander();
        });
};
export default create;
