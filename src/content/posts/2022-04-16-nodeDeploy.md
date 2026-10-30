---
title: node前端线上部署与基础运维
published: 2022-04-16T21:10:35+08:00
pinned: false
draft: false
description: 一、Linux基础相关 1、在Linux系统中安装node程序，Linux系统常用的有Ubuntu，centOS等，如果不能确定Linux具体的系统版本，可以通过命令查看. shell $ cat /
tags: [node]
category: 前端
slug: nodeDeploy
---
##### 一、Linux基础相关

###### 1、在Linux系统中安装node程序，Linux系统常用的有Ubuntu，centOS等，如果不能确定Linux具体的系统版本，可以通过命令查看.

```shell
$ cat /etc/redhat-release
```
###### 2、常用的安装方法是使用已编译好的版本，也可以通过编译安装，好处就是可以获取最新版，但是坑比较多。
<!-- more -->
```js
$ wget https://nodejs.org/dist/v10.9.0/node-v10.9.0-linux-x64.tar.xz    // 下载
$ tar xf  node-v10.9.0-linux-x64.tar.xz       // 解压
$ cd node-v10.9.0-linux-x64/                  // 进入解压目录
$ ./bin/node -v                               // 查看版本
```

```js
// 使用ln命令来设置软链接
$ ln -s /usr/software/nodejs/bin/npm   /usr/local/bin/
$ ln -s /usr/software/nodejs/bin/node   /usr/local/bin/
```

###### 比较简单的可以直接通过EPEL安装，EPEL库安装的版本相对较低,可以通过安装node 版本工具 n 来进行管理。

```js
$ Sudo yum install epel-release
$ sudo yum install nodejs
```

###### 3、安装pm2 node 的管理工具
全局安装

```js
$ npm install pm2 -g
```

pm2 管理node程序的好处

> 内建负载均衡
> 支持性能监控
> 0 秒停机重载，我理解大概意思是维护升级的时候不需要停机.
> 具有 Ubuntu 和 CentOS 的启动脚本
> 停止不稳定的进程（避免无限循环）
> 服务器重新启动时自动重新启动
> 自动化部署(没研究)

pm2常用命令

```js
// 启动node程序
$ pm2 start app.js
// 列出所有进程
$ pm2 list
// 删除进程
$ pm2 delete 0
// 重启进程
$ pm2 restart app
// 查看日志
$ pm2 logs app
// 设置pm2 开机自启(centos 下)
$ pm2 startup centos
```

###### 4、vim 文本编辑器 相关命令

Vim 文本编辑在类unix系统中使用广泛，主用用来编辑文件内容，针对前端来说，平时简单修改配置，个人觉得
只需要熟练记住几个常用命令既可，如图：

![vim](/uploads/vimPhoto.png)

截止目前我常用的就是编辑nginx配置，拿nginx举例基本操作如下：
```js
// 切换 root 账户
$ sudo su root
// 查看nginx配置
$ vim /etc/nginx/nginx.conf
// 基本命令
$ a 进入编辑 :wq 保存退出 :q! 不保存退出 ESC 退出编辑状态
// 重启nginx 服务
$ nginx -s reload
```

##### 二、项目部署

###### 1、文件上传(通过Jenkins自动化构建)
如果没有配置Jenkins 也可以手动通过命令上传

```js
$ scp -r -P 10086 /Users/ronluo/Desktop/h5/gaia-flexi-cms-team/maya-server/dist  devops@47.102.207.109:/home/devops/flexi-fuwu/Maya-server/dist
```

###### 2、node服务启动

服务器上传node dist包，使用pm2 启动，因为后台服务和前台放置在同一服务器，所以可以把后台地址配置为内网地址127.0.0.1:8809，然后node中的public指向前端静态文件。

配置ngnix反向代理到node的端口，可以不使用ngnix去反向代理，也可以联系运维直接将域名指向node端口，但是找别人太麻烦，所以直接通过ngnix反向代理到node端口。
