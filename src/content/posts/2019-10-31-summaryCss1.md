---
title: 前端知识点总结(二) Css基础篇
published: 2019-10-31T23:20:35+08:00
pinned: false
draft: false
description: 一、简单介绍 Css 基础的东西比较多，涉及到基础问题也比较多，例如盒模型，布局， Css3 ， Sass 的一些基础内容， Css 部分打算分三块去写，一章是 Css 相关的特性，然后把布局部分单独
tags: [Css]
category: 前端
slug: summaryCss1
---
### 一、简单介绍
&nbsp;&nbsp;&nbsp;&nbsp;`Css`基础的东西比较多，涉及到基础问题也比较多，例如盒模型，布局，`Css3`，`Sass`的一些基础内容，`Css`部分打算分三块去写，一章是`Css`相关的特性，然后把布局部分单独拿出来一章来写，`Sass`部分和`Css3`部分拿出来一章来写，暂时计划是这样，如果后面东西比较多的话在适当增加些篇幅。
### 二、Css基础相关
#### 1、 盒模型，box-sizing
&nbsp;&nbsp;&nbsp;&nbsp;`box-sizing` 属性用于改变元素相对于其“盒模型”的大小的方式
&nbsp;&nbsp;&nbsp;&nbsp; **API：** `content-box`（默认），`border-box`，`inherit`，`padding-box`（已从规范移除）
&nbsp;&nbsp;&nbsp;&nbsp;简单理解就是当`box-sizing`为默认时，为元素设置`width`，`Height`是不包括`border`和`padding`宽度，设置为`border-box`，`width`实质等于`border + padding + content`，当创建流体`（flow）`和网格`（grid）`布局时，例如，你需要计算列的宽度时，这是特别有用的。而不必担心额外的 `padding` 和 `border` 宽度会破坏布局，使创建布局更容易。
#### 2、CSS实现隐藏页面的方式
>  1、`Display：none` （真正隐藏元素，不占据任何空间，不生成盒模型）
>  2、`Opacity设置为0` （视觉上隐藏，元素本身仍然占有位置，仍然响应用户操作）
>  3、`Visibility：hidden` （视觉上隐藏，仍然对布局起作用，不会响应用户操作）
>  4、`Position{absolute，top：-9999，left：-9999}` （既想要交互，又不想影响布局时）

#### 3、如何实现水平居中和垂直居中。
```css
// 简单水平居中：
margin:0 auto;
text-align:center;
```
```css
// 简单垂直居中
height:line-height;
vertical-align:middle;
```
```css
// 复杂div居中,第一种 （IE9(-ms-), IE10+以及其他现代浏览器）
parentElement{
    position:relative;
}
childElement{
    position: absolute; top: 50%;
    transform: translateY(-50%);
}
// 复杂div居中,第二种 (IE8+以及其他浏览器)
parentElement {
    position: relative;
}
childElement {
    position: absolute;
    left: 0; top: 0; right: 0; bottom: 0;
    margin: auto;
}
// 复杂div居中,第三种 Flex 布局：(不考虑兼容老式浏览器)
parentElement{
    display:flex; /*Flex布局*/
    display: -webkit-flex; /* Safari */
    align-items:center; /*指定垂直居中*/
}
```
#### 4.元素浮动后的display值
    无论当前元素为块级元素`block`或者行内元素`inline`或者`inline-block`，被设置为浮动后，元素的`display`属性都变为`block`。
#### 5、浮动元素引起的问题和解决办法
    问题：
    1.父元素的高度无法被撑开，影响与父元素同级的元素
    2.与浮动元素同级的非浮动元素会跟随其后
    3.若非第一个元素浮动，则该元素之前的元素也需要浮动，否则会影响页面显示的结构
**解决：清除浮动。**
```css
// 清除浮动常用方法
// 1、clear: both
// 2、封装通用类名
clearfix:after{
    content:".";
    display:block; height:0;
    visibility:hidden; clear:both;
}
.clearfix {
    *zoom:1;
}
```
#### 6、link和@import引入css的区别
> 区别1：link是XHTML标签，除了加载CSS外，还可以定义RSS等其他事务; @import属于CSS范畴，只能加载CSS。
> 区别2：link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载。
> 区别3：link是XHTML标签，无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持。
> 区别4：ink支持使用Javascript控制DOM去改变样式；而@import不支持。

