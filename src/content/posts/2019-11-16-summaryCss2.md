---
title: 前端知识点总结(三) Css布局篇
published: 2019-11-16T15:20:35+08:00
pinned: false
draft: false
description: 一、简单介绍 关于 Css 第一章的时候总结了一些常用的基础知识，但是没有涉及到布局相关的东西，大家都知道 Css 布局算是一个核心功能，兼容和问题包括布局方法也都很多，这次单独拿出来一个章节对布局进
tags: [Css]
category: 前端
slug: summaryCss2
---
### 一、简单介绍
&nbsp;&nbsp;&nbsp;&nbsp;关于`Css`第一章的时候总结了一些常用的基础知识，但是没有涉及到布局相关的东西，大家都知道`Css`布局算是一个核心功能，兼容和问题包括布局方法也都很多，这次单独拿出来一个章节对布局进行一下总结，几种常见的布局写法，双飞翼布局，圣杯布局，还有`Css3`的`Flex`布局。正好今天是周末，阳光明媚的，午后晒晒太阳写点东西还是比较惬意的。
### 二、Css布局相关
#### 1、 grid布局(Grid layout)
    版本支持情况：IE10+（过时语法），Edge，chrome(57)，firefox(52)，opera(44)
**术语：**
`Grid container` (display: gird 的元素。 这是所有grid item的直接父项)；
`Grid item：` Grid 容器的孩子（直接子元素）。
`Grid line：` 这个分界线组成的网格结构，即可是垂直(column),也可是水平(lines);
`Grid track:` 两个相邻网格线之间的空间。
`Grid cell：` 两个相邻的行和两个相邻的列网格线之间的空间。它是网格的一个“单元”。
`Grid Area: ` 四个网格线包围的总空间。 网格区域可以由任意数量的网格单元组成。
**API：**
> * 父容器(Grid Container)的属性
 * `Display：` 元素定义为**grid contaienr**，并为其内容建立新的网格格式化上下文.
Grid：生成一个块级网格；**inline-grid**：生成一个行级网格；**subgrid**：从父节点获取行列大小。
注：**column**, **float**, **clear**, 以及 **vertical-align** 对一个 **grid container** 没有影响。
  * `grid-template-columns/grid-template-rows:`  使用以空格分隔的多个值来定义网格的列和行。值表示轨道大小(track size)，之间的空格代表表格线(grid line)。
例：**grid-template-columns: 40px 50px auto 50px 40px;**或**grid-template-columns: [first] 40px [line2] 50px [line3] auto [col4-start] 50px [five] 40px** [end]；另外**grid-template-columns: 1fr 1fr 1fr;**“fr”单位允许您将轨道大小设置为网格容器自由空间的一部分。自由空间是在排除所有不可伸缩的item 之后计算得到的。
  * `grid-template-areas: ` 通过引用 grid-area属性指定的网格区域的名称来定义网格模板.grid-area-name:使用 grid-area 属性设置的网格区域的名称。.：点号代表一个空网格单元. None:没有定义网格区域。
  *  `grid-template：` 在单个声明中定义 **grid-template-rows**、**grid-template-columns**、**grid-template-areas** 的简写。
  *  `grid-column-gap / grid-row-gap：` 指定网格线的大小，可以理解为设置列/行之间的间距的宽度。注：只能在列/行之间创建缝隙，而不是在外部边缘创建。**grid-row-gap** 和 **grid-column-gap**可以简写为**grid-gap：*px *px;**
  *  `justify-items: ` 沿着Y轴对齐网格内的内容；**align-items**,沿着X轴对齐；
	start: 内容与网格区域的左端对齐；end: 内容与网格区域的右端对齐； center: 内容位于网格区域的中间位置；**stretch:** 内容宽度占据整个网格区域空间(这是默认值)；
  *  `justify-content/align-content：` 有时，网格的总大小可能小于其网格容器的大小。此时，你可以设置网格容器内的网格的对齐方式。（justify Y轴，align X轴）。
	Start：网格与网格容器的左边对齐；End：网格与网格容器的右边对齐；Center： 网格与网格容器的中间对齐；Stretch：调整grid item 的大小，让宽度填充整个网格容器；Space-around：在 grid item 之间设置均等宽度的空白间隙，其外边缘间隙大小为中间空白间隙宽度的一半；Space-between：在grid item之间设置均等宽度空白间隙，其外边缘无间隙；Space-evenly：在每个 grid item 之间设置均等宽度的空白间隙，包括外边缘。
  * `grid-auto-columns/grid-auto-rows:`  指定自动生成的网格轨道（又名隐式网格轨道）的大小,简单理解就是当你指定的定位超过了网格范围的行或列时被创建。
