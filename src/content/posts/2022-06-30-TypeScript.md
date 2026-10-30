---
title: TypeScript 基础入门知识分享(一)
published: 2022-06-30T23:09:41+08:00
pinned: false
draft: false
description: 一、简单介绍 从第一次接触TS到现在其实已经有一年多的时间，当初在上家公司是开始技术栈使用Angular 2，大家都知道Angular2框架是使用TypeScript开发的，Angular和TypeS
tags: [TypeScript]
category: 前端
slug: TypeScript
---
### 一、简单介绍

&nbsp;&nbsp;&nbsp;&nbsp;从第一次接触TS到现在其实已经有一年多的时间，当初在上家公司是开始技术栈使用Angular 2，大家都知道Angular2框架是使用TypeScript开发的，Angular和TypeScript一起使用非常简单方便，那时候ES6语法都还比较新，TS可以很好地去补充一些新的属性API，加上那时候后台用的ASP.NET Core，借那个机会也学习了一波，不过最后项目转型使用了vue全家桶，也就放弃了TS的使用，虽然现在vue对ts的支持也已经很好了，现在的工作技术栈集中在React上，所以可以简单的分享下一些TypeScript的用法，和利用webpack+ TypeScript + React Hooks 搭建一个简单的TodoList.这次会分两篇文章，第一篇大致介绍下ts用法，第二篇用webpack搭建一个ts+react的简易demo。

<!-- more -->

### 二、TypeScript 概述和基本用法
&nbsp;&nbsp;&nbsp;&nbsp;TypeScript本质上是向javaScript语言添加了可选的静态类型和基于类的面向对象编程，同时也支持诸如接口，命名空间，装饰器等特性，相当于js的超集。因为ES6大家都已经很熟悉，所有一些ES6已经包含的语法这边就不在赘述，类似于声明解构赋值，let，const使用，可选参数，默认参数，箭头函数之类的。
#### 1、安装
TypeScript相关的工具一般都是通过npm进行安装，安装命令如下：
```shell
    npm install -g typescript@3.6.0
```
安装完成后可以来编写第一个TypeScript程序，类似于新建一个hello.ts，加入代码 `console.log('Hello TypeScript!')`，然后通过tsc编译器来编译ts文件，生成相对应的javascript文件，编译代码如下：编译过后的文件可以直接在浏览器中运行
```shell
    tsc hello.ts
```
#### 2、基本类型
在Ts中，提供了一下基本类型：
> * 布尔类型（boolean） ` eg : let isDone: boolean = false;`
> * 数字类型 (number)   ` eg: let decLiteral: number = 6; 支持二、八、十、十六进制`
> * 字符串类型 (string) ` eg: let name: string = "bob"; 支持模板字符串`
> * 数组类型 (array)    ` eg: let list: number[] = [1, 2, 3]; 或者泛型数组，Array<元素类型>`
> * 元祖类型 (trup)     ` eg: let x: [string, number]; 表示一个已知元素数量和类型的数组，各元素的类型不必相同`
> * 枚举类型（enum） ` eg : enum Color {Red, Green, Blue} let c: Color = Color.Green;`
> * 任意值类型（any） ` eg : let notSure: any = 4; 一般用于忽略类型检查`
> * 空值（void）    `eg: (): void 一般用于函数没有返回值的情况，像是和any类型相反`
> * Null 和 Undefined `是所有类型的子类型，只有当指定了--strictNullChecks标记，才会严格检查`
> * Never 类型  `表示永不存在的值，一般用于抛出错误时使用`

#### 3、类
&nbsp;&nbsp;&nbsp;&nbsp;ES6中已经支持了基于类的面向对象编程，在Ts中，同样也是使用extends关键字实现继承，封装，继承，多态，是面向对象的三大特性。类必须拥有一个构造函数，如果类扩展了其他类，则创建的任何构造函数都必须要包含对super的调用。这里主要是着重说一下Ts中的类的修饰符。在类中的修饰符可以分为公共(public)、私有(private)、受保护(protected)三种。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`I、Public 修饰符`
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在TypeScript里，成员都默认为public。可以自由的访问程序里定义的成员。
&nbsp;&nbsp;&nbsp;&nbsp;`II、Private 修饰符`
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当成员被标记成private时，它就不能在声明它的类的外部访问。
&nbsp;&nbsp;&nbsp;&nbsp;`III、Protected 修饰符`
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;protected修饰符与private修饰符的行为很相似，但有一点不同，protected成员在派生类中仍然可以访问。
&nbsp;&nbsp;&nbsp;&nbsp;`IV、Readonly 修饰符`
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;可以使用readonly关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。
&nbsp;&nbsp;&nbsp;&nbsp;`V、静态属性 static`
&nbsp;&nbsp;&nbsp;&nbsp;到目前为止，我们只讨论了类的实例成员，那些仅当类被实例化的时候才会被初始化的属性。 我们也可以创建类的静态成员，这些属性存在于类本身上面而不是类的实例上。