#### 7、有哪些常用块级元素，行内元素，block、inline和inline-block的区别
&nbsp;&nbsp;&nbsp;&nbsp;常见的块级元素有 **div**, **form**, **table**, **p**, **H1~H6**, **dl**, **ol**, **ul**等。
&nbsp;&nbsp;&nbsp;&nbsp;常见的内联元素有 **span**, **a**, **em**, **label**, **input**, **select**, **textarea**, **img**等。
&nbsp;&nbsp;&nbsp;&nbsp;**`Block:`** 会独占一行,可以设置width,height属性。即使设置了宽度,仍然是独占一行. 可以设置margin和padding属性。
&nbsp;&nbsp;&nbsp;&nbsp;**`Inline:`** 不会独占一行，多个相邻的行内元素会排列在同一行里，直到一行排列不下，才会新换一行，其宽度随元素的内容而变化, 设置width,height属性无效, 水平方向的padding-left, padding-right, margin-left, margin-right都产生边距效果；但竖直方向的padding-top, padding-bottom, margin-top, margin-bottom不会产生边距效果。
&nbsp;&nbsp;&nbsp;&nbsp;**`Inline-block`**：将对象呈现为inline对象，但是对象的内容作为block对象呈现。之后的内联对象会被排列在同一行内, 使其既具有block的宽度高度特性又具有inline的同行特性。
#### 8、css dpi(每英寸包含点的数量（dots per inch）)
     普通屏幕通常包含96dpi，一般将2倍于此的屏幕称之为高分屏，即大于等于192dpi的屏幕，比如Mac视网膜屏就达到了192dpi（即2dppx），打印时一般会需要更大的dpi；
#### 9、Attribute与property的区别
&nbsp;&nbsp;&nbsp;&nbsp;`property`是DOM中的属性，是JavaScript里的对象；`attribute`是HTML标签上的特性，它的值只能够是字符串；`property`能够从`attribute`中得到同步；`attribute`不会同步`property`上的值；`attribute`和`property`之间的数据绑定是单向的，`attribute->property；`更改`property`和`attribute`上的任意值，都会将更新反映到HTML页面中；
#### 10、流式布局，自适应布局，响应式布局
&nbsp;&nbsp;&nbsp;&nbsp;`流式布局（Liquid Layout）`：页面元素的宽度按照屏幕分辨率进行适配调整，但整体布局不变。代表作栅栏系统（网格系统）。
&nbsp;&nbsp;&nbsp;&nbsp;**布局特点和设计方法：**屏幕分辨率变化时，页面里元素的大小会变化而但布局不变。使用%百分比定义宽度，高度大都是用px来固定住，可以根据可视区域 (viewport) 和父元素的实时尺寸进行调整，尽可能的适应各种分辨率。往往配合 max-width/min-width 等属性控制尺寸流动范围以免过大或者过小影响阅读。
&nbsp;&nbsp;&nbsp;&nbsp;`自适应布局（Adaptive Layout）`：自适应布局的特点是分别为不同的屏幕分辨率定义布局，即创建多个静态布局，每个静态布局对应一个屏幕分辨率范围。
&nbsp;&nbsp;&nbsp;&nbsp;**布局特点和设计方法：**屏幕分辨率变化时，页面里面元素的位置会变化而大小不会变化。　使用 @media 媒体查询给不同尺寸和介质的设备切换不同的样式。在优秀的响应范围设计下可以给适配范围内的设备最好的体验，在同一个设备下实际还是固定的布局。
&nbsp;&nbsp;&nbsp;&nbsp;`响应式布局（Responsive Layout）`：分别为不同的屏幕分辨率定义布局，同时，在每个布局中，应用流式布局的理念，即页面元素宽度随着窗口调整而自动适配。
&nbsp;&nbsp;&nbsp;&nbsp;**布局特点和设计方法：**每个屏幕分辨率下面会有一个布局样式，即元素位置和大小都会变。媒体查询+流式布局。通常使用 @media 媒体查询 和网格系统 (Grid System) 配合相对布局单位进行布局，实际上就是综合响应式、流动等上述技术通过 CSS 给单一网页不同设备返回不同样式的技术统称。
#### 11、移动端布局方案
> * JS + rem
> * 淘宝Flexible

#### 12、 BFC（block formatting context）块格式化上下文相关
    BFC可以理解为没有定义，但有一些特性/功能。例如BFC包住浮动元素，或float + div做左右自适应布局。
    CSS3中display：flow-root；就是创建一个BFC；
>
**触发BFC：**
1.	body 根元素；
2.	浮动元素：float 除 none 以外的值
3.	绝对定位元素：position (absolute、fixed)；
4.	display 为 inline-block、table-cells、flex、flow-root；
5.	overflow 除了 visible 以外的值 (hidden、auto、scroll)
**BFC特性及应用**
1.	同一个 BFC 下外边距会发生折叠，如果想要避免外边距的重叠，可以将其放在不同的 BFC 容器中。
2.	BFC 可以包含浮动的元素（清除浮动）
3.	BFC 可以阻止元素被浮动元素覆盖，可以用来实现两列自适应布局。
>

