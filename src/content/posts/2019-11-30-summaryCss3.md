---
title: 前端知识点总结(四) Css进阶Css3、Sass篇
published: 2019-11-30T20:20:20+08:00
pinned: false
draft: false
description: 一、简单介绍 前段时间已经整理过两篇关于Css文章，一个是基础，一个是布局相关，这篇就整理了一下关于Sass的相关内容，Css3 在前面也提到过，像Flex布局之类的，这篇会介绍下Css3的简单新特性
tags: [Css]
category: 前端
slug: summaryCss3
---
##### 一、简单介绍
&nbsp;&nbsp;&nbsp;&nbsp;前段时间已经整理过两篇关于Css文章，一个是基础，一个是布局相关，这篇就整理了一下关于Sass的相关内容，Css3 在前面也提到过，像Flex布局之类的，这篇会介绍下Css3的简单新特性和动画相关，然后一些Sass用法，很多以前用的东西不去查文档很多都想不起来了，所以发现经常的去整理温习下确实也挺有必要，温故而知新嘛，废话少说，下面是文章的核心内容~
##### 二、Css3整理
###### 1、CSS3新特性，伪类，伪元素，锚伪类
> * 动态伪类：（并不存在于HTML中,当用户和网站交互的时候才能体现出来）
  *  `. property a:link` { color:gray; } 链接没有被访问时前景色为灰色
  *  `. property a: visited` { color: yellow; } 链接被访问过后前景色为黄色
  *  `. property a: hover` { color: green; } 鼠标悬浮在链接上时前景色为绿色
  *  `. property a: active` { color: blue; } 鼠标点钟激活链接那一下前景色为蓝色
*注：先后顺序，遵守爱恨原则LoVe/HAte,也就是Link--visited--hover—active；
对于:hover在IE6下只有a元素支持，:active只有IE7-6不支持，:focus在IE6-7下不被支持。:focus用于元素成为焦点，这个经常用在表单元素上。*
> * UI元素状态伪类：
  *  `:enabled`,`:disabled`,`:checked`
*IE6-8不支持":checked",":enabled",":disabled"这三种选择器。*
> * CSS3的:nth选择器：
  *  `:first-child` 选择某个元素的第一个子元素；
  *  `:last-child` 选择某个元素的最后一个子元素；
  *  `:nth-child()` 选择某个元素的一个或多个特定的子元素；
  *  `:nth-last-child()` 选择某个元素的一个或多个特定的子元素，从这个元素的最后一个子元素开始算；
  *  `:nth-of-type()` 选择指定的元素；
  *  `:nth-last-of-type()` 选择指定的元素，从元素的最后一个开始计算；
  *  `:first-of-type ` 选择一个上级元素下的第一个同类子元素；
  *  `:last-of-type` 选择一个上级元素的最后一个同类子元素；
  *  `:only-child` 选择的元素是它的父元素的唯一一个了元素；
  *  `:only-of-type`选择一个元素是它的上级元素的唯一一个相同类型的子元素；
  *  `:empty` 选择的元素里面没有任何内容
> * 否定选择器（：not）
  *  否定选择器 `:not()`，可以让你定位不匹配该选择器的元素。IE6-8浏览器不支持:not()选择器
> * 伪元素（两个“：：”和一个“：”css3中主要用来区分伪类和伪元素）
  *  `::first-line`：选择元素的第一行
  *  `::first-letter`：选择元素的第一个字母
  *  `::before`和`::after`：这两个主要用来给元素的前面或后面插入内容，这两个常用"content"配合使用，见过最多的就是清除浮动
  *  `::selection`：用来改变浏览网页时选中文字的默认效果

###### 2、css3动画transform，transition和animation的区别
> * **transform(2D变换)**
  *  `translate(x,y)`：沿着 X 和 Y 轴移动元素。
  *  `rotate(angle)`：旋转，在参数中规定角度。
  *  `scale(x,y)`：缩放转换，改变元素的宽度和高度。
  *  `skew(x-angle,y-angle)`：倾斜转换，沿着 X 和 Y 轴。
  *  `matrix(n,n,n,n,n,n)`：定义 2D 转换，使用六个值的矩阵。

![transform](/uploads/transform.png)
> * **transition（过渡）**
`Tip:` transition允许css的属性值在一定的时间区间内平滑地过渡。这种效果可以在鼠标单击、获得焦点、被点击或对元素任何改变中触发，并圆滑地以动画效果改变CSS的属性值。
兼容性：IE10+，Firefox, Opera 和 Chrome
transition属性的值包括以下四个：
  *  `transition-property`： 指定对HTML元素的哪个css属性进行过渡渐变处理，这个属性可以是color、width、height等各种标准的css属性。
  *  `transition-duration`：指定属性过渡的持续时间
  *  `transition-timing-function`：指定渐变的速度：
      *  `ease`：（逐渐变慢）默认值
      *  `linear`：（匀速）
      *  `ease-in`：(加速)
      *  `ease-out`：（减速）
      *  `ease-in-out`：（加速然后减速）
      *  `cubic-bezier`：（该值允许你去自定义一个时间曲线）， 特定的cubic-bezier曲线。 (x1, y1, x2, y2)四个值特定于曲线上点P1和点P2。所有值需在[0, 1]区域内，否则无效。
  *  `transition-delay`：指定延迟时间，也就是经过多长时间才开始执行过渡过程。