#### 4、接口

&nbsp;&nbsp;&nbsp;&nbsp;Ts的接口使用方式类似于Java，同时还增加了更加灵活的接口类型，包括属性、函数、可索引和类等类型。在TypeScript里，接口的作用就是为类型命名和自己的代码或第三方代码定义契约。在Ts中使用`Interface`关键字来定义接口。

&nbsp;&nbsp;&nbsp;&nbsp;`I、属性接口`
```js
    interface FullName {
        firstName: string;
        secondName: string;
    }
```
&nbsp;&nbsp;&nbsp;&nbsp;属性接口的定义很简单，ts还提供了可选属性，可选属性对可能存在的属性进行预定义，并兼容不传值的情况，用法就是在变量名后加一个？写法示例：`secondName？: string`。
&nbsp;&nbsp;&nbsp;&nbsp;`II、函数类型接口`
&nbsp;&nbsp;&nbsp;&nbsp;接口除了描述带有属性的普通对象外，也能描述函数类型，定义函数类型接口时，需要明确定义函数的参数列表，和返回值类型，且参数列表的每个参数都要有参数名和类型，示例：
```js
    interface encrypt {
        （val: string, salt: string）: string
    }
```
&nbsp;&nbsp;&nbsp;&nbsp;`II、可索引类型接口`
&nbsp;&nbsp;&nbsp;&nbsp;可索引类型接口用来描述那些可以通过索引得到的类型，类似于array[1],object['name']等，其实就是通过特定的索引来得到指定类型的返回值。示例：
```js
    interface indexArray {
        [index: number]: string
    }
    let userArray: indexArray  = ['A', 'B'];
    userArray[0]   // 结果为A
```

&nbsp;&nbsp;&nbsp;&nbsp;`III、类类型接口`
&nbsp;&nbsp;&nbsp;&nbsp;类类型接口主要用来规范一个类的内容，示例：
```js
    interface Animal {
        name: string;
        setName(n: string): void;
    }

    class Dog implements Animal {
        constructor(n: string) {}
        name: string;
        setName(n: string) {
            this.name = n;
        }
    }
```

&nbsp;&nbsp;&nbsp;&nbsp;`IV、接口拓展`
&nbsp;&nbsp;&nbsp;&nbsp;和类一样，接口也可以实现相互拓展，即能将成员从一个接口复制到另一个里面，这样可以更灵活的将接口拆分到可复用的模块里，一个接口可以继承多个接口，创建出多个接口的合成接口，示例：
```js
    interface Shape {
        color: string;
    }

    interface Square extends Shape {
        sideLength: number;
    }

    let square = <Square>{};
    square.color = "blue";
    square.sideLength = 10;
```

#### 5、泛型(generic)
&nbsp;&nbsp;&nbsp;&nbsp;在实际开发中，我们定义API不仅仅需要考虑功能是否健全，更多的还要考虑到API的复用性，这个时候急需要组件支持不特定的数据类型，而泛型就是用来实现这样的效果。示例：
```js
    function identity<T>(arg: T): T {
        return arg;
    }
```
&nbsp;&nbsp;&nbsp;&nbsp;我们给identity方法添加了类型变量`T`，`T`帮助我们捕获用户传入的类型，之后我们就可以使用这个类型，例子中就是使用了`T`作为返回值，这样我们就可以知道参数类型与返回值类型是相同的了。还有就是比较常用的场景就是使用泛型变量，我们改变下之前的例子：
```js
    function identity<T>(arg: T): T {
        console.log(arg.length); // Error: T doesn't have .length
        return arg;
    }
```
&nbsp;&nbsp;&nbsp;&nbsp;如果直接这样使用的话编译器会报错，这是因为并没有地方指明arg具有这个属性，记住，这些类型变量代表的是任意类型，所以使用这个函数的人有可能传入的是个数字，就会报错。所以我们可以假设我们想操作的是`T`类型的数组，而不直接是`T`,所以我们可以这样：
```js
    function identity<T>(arg: T[]): T[] {
        console.log(arg.length); // // Array has a .length, so no more error
        return arg;
    }
```
或者这种写法
```js
    function loggingIdentity<T>(arg: Array<T>): Array<T> {
        console.log(arg.length);  // Array has a .length, so no more error
        return arg;
    }
```
### 三、总结

上面总结了TypeScript的基本用法，这些用法算是TS中最基础的，但是是实际开发中用到最多的，二八原则，先花20%的时间学会80%的东西，剩下的高阶用法等到该用了，自然就会用了。



