# 脚手架工具

> 一个比较轻便的命令行工具，功能包含一键提交代码，一键替换配置，一键合并代码等（如果遇到冲突，要手动解决），后续会持续丰富他的功能点。

## 安装教程 install

-   全局安装

```
npm i command-cli -g
```

## 功能和使用方式

> command-cli 可以直接在命令行工具中执行，也可以在 package.json 的 scripts 标签里面定义命令

### 1. 自动提交代码

```
command-cli push -m feat:更新的内容
```

参数：

-   --message(-m 缩写) ：后面带的是代码提交的内容备注信息

### 2. 合并代码

```
command-cli merge-branch --targetBranch dev --mainBranch master
```

参数：

-   --mainBranch (-m 缩写): 以该分支为准合并目标分支
-   --targetBranch (-t 缩写): 被合并的分支

### 3. 替换文件

```
command-cli replace-file --oldFile test-oldFile.js --newFile test-newFile.js
```

参数：

-   --oldFile(-o 缩写): 被覆盖的文件
-   --newFile(-n 缩写): 替换其他文件的文件

### 4. 自动提交代码+合并代码

```
command-cli push-merge --targetBranch dev  --mainBranch master
```

参数：

-   --mainBranch (-m 缩写): 以该分支为准合并目标分支
-   --targetBranch (-t 缩写): 被合并的分支

## 查看帮助

command-cli --help

## 喜欢的可以给个 start

## 有 bug 可以提 issues
