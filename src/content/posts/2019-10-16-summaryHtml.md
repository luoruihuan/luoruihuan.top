---
title: 前端知识点总结(一) Html篇
published: 2019-10-16T22:00:02+08:00
pinned: false
draft: false
description: 一、初衷 时光飞逝，转眼还有两个多月19年就过去了，最近打算更新一系列自己整理的关于前端知识点的一些汇总，算是对自己掌握知识的一个汇总，查漏补缺，系列打算分为四个大块来梳理，大概分为 HTML部分 、
tags: [Html]
category: 前端
slug: summaryHtml
---
## 一、初衷
&nbsp;&nbsp;&nbsp;&nbsp;时光飞逝，转眼还有两个多月19年就过去了，最近打算更新一系列自己整理的关于前端知识点的一些汇总，算是对自己掌握知识的一个汇总，查漏补缺，系列打算分为四个大块来梳理，大概分为`HTML部分`、`Css部分(包括Sass用法)`、`Js部分(包括ES6相关基础)`、最后`拓展部分`总结一些关于常用的方法或者概念梳理。此系列文章纯粹属于温故知新，大部分都是基础的知识，如有整理的不到位之处，望各位轻拍。
## 二、HTML
### 1、 HTML5 新特性，语义化
> * `Section：` 定义文档中的主体部分的节、段
> * `Article：` 定义来自外部的一个独立的、完整的内容块，例如什么论坛的文章
> * `Header：` 定义文档、页面的页眉。通常是一些引导和导航信息
> * `Footer：` 定义了文档、页面的页脚
> * `Nav：` 定义了一个链接组成的导航部分
> * `Progress：` 进度条（value，max）
> * `Summary，details ` 定义元素，用户可以点击查看或者隐藏:
> * `Datalist: `  定义可选数据的列表，与 input 配合使用

### 2、浏览器的标准模式和怪异模式（quirks mode）

&nbsp;&nbsp;&nbsp;&nbsp;由来：由于历史的原因，在W3C标准出台前不同浏览器对页面的渲染是不同的。
&nbsp;&nbsp;&nbsp;&nbsp;区别：
> * a、严格模式，width 是内容宽度，元素真正宽度 = `margin + border + padding + width`;怪异模式，width 是元素实际宽度，内容宽度 = `width - padding - border`。
> * b、标准模式下给`span`等行内元素设置`width`和`height`不会生效，而在怪异模式下会生效。
> * c、在标准模式下，一个元素的高度是由其包含的内容决定的，如果父元素没有设置高度，子元素设置一个百分比的高度是无效的。
> * d、怪异模式下`margin：0 auto`，水平居中失效，需用`text-align：center`。

### 3、xhtml和html的区别
> * XHTML 元素必须被正确地嵌套。
> * XHTML 元素必须被关闭。
> * XHTML 标签名必须用小写字母。
> * XHTML 文档必须拥有根元素。