*  子元素(Grid Items)的属性
	*   `grid-column-start/grid-column-end/grid-row-start/grid-row-end：`使用特定的网格线确定grid item在网格内的位置。grid-column-start/grid-row-start 属性表示grid item的网格线的起始位置，grid-column-end/grid-row-end属性表示网格项的网格线的终止位置。
Line: 可以是一个数字来指代相应编号的网格线，也可使用名称指代相应命名的网格线;
Span<number>: 网格项将跨越指定数量的网格轨道;Span<number>: 网格项将跨越一些轨道，直到碰到指定命名的网格线; auto: 自动布局， 或者自动跨越， 或者跨越一个默认的轨道。
    *  `justify-self/align-self：`沿着轴grid item 里的内容。 此属性对单个网格项内的内容生效。（justify沿着Y轴，align沿着X轴）；

#### 2、Flexbox 布局相关
> **1. 什么是Flexbox：**
CSS3 引入的新的布局模式。它决定了元素如何在页面上排列，使它们能在不同的屏幕尺寸和设备下可预测地展现出来。
**2.	兼容情况，什么情况下不建议使用：**
IE10、11部分支持，低版本不支持，现代浏览器支持。整体页面布局或者完全支持就浏览器网站不建议使用。
**3. 基本API：**
> * 容器属性
  *  `Flex-direction`：决定主轴的方向（即项目排列方向）
      *  `row`：主轴水平，起点在左；
      *  `column`：主轴垂直，起点在上；
      *  `row-reverse`：主轴水平，起点在右
      *  `column-reverse`：主轴垂直，起点在下；
  *  `Flex-wrap`：默认情况下，项目排成一行，flex-wrap定义如何换行。
      *  `Wrap`：换行，第一行在上；
      *  `wrap-reverse`：换行，第一行在下；
  *  `Flex-flow`: `flex-direction`和`flex-warp`的简写，默认row nowrap；
  *  `justify-content`：定义了项目在主轴（X轴）的对齐方式
        *  `flex-start`：默认左对齐；
        *  `flex-end`：右对齐；
        *  `center`：居中
        *  `space-between`：两端对齐，间隔相等;
        *  `space-around`：每个项目两侧间隔相等。
  *  `align-items`：定义了项目在交叉轴（Y轴）上的对齐方式
        *  `Flex-start`：交叉轴起点对齐；
        *  `flex-end`：终点对齐；
        *  `center`:居中
        *  `Baseline`：项目第一行文字对齐；
        *  `stretch`：默认，未设置高度。占满容器高度。

![justifyContent](/uploads/justifyContent.png)
> * 项目属性
  *  `order：` 定义项目的排列顺序，数值越小，越往前，默认0
  *  `flex-grow：` 定义项目的放大比列，默认0，即如果存在剩余也不放大，如果所有项目的flex-grow属性为2，其他为1，则前者占据比其对一倍。
  *  `flex-shrink：` 定义了项目的缩小比列，默认1，如果空间不足，则缩小，。如果所有项目的flex-shrink属性为1，当空间不足时，都将等比列缩放，如果一个项目的flex-shrink属性为0，其他为1，若空间不足，为0则不缩小。
  *  `flex-basis：` 定义了在分配多余空间之前，项目占据的主轴空间，浏览器根据这个属性，计算主轴是否又多余空间，默认为auto，即本来大小。
  *  `flex：` flex是flex-grow，flex-shrink，flex-basis的简写，默认0，1，auto；
  *  `align-self：` 允许单个项目有与其他项目不一样的对齐方式，可以覆盖align-items属性，默认为auto，表示继承父元素的align-items属性。