> *  **animation（动画）**
需要配合@keyframes使用，语法规则:命名是由”@keyframes”开头，后面接着 “动画的名称”加上一对花括号“{}”，括号中就是一些不同时间段样式规则。不同关键帧是通过from（相当于0%）、to（相当于100%）或百分比来表示。@keyframes定义好后，须通过animation把它绑定到选择器。animation的属性如下：
  *  `Animation`：所有动画属性的简写属性（除了animation-play-state 属性）。
  *  `animation-name`：规定 @keyframes 动画的名称。
  *  `animation-duration`：规定动画完成一个周期所花费的秒或毫秒,默认是0。
  *  `animation-timing-function`：规定动画的速度曲线，默认是”ease”。
  *  `animation-delay`：规定动画何时开始，默认是 0
  *  `animation-iteration-count`：规定动画被播放的次数，默认是 1（infinite：无限次）
  *  `animation-direction`：规定动画是否在下一周期逆向地播放。默认“normal”（reverse：反向播放；alternate：奇数次正向播放，偶数次反向播放；alternate-reverse：奇数次反向播放，偶数次正向播放。）
  *  `animation-play-state`：规定动画是否正在运行或暂停，默认是“running”（paused：暂停动画）。

##### 三、Sass整理
`Sass`和`Less`两者都是CSS预处理器，具有相同的功能，快速编译代码，更好的维护样式代码。
不同点在于语法规则不同，相比`less`，`sass`更像一门正规的编程语言，有变量和作用域，变量有全局和局部之分，并且有优先级。有函数的概念，进程控制，数据结构。相同点在于：
> * `混入(Mixins)`——class中的class；
> * `参数混入`——可以传递参数的class，就像函数一样；
> * `嵌套规则`——Class中嵌套class，从而减少重复的代码；
> * `运算`——CSS中用上数学；
> * `颜色功能`——可以编辑颜色；
> * `名字空间(namespace)`——分组样式，从而可以被调用；
> * `作用域`——局部修改样式；
> * `JavaScript 赋值`——在CSS中使用JavaScript表达式赋值。

###### a、Sass基本用法：
&nbsp;&nbsp;&nbsp;&nbsp;1、`变量`（SASS允许使用变量，所有变量以$开头，如果变量需要镶嵌在字符串之中，就必须需要写在#{}之中)。
```css
$blue: #1875e7;
div {
    color: $blue
}
```

&nbsp;&nbsp;&nbsp;&nbsp;2、`计算功能`（SASS允许在代码中使用算式：)。
```css
body {
    margin: (14px/2);
    top: 50px + 100px;
}
```
&nbsp;&nbsp;&nbsp;&nbsp;3、`嵌套`（SASS允许选择器嵌套，属性也可以嵌套，在嵌套的代码块内，可以使用&引用父元素（伪类）;)。
###### b、代码重用：
&nbsp;&nbsp;&nbsp;&nbsp; 1、`继承`: SASS允许一个选择器，继承另一个选择器.
```css
.class1 {
    border: 1px solid #ddd;
}
/* class2要继承class1，需要使用 @extend 命令*/
.class2 {
    @extend .class1;
    font-size: 120%;
}
```
&nbsp;&nbsp;&nbsp;&nbsp; 2、`Mixin`: (定义可重用代码块)，mixin的强大之处，在于可以指定参数和缺省值。
```css
/* 使用 @mixin 命令，定义一个代码块 */
@minxin left {
    float: left;
    margin-left: 10px;
}
/* 使用 @include 命令，调用 minxin */
div {
    @include left;
}
```
&nbsp;&nbsp;&nbsp;&nbsp; 3、`颜色函数`（SASS提供了一些内置的颜色函数，以便生成系列颜色。）
&nbsp;&nbsp;&nbsp;&nbsp; 4、`插入文件`（@import命令，用来插入外部文件。如果插入的是.css文件，则等同于css的import命令。）
###### c、高级用法：
&nbsp;&nbsp;&nbsp;&nbsp; 1、`条件语句`
```css
/* @if 可以用来判断 */
p {
    @if 1 + 1 == 2 { border: 1px solid; }
    @if 5 < 3 { border: 2px detted; }
}
/* 一起的还有 @else 命令 */
@if lightness($color) > 30% {
    background-color: #000;
} @else {
    background-color: #fff;
}
```
&nbsp;&nbsp;&nbsp;&nbsp; 2、`循环语句`
```css
/* sass 支持 for 循环 */
@for $i from 1 to 10 {
    .border-#{$1} {
        border: #{$i}px solid blue;
    }
}
/* while 循环 */
$i: 6;
@while $i > 0 {
    .item-#{#i} {
        width: 2em * $i
    }
    $i: $i - 2
}
/* each 命令与for类似 */
@each $member in a,b,c,d {
    .#{$member} {
        background=image: url("#{$member}.jpg");
    }
}
```
&nbsp;&nbsp;&nbsp;&nbsp; 2、`自定义函数`
```css
/* Sass 允许用户编写自己的函数 */
@function double($n) {
    @return $n * 2
}

#sidebar {
    width: double(5px);
}
```

##### 四、最后
&nbsp;&nbsp;&nbsp;&nbsp;到现在算是`Css`的内容告一段落了，虽然文章中看起来提到的东西并不多，但是每一点的整理和总结，资料的查找也颇费功夫，如果有不对的地方欢迎指正。