### 4、使用data-的好处
&nbsp;&nbsp;&nbsp;&nbsp;赋予我们在所有 `HTML` 元素上嵌入自定义 `data` 属性的能力，用于存储页面或应用程序的私有自定义数据，以创建更好的用户体验（不进行 `Ajax` 调用或服务器端数据库查询）。
### 5、meta标签
&nbsp;&nbsp;&nbsp;&nbsp;提供有关页面的元信息`(meta-information)`，比如针对搜索引擎和更新频度的描述和关键词。
### 6、Canvas
&nbsp;&nbsp;&nbsp;&nbsp; `<canvas>` 标签定义图形，比如图表和其他图像，但必须使用脚本（js）来绘制图形。首先需要获取`canvas`对象，创建`context`对象，`getContext("2d")` 对象是内建的 `HTML5` 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法.下面是`canvas的API`简单介绍：
&nbsp;&nbsp;&nbsp;&nbsp; a、Canvas坐标: (canvas是一个二维网格，左上角坐标为0，0)：
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`FillRect（x,y,width,height）：` 在画布上绘制width*height的矩形，从左上角（x，y）开始。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`FillStyle：` 可以是CSS颜色，渐变，图案默认是#000（黑色）。
&nbsp;&nbsp;&nbsp;&nbsp; b、Canvas路径: (绘制线条必须使用ink方法例如stroke()，fill() )
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`moveTo(x,y)：` 定义线条开始坐标
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`lineTo(x,y)：` 定义线条结束坐标
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`lineTo(x,y)：` 起点坐标，半径，开始位置，结束位置
&nbsp;&nbsp;&nbsp;&nbsp; c、Canvas文本：
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Font：`定义字体
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`fillText：`（text，x，y）在canvas上绘制实心的文本（文字，文字起点位置）
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`strokeText：`（text，x，y）在canvas上绘制空心的文本
&nbsp;&nbsp;&nbsp;&nbsp; d、Canvas渐变：
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`createLinearGradient(x，y，x1，y1)` 创建线条渐变
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`createRadialGradient (x，y，r，x1，y1，r1)` 创建一个径向/圆渐变
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`addColorStop：`方法指定颜色停止，参数使用坐标来描述，可以是0至1.
&nbsp;&nbsp;&nbsp;&nbsp; e、Canvas图像：
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`drawImage(image,x,y)`：将图像放在画布上
### 7、HTML废弃的标签
&nbsp;&nbsp;&nbsp;&nbsp;font: 可以通过size属性改字体大小,还可以用color属性改变颜色； b : 可以加粗文字  u : 可以加下划线  i : 倾斜； del : 删除线 hr : 水平线；strong : 强调  em : 强调
### 8、IE6/7/8 bug，及兼容写法
> * 1、IE6 css选择器不支持子选择器
> * 2、在IE浏览器中，定位元素的z-index层级是相对于各自的父级容器，所以会导致z-index出现错误的表现。解决方法：其父级元素定义z-index，有些情况下还需要定义position:relative；

### 9、css js放置位置和原因
&nbsp;&nbsp;&nbsp;&nbsp;`js`是阻塞加载，会影响页面加载的速度，如果`js`文件比较大，算法也比较复杂的话，影响更大。`CSS`放在前端是页面渲染时首先是根据`DOM`结构生成一个`DOM`树然后加上`CSS`样式生成一个渲染树，如果`CSS`放在后面可能页面会出现闪跳的感觉，或者是白屏或者布局混乱样式很丑直到`CSS`加载完成。
### 10、什么是渐进式渲染
&nbsp;&nbsp;&nbsp;&nbsp;以往基于字符串拼接的模板引擎技术, 性能可以,前端不方便,而现在基于 `Virtual DOM` 实现的后端渲染, 前端舒服, 后端却变慢,原因是 `Virtual DOM` 难以做静态分析进行预编译, 最终难以提高性能.另外组件级别 Caching(缓存) 方案也不够成熟, 提高性能短期做不到, 那么考虑对服务端渲染的工作进行缩减.比如说, 首屏渲染多少内容? 整页渲染性能低, 能不能只渲染部分,比如说只渲染第一屏主体内容, 而下方或者更详细数据在客户端抓取.就是说, 服务端渲染一部分, 客户端加载一部分, 从而做出效果。
### 11、html模板语言
&nbsp;&nbsp;&nbsp;&nbsp;`html`有打开效率高的先天优势，但也有一个先天缺陷“不支持动态语言”，这也是`html`模板语言出现的原因，让网站即享受`html`高效，又享受内容的动态化；使用比较多的模板引擎也就是`Handlebars.js`，`Etpl`，基本原理也就是将`json`数据通过一些方法，例如用对应的字符串匹配替换扩展方法（正则匹配），转换成`html`模板片段，然后一个实际的`javascript`循环。
### 12、meta viewport简介
```shell
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
```
> * `width：` 控制 viewport 的大小，可以指定值，还可以特殊的值，如：device-width。
> * `height：` 与 width 相对应，指定viewport 高度。
> * `initial-scale：` 初始缩放比例，也即是当页面第一次 load 的时候缩放比例。
> * `maximum-scale：` 允许用户缩放到的最大比例。minimum-scale：允许用户缩放到的最小比例。
> * `user-scalable：` 是否允许用户手动缩放。

