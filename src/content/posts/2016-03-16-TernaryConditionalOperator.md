---
title: Javascript三元条件运算符
published: 2016-03-16T22:03:05+08:00
pinned: false
draft: false
description: "今天谈一个小知识点，三元运算符。三元运算，顾名思义会有三个要素，表达式的大致组成为condition ? expr1 : expr2；一个语句加两个表达式。问号之前为判断语句。如果为真，则执行第一个表"
tags: [js]
category: 前端
slug: TernaryConditionalOperator
---
今天谈一个小知识点，三元运算符。三元运算，顾名思义会有三个要素，表达式的大致组成为condition ? expr1 : expr2；一个语句加两个表达式。问号之前为判断语句。如果为真，则执行第一个表达式，如果为假，则执行第二个表达式。我的理解其实就是简化的if else语句，举个栗子，经常看到的一个点击展开，再点击隐藏按钮:

![js-three-bg](/uploads/three.png)

我想实现点击输入法，实现下面ul的展开与隐藏，如果我们用if else的话可能会这么写：

<!-- more -->

```js
     oBth.onclick=function(){
        if (oUl.style.display=='block') {
            oUl.style.display=='none';
        }else{
            oUl.style.display=='block';
        }
    }
```
但是如果我们用三元运算符的话可能就只需要下面这一行代码：

```js
    oBth.onclick=function(){
    oUl.style.display == "block" ? oUl.style.display="none" : oUl.style.display="block"
}
```

有木有很神奇。当然我只是用了一个比较容易理解的写法，还有很大的优化空间，我们当然也可以这样：

```js
    oBth.onclick=function(){
        var style = oUl.style.display;
        oUl.style.display= style == "block" ? "none":"block"  //这样写的话就一定不能忘了把运算结果重新赋值给元素 - -
　　    //oUl.style.display= (style == "block" ? "none":"block") 可读性更高
    }
```

上面代码的意思是，如果style == "block" 成立的话就把none返回，不成立就返回block，然后把返回结果赋值给作用元素，不过要特别注意 = 和 == 用法和区别。因为赋值运算符（=）的优先级比较低，所以会最后执行赋值运算。如果把后面的三元运算符加上（）可读性会更高一点，但效果是一样的。

## 比较容易出错的地方：

三元运算比较容易出错的应该就是运算的优先级问题：

```js
    var isMember = false;
    console.log("当前费用" + isMember ? "$2.00" : "$10.00"); //返回$2.00
```

```js
    "当前费用false" ? "$2.00" : "$10.00");
```
在js中字符串是为真的，所以会输出$2.00.

不过为了避免以上错误的话，可以记住
### 不是false, 0, undefined, NaN, "" or null，js都认为是true;
感谢阅读。

