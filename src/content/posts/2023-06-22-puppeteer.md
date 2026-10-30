---
title: Puppeteer 入门
published: 2023-06-22T23:03:05+08:00
pinned: false
draft: false
description: 一、Puppeteer 是什么 Puppeteer，翻译成中文可以理解成傀儡的意思，他是一个Node库，主要是提供接口来控制 headless chrome ，也就是无头浏览器，无头浏览器是一种不使用
tags: [node]
category: 前端
slug: puppeteer
---
## 一、Puppeteer 是什么

Puppeteer，翻译成中文可以理解成傀儡的意思，他是一个Node库，主要是提供接口来控制 headless chrome ，也就是无头浏览器，无头浏览器是一种不使用chrome来运行chrome浏览器的方式，简单来讲，其实就是编写javascript 代码自动化控制 Chrome。

我们能用Puppeteer做些什么

> * 1、利用网页生成PDF，图片
> * 2、主要的从网站抓取内容。
> * 3、自动化表单提交、UI测试、键盘输入等。
> * 4、捕获站点的时间线，一遍追踪网站，帮助分析网站性能问题。

<hr/>

<!-- more -->

## 二、运行环境

Node 版本大于 V7.6.0，因为Puppeteer中所有的操作几乎都是一步的，如果使用大量的then会使代码的可读性特别低，所以选择ES7中的 async，await 语法，这也是 Puppeteer 官方推荐的写法。

<hr/>

## 三、基本用法

### 1、入门 Demo 屏幕截图

```js
const puppeteer = require('puppeteer');
async function getPic() {
    // 启动 puppeteer
    const browser = await puppeteer.launch({ headless: false });
    // 在浏览器中创建一个新的页面
    const page = await browser.newPage();
    // 使用 goto 打开指定网页
    await page.goto("https://www.baidu.com");
    // 调整页面配置大小，截图更好看
    await page.setViewport({ width: 1400, height: 900 });
    // 使用 screenshot 函数对网页进行截屏
    await page.screenshot({ path: 'baidu.png' })
    // 关闭浏览器
    await browser.close();
}
getPic();

```

### 2、基础使用属性

#### ① puppeteer.launch(options) options 参数详解

| 参数名称        | 参数类型   |  参数说明  |
| :-   | :-  | :-  |
| ignoreHTTPSErrors     | boolean |   在请求的过程中是否忽略 Https 报错信息，默认为 false     |
| headless        |   boolean   |   是否以”无头”的模式运行 chrome, 也就是不显示 UI， 默认为 true   |
| executablePath        |    string   |  可执行文件的路劲，Puppeteer 默认是使用它自带的 chrome webdriver, 如果你想指定一个自己的 webdriver 路径，可以通过这个参数设置  |
| slowMo        |    number   |  使 Puppeteer 操作减速，单位是毫秒。如果你想看看 Puppeteer 的整个工作过程，这个参数将非常有用。  |
| args        |    Array(String)   |  传递给 chrome 实例的其他参数，比如你可以使用”–ash-host-window-bounds=1024x768” 来设置浏览器窗口大小。  |
| handleSIGINT        |    boolean   |  是否允许通过进程信号控制 chrome 进程，也就是说是否可以使用 CTRL+C 关闭并退出浏览器. |
| timeout        |    number   |  等待 Chrome 实例启动的最长时间。默认为30000（30秒）。如果传入 0 的话则不限制时间 |
| userDataDir        |    string   |  设置用户数据目录，默认linux 是在 ~/.config 目录，window 默认在 C:\Users{USER}\AppData\Local\Google\Chrome\User Data, 其中 {USER} 代表当前登录的用户名. |
| env        |    Object	   |  指定对Chromium可见的环境变量。默认为process.env. |
| devtools        |    boolean   |  是否为每个选项卡自动打开DevTools面板， 这个选项只有当 headless 设置为 false 的时候有效 |


#### ② Browser 对象
当 Puppeteer 连接到一个 Chrome 实例的时候就会创建一个 Browser 对象，有以下两种方式：
Puppeteer.launch 和 Puppeteer.connect. Browser 对象 API :

| 方法名称        | 返回值   |  说明  |
| --------   | -----  | ----  |
| browser.close()     | Promise |   关闭浏览器     |
| browser.disconnect()        |   void   |   断开浏览器连接   |
| browser.newPage()        |    Promise(Page)    |  创建一个 Page 实例  |
| browser.pages()       |    Promise(Array(Page))    |  获取所有打开的 Page 实例  |
| browser.targets()        |    Array(Target)    |  获取所有活动的 targets  |
| browser.version()        |    Promise(Page)    |  获取浏览器的版本  |
| browser.wsEndpoint()        |    String    |  返回浏览器实例的 socket 连接 URL, 可以通过这个 URL 重连接 chrome 实例 |