#### 3、实现两栏布局，三列布局中间自适应，三栏布局（圣杯布局，双飞翼布局）的方法。
&nbsp;&nbsp;&nbsp;&nbsp;**a、两栏布局（左侧固定，右侧自适应）**
&nbsp;&nbsp;&nbsp;&nbsp;第一种: float + BFC方法（这个方案同样是利用了左侧浮动，但是右侧盒子通过overflow: auto;形成了BFC，因此右侧盒子不会与浮动的元素重叠。）
```css
.wrapper{
    overflow: auto;
}
.wrapper .left {
    float: left;
    margin-right: 20px;
}
.wrapper .right {
    margin-left: 0;
    overflow: auto;
}
```
&nbsp;&nbsp;&nbsp;&nbsp;第二种: Flex方案
```css
/*  flex容器的一个默认属性值:align-items: stretch;这个属性导致了列等高的效果。 */
/*  为了让两个盒子高度自动，需要设置: align-items: flex-start;  */

wrapper{
    display: flex;
    align-items: flex-start;
}
.wrapper .left {
    flex: 0 0 auto;
}
.wrapper .right {
    flex: 1 1 auto;
}
```
&nbsp;&nbsp;&nbsp;&nbsp;**b、三列布局（左右宽度固定（要想不固定将宽度值改为百分值即可），中间自适应）**
&nbsp;&nbsp;&nbsp;&nbsp;**第一种：绝对定位法**（左右两栏采用绝对定位，分别固定于页面的左右两侧，中间的主体栏用左右margin值撑开距离。于是实现了三栏自适应布局。）注：html元素高度为100%；
&nbsp;&nbsp;&nbsp;&nbsp;**第二种：自身浮动法**（左栏左浮动，右栏右浮动，主体直接放后面，就实现了自适应）;
&nbsp;&nbsp;&nbsp;&nbsp;**第三种：圣杯布局**（中间栏要在浏览器中优先展示渲染）
&nbsp;&nbsp;&nbsp;&nbsp;实现思路：首先设置父元素位置，padding左右空出left和right的宽度，将主体部分的三个子元素都设置左浮动，设置main宽度width：100%；让其独占一行，然后设置left和right的负的外边距（负的margin-left会让元素沿文档流向左移动，如果负的数值比较大就会一直移动到上一行，设置left部分的margin-left为-100%,就会使left向左移动一整个行的宽度，由于left左边是父元素的边框，所以left继续跳到上一行左移，一直移动到上一行的开头，并覆盖了main部分，left上移过后，right就会处于上一行的开头位置，这时再设置right部分margin-left为负的宽度，right就会左移到上一行的末尾。）接下来分别把left和right用相对定位移动到两个留白就可以。代码如下
```html
<!--html-->
<div class='container'>
    <div class='main'>main</div>
    <div class='left'>left</div>
    <div class='right'>right</div>
</div>
```
```css
/* css */
.container{
    padding: 0 300px 0 200px;
}
.left,.main,.right{
    position: relative;
    min-height: 130px;
    float: left;
}
.left{
    left: -200px;
    margin-left: -100%;
    background: green;
    width: 200px;
}
.right{
    right: -300px;
    margin-left: -300px;
    background-color: red;
    width: 200px;
}
.mian{
    background-color: blue;
    width: 100%;
}
```
&nbsp;&nbsp;&nbsp;&nbsp;**第四种：双飞翼布局**（与圣杯布局的不同在于解决中间栏div内容不被遮挡问题）
```html
<!--html-->
<div class='container'>
    <div class='main'>
        <div class='content'>main</div>
    </div>
    <div class='left'>left</div>
    <div class='right'>right</div>
</div>
```
```css
/* css 双飞翼布局比圣杯布局多创建了一个div，但不用相对布局了。*/
.left,.main,.right{
    float: left;
    min-height: 130px;
    text-align: center;
}
.left{
    background: green;
    width: 200px;
    margin-left: -100%;
}
.mian{
    background-color: blue;
    width: 100%;
}
.right{
    background-color: red;
    width: 200px;
    margin-left: -300px;
}
.content{
    margin:0 300px 0 200px;
}
```

