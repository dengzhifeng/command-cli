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

-   --message(-m 缩写) ：后面带的是代码提交的内容备注信息， 不传自动帮你加 feat:时间戳

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210326180701300.gif)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210326180704633.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxMzk4NTc3MzUx,size_16,color_FFFFFF,t_70)

### 2. 合并代码

```
command-cli merge-branch --targetBranch dev --mainBranch master
```

参数：

-   --mainBranch (-m 缩写): 以该分支为准合并目标分支
-   --targetBranch (-t 缩写): 被合并的分支

> ps: 合并了有点久 请见谅 下次优化成有 loadding 效果的
> 留意左下角的分支，自动切换，自动合并
> ![在这里插入图片描述](https://img-blog.csdnimg.cn/2021032617562531.gif)

### 3. 替换文件

```
command-cli replace-file --oldFile test-oldFile.js --newFile test-newFile.js
```

参数：

-   --oldFile(-o 缩写): 被覆盖的文件
-   --newFile(-n 缩写): 替换其他文件的文件

> 文件替换，方便做动态配置
> ![在这里插入图片描述](https://img-blog.csdnimg.cn/20210326180956703.gif)

### 4. 自动提交代码+合并代码

```
command-cli push-merge --targetBranch dev  --mainBranch master
```

参数：

-   --mainBranch (-m 缩写): 以该分支为准合并目标分支
-   --targetBranch (-t 缩写): 被合并的分支

### 5. 可以把命令放在 package.json 里面，下次很方便使用，用快捷命令就好了。

```
	// 如
	yarn push -m feat:unpdate xxx
	yarn merge-branch
	...
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210326181201128.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxMzk4NTc3MzUx,size_16,color_FFFFFF,t_70)

## 查看帮助

command-cli --help

## 喜欢的可以给个 start

## 有 bug 可以提 issues

[https://github.com/dengzhifeng/command-cli/tree/master](https://github.com/dengzhifeng/command-cli/tree/master)