Puppeteer 详细Api地址  https://github.com/puppeteer/puppeteer/blob/main/docs/api.md

<hr/>

## 四、实战获取京东商城手机商品

首先梳理操作流程：

> * ①、打开京东首页
> * ②、输入手机关键字并搜索
> * ③、获取前10个商品的A标签，并获取商品详情链接。
> * ④、分别打开10个详情图，截取网页图片。

要实现上面的功能，需要用到查找元素，获取属性，键盘回车等，接下来一个一个讲解一下。

### 1、获取元素
Page 对象提供了2个API来获取页面元素：
(1). `Page.$(selector)` 获取单个元素，底层是调用的是 `document.querySelector()` , 所以选择器的 selector 格式遵循 css 选择器规范;

```js
let inputElement = await page.$('#search');
```

(2). `Page.$$(selector)` 获取一组元素，底层调用的是 `document.querySelectorAll()`. 返回 Promise(Array(ElemetHandle)) 元素数组.
```js
const links = await page.$$("a");
```
### 2、获取元素属性
(1). `Page.$eval(selector, pageFunction[, …args])`, 获取单个元素的属性
```js
    const value = await page.$eval('input[name=search]', input => input.value);
    const href = await page.$eval('#a", ele => ele.href);
    const content = await page.$eval('.content', ele => ele.outerHTML);
```

(2). `Page.$$eval(selector, pageFunction[, …args])`, 获取元素数组的属性
### 3、键盘和鼠标事件
键盘和鼠标的API比较简单，键盘的几个API如下：
   > * keyboard.down(key[, options]) 触发 keydown 事件
   > * keyboard.press(key[, options]) 按下某个键，key 表示键的名称
   > * keyboard.sendCharacter(char) 输入一个字符
   > * keyboard.type(text, options) 输入一个字符串
   > * keyboard.up(key) 触发 keyup 事件
   > * page.keyboard.press("Shift"); //按下 Shift 键
   > * page.keyboard.sendCharacter('嗨');
   > * page.keyboard.type('Hello'); // 一次输入完成
   > * page.keyboard.type('World', {delay: 100}); // 像用户一样慢慢输入
   鼠标Api如下:
   > * mouse.click(x, y, [options]) 移动鼠标指针到指定的位置，然后按下鼠标，这个其实 mouse.move 和 mouse.down 或 mouse.up 的快捷操作
    > * mouse.down([options]) 触发 mousedown 事件，options 可配置:
    > * options.button 按下了哪个键，可选值为[left, right, middle], 默认是 left, 表示鼠标左键
    > * options.clickCount 按下的次数，单击，双击或者其他次数
    > * delay 按键延时时间
    > * mouse.move(x, y, [options]) 移动鼠标到指定位置， options.steps 表示移动的步长
    > * mouse.up([options]) 触发 mouseup 事件
### 4、其他实用API
    page.waitForSelector(selector[, options]) 等待某个选择器的元素加载之后，这个元素可以是异步加载的，这个 API 非常有用，比如我想获取某个通过 js 异步加载的元素，那么直接获取肯定是获取不到的。这个时候就可以使用 page.waitForSelector 来解决。

### 5、实现代码

```js
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function getShopDetail() {
    // 启动 puppeteer
    const browser = await puppeteer.launch({ headless: false, ignoreHTTPSErrors: true });
    let page = await browser.newPage();
    // 启用Javascript,允许执行js脚本
    await page.setJavaScriptEnabled(true);
    // 打开京东网页
    await page.goto("https://www.jd.com/");
    // 获取搜索框元素
    const searchInput = await page.$("#key");
    // 定位到搜索框
    await searchInput.focus();
    // 输入搜索内容
    await page.keyboard.type("手机");
    // 获取搜索按钮
    const searchBtn = await page.$(".button");
    // 执行点击事件
    await searchBtn.click();
    // 等待元素加载之后，否则获取不异步加载的元素
    await page.waitForSelector('.gl-item');
    // 获取搜索结果
    const links = await page.$$eval('.gl-item > .gl-i-wrap > .p-img > a', links => {
        return links.map(a => {
            return {
                href: a.href.trim(),
                title: a.title
            }
        });
    });
    const content = JSON.stringify(links);
    const file = path.join(__dirname, 'resource/index.json');
    fs.writeFile(file, content, ()=> {});
    await browser.close();
}

getShopDetail();

```
<hr/>

## 五、定制属于自己的个人资讯网站

* 抓取资讯 puppeteer
* 定时任务 node-schedule
* 部署 docker + github pages

主要思路: puppeteer 定时抓取各个网站板块信息，每次获取内容后，保存至数据库或者简单的用Json保存，保存完成，只需要请求这个文件就可以渲染出需要的内容，定时任务可以用过 node-schedule 库来实现，部署可以采用 docker + gittpage 部署。
