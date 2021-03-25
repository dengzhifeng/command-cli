## 概况

> 基于 rollup 打包, ts 语法, 最终打包成 commonjs 模块格式、es5 语法

## 开发

```
npm run dev
// 或者
yarn dev
```

## 构建打包

```
npm run build
// 或者
yarn build
```

## 测试

根目录执行：就可以把这个项目链接到系统全局，直接可以调 command-cli 命令了, 而且是最新的代码，可以边改边测。

```
npm link    // 不行的话命令后面可以加 --force

```

## 发包到 npm

1. 改版本号（package.json 里面改）、发布命令如下：

```
npm adduser // 如果还没登陆  登录就不需要
npm publish //
```