#### 13、清除浮动的原理
    在支持BFC的浏览器（IE8+，firefox，chrome，safari）通过创建新的BFC闭合浮动；
    在不支持BFC的浏览器 （IE6-7），通过触发 hasLayout 闭合浮动。
#### 14、overflow:hidden有什么缺点？
    内容增多时候容易造成不会自动换行导致内容被隐藏掉，无法显示需要溢出的元素；
#### 15、padding百分比是相对于父级宽度还是自身的宽度
    相对于父级宽度；
#### 16、移动端开发用JavaScript 正则表达式判断平台。
```js
var u = navigator.userAgent, app = navigator.appVersion;
//移动终端浏览器版本信息
trident: u.indexOf("Trident") > -1, //IE内核
presto: u.indexOf("Presto") > -1, //opera内核
webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或者uc浏览器
iPhone: u.indexOf("iPhone") > -1 , //是否为iPhone或者QQHD浏览器
iPad: u.indexOf("iPad") > -1, //是否iPad
webApp: u.indexOf("Safari") == -1 //是否web应该程序，没有头部与底部
```
#### 17、CSS 选择器的优先级
> * 优先级顺序
  * `内联样式` > `ID选择器` > `伪类` > `属性选择器` > `类选择器` > `元素（类型）选择器` > `通用选择器`
* 选择器优先权，规则
  * 内联样式表的权值最高 1000。ID 选择器的权值为 100。Class 类选择器的权值为 10。
  * HTML 标签（类型）选择器的权值为 1。 选择器都有一个权值，权值越大越优先。当权值相等时，后出现的样式表设置要优于先出现的样式表设置。创作者的规则高于浏览者：即网页编写者设置的CSS 样式的优先权高于浏览器所设置的样式。继承的CSS 样式不如后来指定的CSS 样式，在同一组属性设置中标有“!important”规则的优先级最大。
>

#### 18.CSS中的长度单位（em, rem, pt, ex,vw,vh,vmin,vmax）
&nbsp;&nbsp;&nbsp;&nbsp;`em：` 相对单位，基准点为父节点字体的大小，如果自身定义了font-size按自身来计算
&nbsp;&nbsp;&nbsp;&nbsp;`rem：` 相对单位，可理解为**”root em”**,相对根节点html的字体来计算。chrome最小字体为12号，即使设置10px也会显示成12px，把html的font-size设置成10px,rem还12px为基准，页面基准320px(20px),html font-size值的计算：
```js
// 参考手淘
var ele = document.getElementsByTagName("html")[0];
    size = document.body.clientWidth/320*20;
    ele.style.fontSize = size + "px";
```
&nbsp;&nbsp;&nbsp;&nbsp;`pt:` point，大约1/72寸
&nbsp;&nbsp;&nbsp;&nbsp;`ex:` 取当前作用效果的字体的x的高度，在无法确定x高度的情况下以0.5em计算(IE11及以下均不支持，firefox/chrome/safari/opera/ios safari/android browser4.4+等均需属性加么有前缀)
&nbsp;&nbsp;&nbsp;&nbsp;`vw：` viewpoint width，视窗宽度，1vw等于视窗宽度的1%。
&nbsp;&nbsp;&nbsp;&nbsp;`vh：` viewpoint height，视窗高度，1vh等于视窗高度的1%。
&nbsp;&nbsp;&nbsp;&nbsp;`vmin：` vw和vh中较小的那个。
&nbsp;&nbsp;&nbsp;&nbsp;`vmax：` vw和vh中较大的那个。
#### 19、雪碧图
    将小图标合并到一张图片上，然后利用css的背景定位（background-position）来显示需要显示的图片部分，从而减少你的网站的HTTP请求数量。
    优点：减少加载图片对服务器请求次数，提高页面的加载速度，减少鼠标滑过的一些bug。
    缺点：内存使用，影响浏览器的缩放功能，拼图维护比较麻烦，使CSS的编写变得困难。
#### 20.常遇到的浏览器兼容性问题有哪些？常用的hack的技巧
> 1：表单元素行高不一致
**解决方案：** 给表单元素添加float：left（左浮动）；或vertical-align：middle；
2：当在a标签中嵌套img标签时，在某些浏览器中img会有蓝色边框；
**解决方案：** 给img添加border：0；或者是border：none；
>
