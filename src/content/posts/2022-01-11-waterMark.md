---
title: input 调用相机和HTML5 getUserMedia API 实现图片的拍照加水印功能
published: 2022-01-11T16:09:41+08:00
pinned: false
draft: false
description: 一、业务回顾 之前接到过一个需求，需要用户在企业微信内使用我们的程序时，进行拍照功能，并添加水印后将水印图片存储至自己的阿里云图片服务器，本身需求并不难，因为以当时的了解，加水印可以直接canvas操
tags: [canvas]
category: 前端
slug: waterMark
---
### 一、业务回顾
&nbsp;&nbsp;&nbsp;&nbsp;之前接到过一个需求，需要用户在企业微信内使用我们的程序时，进行拍照功能，并添加水印后将水印图片存储至自己的阿里云图片服务器，本身需求并不难，因为以当时的了解，加水印可以直接canvas操作，然后只需要调用企业微信暴露的chooseImage 方法得到图片file信息就可以，但是too native，企业微信对img的localIds进行了一层封装，无法触发img的onload事件，canvas自然就没办法去捕获绘图，尝试过二进制数据流，FileReader去进行文件转换，最后都没办法绕过，坑了很久，最后想着大不了不用微信的chooseImage，我自己去掉原生的API，getUserMedia获取用户拍照信息，很遗憾，这个方法在企业微信禁用了，所以最后的实现方案成了在后台服务器端加水印，然后通过腾讯服务器中转来获取图片，虽然最后的方案不尽人意，但是过程中还是学到了很多，就点，可以来简单的总结下getUserMedia的用法。
### 二、getUserMedia API简介
&nbsp;&nbsp;&nbsp;&nbsp;HTML5的getUserMedia API为用户提供访问硬件设备媒体（摄像头、视频、音频、地理位置等）的接口，基于该接口，我们可以在不依赖任何插件的条件下访问硬件媒体设备。
getUserMedia API最初是navigator.getUserMedia，目前已被最新Web标准（2017版的）废除，变更为navigator.mediaDevices.getUserMedia(),但浏览器支持情况不如旧版API普及。所以实际业务场景中使用时，一般都会做一些兼容处理。MediaDevices.getUserMedia（）方法提示用户允许使用一个视频和/或一个音频输入设备，例如相机或屏幕共享和/或麦克风。如果用户给予许可，就返回一个Promise对象，MediaStream对象作为此Promise对象的Resolved状态的回调函数参数，如果用户拒绝了许可，或者没有媒体可用的情况下PermissionDeniedError或者NotFoundError作为此Promise的Rejected状态的回调函数参数。注意，由于用户不会被要求必须作出允许或者拒绝的选择，所以返回的Promise对象可能既不会触发resolve也不会触发 reject。
### 三、实际使用
&nbsp;&nbsp;&nbsp;&nbsp;具体的使用方法其实也很简单,html如下，一个简单的video标签获取当前的媒体流，一个拍照按钮，一个canvas容器对图片进行水印处理。
```html
    <video id="video" width="320" height="240" autoplay></video>
    <button id="btn">拍照</button>
    <canvas id="canvas" width="320" height="240" ></canvas>
```
简单的JS代码如下：
```js
var camera = {
    video: document.getElementById('video'),
    canvas:  document.getElementById('canvas'),
    btn: document.getElementById("btn"),
    font: "14px microsoft yahei",
    style: "rgba(255,255,255,0.9)",
    text: "这是我要加的水印",
    height: 240, width: 320,
    draw_pic: function(){
        var self = this;
        var context = self.canvas.getContext('2d');
        context.drawImage(self.video, 0, 0, self.width,self.height);
        context.font = self.font;
        context.fillStyle = self.style;
        context.fillText(self.text, self.width - 140 , self.height - 10);
    },
    bind: function(){
        var self = this;
        self.btn.addEventListener("click", function() {
            self.draw_pic();
        });
    },
    init: function(){
        var video = this.video;
        // 原来的navigator.mediaDevices 方法已废弃， window.URL.createObjectURL 已废弃
        // 想要获取一个最接近 1280x720 的相机分辨率
        var constraints = { audio: true, video: { width: 1280, height: 720 } };

        navigator.mediaDevices.getUserMedia(constraints)
        .then(function(mediaStream) {
          video.srcObject = mediaStream;
          // 指定视频/音频（audio/video）的元数据加载后触发
          video.onloadedmetadata = function(e) {
            video.play();
          };
        }).catch(function(err) {
            console.log(err.name + ": " + err.message);
        });
        this.bind();
    }
};
camera.init();

```

&nbsp;&nbsp;&nbsp;&nbsp;实现效果如图，当用户调用相机时，获取视频流，然后将视频流设置为video元素的源，然后播放视频，点击拍照时绘制当前照片页面。
    ![js-three-bg](/uploads/waterMack.png)
当然，功能很简单，注意事项还是不少的，例如我刚才开始写的时候是用的window.URL.createObjectURL方法去设置视频流，但是一直有问题，Google发现属性已经废弃，可以直接video.src = stream,来使用视频流。但因为老版浏览器对旧属性支持更好所以用try catch做了兼容处理。针对上面用到的onloadedmetadata方法，这边有一些关于video视频元数据加载的执行顺序钩子：onloadstart、ondurationchange、onloadedmetadata、onloadeddata、onprogress、oncanplay、oncanplaythrough.

### 四、再次接触图片加水印

&nbsp;&nbsp;&nbsp;&nbsp;上面提到需求拍照加水印最后虽然实现了，但是是服务器端实现，占用服务器带宽，再加上现在手机拍照动辄十几M的图片大小，我们这个功能使用的客户数在两万左右，而且大概率是集中使用，这样就会导致服务器压力很大，当然，企业微信那块我们是真没办法处理，所以产品就把功能加在了标准版没有了企业微信的一系列限制，我们就可以大展手脚了，综合调研下，我们决定用input标签的 **accept="image/*" capture="camera"** 属性来实现仅调用相机，不从相册上传的限制，但是这个属性是有兼容问题，目前使用下来，除ios10.*.* 版本系统还是会提示从相机选择外，其他机型都是完美兼容的，既然客户同意，那咱开发自然肯定是没啥意见，功能点的实现大致是有以下几个坑。

> * 1、input兼容：就是刚刚提到的input 仅调用相机的兼容问题
> * 2、img图片渲染：对img元素加水印时，onLoad 事件的执行顺序问题。
> * 3、前端图片压缩：现在的手机拍摄照片过大，上传服务器有较大压力，如果功能对图片质量要求不是很高的话，对图片进行压缩也是必须的。
> * 4、IOS 拍照图片旋转角问题。
> * 5、canvas绘图后图片失真问题。
> * 6、图片转为二进制流数据传输时，toBlob 方法的兼容问题。

既然理论和坑都已经大致说在前面了，剩下的就是开始撸代码了，功能其实还是比较简单的，主要是踩坑过程比较艰辛，话不多说，上代码：
```html
    <input type="file" onChange='onFileSelected(event)' accept="image/*" capture="camera" />
```
为了demo简单，就将获取图片和加水印写在了一个方法里：
```js
// 参数为:file文件,水印内容，图片大小
Watermark = (file, text, maxWidth = 400) => {
    return new Promise((resove, reject)=>{
        // 上传之前通过FileReader方法去预览图片
        let reader = new FileReader();
        reader.onload = (e)=>{
            let image = new Image();
            image.src = e.target.result;
            image.onload = () => {
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');
                let { width, height } = this;
                if(maxWidth !== 0){
                    width = Math.min(maxWidth, this.width);
                    height = height * (width / this.width);
                }
                canvas.width = width;
                canvas.height = height;
                // 水印内容
                ctx.font='26px Roboto-Medium'; //字体
                ctx.fillStyle = '#FFFFFF';	//字体颜色
                ctx.fillText(text, 20, 35);

                // 如果需要base64的格式传输
                let base64 = canvas.toDataURL('image/png');
                resolve(base64);

                // 如果需要二进制流传输
                canvas.toBlob( blob => {
                    resolve(blob);
                };

            }
            image.src = e.target.result;
        }
        reader.onerror = reject;
        reader.readAsDataURL(file);
    })
}
```
#### IOS 拍照旋转问题
主要的代码结构其实已经完成，针对上面提到问题，可以增加适当的兼容代码，例如：IOS 拍照旋转问题，需要引入exif-js插件，做一下处理：
```js
/** 获取照片方向角属性 */
EXIF.getData(image, function(){
   let orientation = EXIF.getTag(this, 'Orientation');
    switch (orientation) {
        /** 需要顺时针90度旋转 */
        case 6:
            canvas.width = height;
            canvas.height = width;
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(90 * Math.PI / 180);
            ctx.drawImage(image, 0 - canvas.height / 2, 0 - canvas.width / 2, canvas.height, canvas.width);
            ctx.restore();
            break;
        /** 需要逆时针90度旋转 */
        case 8:
            canvas.width = height;
            canvas.height = width;
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(-90 * Math.PI / 180);
            ctx.drawImage(image, 0 - canvas.height / 2, 0 - canvas.width / 2, canvas.height, canvas.width);
            ctx.restore();
            break;
        /** 需要180度旋转 */
        case 3:
            ctx.save();
            ctx.rotate(180 * Math.PI / 180);
            ctx.drawImage(this, -width, -height, canvas.width, canvas.height);
            ctx.restore();
            break;
        default:
            ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
    }
});

```

#### IOS10.0版本以下，toBlob方法不存在的兼容方法
```js
// 当canvas对象的原型中没有toBlob方法的时候，手动添加该方法
if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
        value: function (callback, type, quality) {
            var binStr = atob(this.toDataURL(type, quality).split(',')[1]),
                len = binStr.length,
                arr = new Uint8Array(len);
            for (var i = 0; i < len; i++) {
                arr[i] = binStr.charCodeAt(i);
            }
            callback(new Blob([arr], { type: type || 'image/png' }));
        }
    });
}

```
#### Canvas图片压缩
还有就是Canvas图片压缩，图片压缩原理其实很简单，核心API就是使用`Canvas`的`drawImage()`方法，API大致如下：
```js
context.drawImage(img, dx, dy);
context.drawImage(img, dx, dy, dWidth, dHeight);
context.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
```
虽然参数很多，简单总结下其实可以归纳为如下三个参数：
        &nbsp;&nbsp;&nbsp;&nbsp;** img : ** &nbsp;&nbsp;图片对象,也可以是虚拟DOM中的图片对象
        &nbsp;&nbsp;&nbsp;&nbsp;** dx, dy, dWidth, dHeight : **&nbsp;&nbsp;表示在`canvas`画布上规划处一片区域用来放置图片，`dx`, `dy`为`canvas`元素的左上角坐标，`dWidth`, `dHeight`指`canvas`元素上用在显示图片的区域大小。如果没有指定`sx`,`sy`,`sWidth`,`sHeight`这4个参数，则图片会被拉伸或缩放在这片区域内。
        &nbsp;&nbsp;&nbsp;&nbsp;** sx, sy, swidth, sheight : ** &nbsp;&nbsp;这4个坐标是针对图片元素的，表示图片在canvas画布上显示的大小和位置。`sx`,`sy`表示图片上`sx`,`sy`这个坐标作为左上角，然后往右下角的`swidth`,`sheight`尺寸范围图片作为最终在`canvas`上显示的图片内容。
当然，为了方便我个人一般都是用五个参数的语法，我们举个例子，假如一张图片的尺寸是1024 \* 800，我们需要限制为102 \* 80，核心代码：
```js
    ...
    ctx.drawImage(img,0,0,102,80);
```
其实就这么一句代码就实现了图片压缩，有木有很简单。
#### `Canvas`绘图容易失真的问题
&nbsp;&nbsp;&nbsp;&nbsp;最后还有一个关于`Canvas`绘图容易失真的问题，这块内容主要涉及到`devicePixelRatio` 设备像素比，这块的话，大家可以去看张鑫旭的这篇文章：[文章地址](https://www.zhangxinxu.com/wordpress/2012/08/window-devicepixelratio/) 这块对`devicePixelRatio`属性进行了很详细的介绍，实际我们解决`canvas`画图模糊就是画一个两倍于实际大小的`canvas`，简单解释就是`devicePixelRatio`属性决定了用几个像素点渲染一个像素，假如某个屏幕的`devicePixelRatio`值为2，一张100 \* 100像素的图片会用两个像素点渲染，实际图片其实会占据200 \* 200像素空间，所以我们需要直接创建一个两倍实际大小`canvas`，然后用css样式把canvas限定在实际的大小，具体核心代码如下：
```js
...
var devicePixelRatio = window.devicePixelRatio || 1;
var backingStoreRatio = context.webkitBackingStorePixelRatio ||
                    context.mozBackingStorePixelRatio ||
                    context.msBackingStorePixelRatio ||
                    context.oBackingStorePixelRatio ||
                    context.backingStorePixelRatio || 1;
    var ratio = devicePixelRatio / backingStoreRatio;
    canvas.width = canvas.width * ratio;
    canvas.height = canvas.height* ratio;
    context.scale(ratio, ratio);
...
```
### 总结
&nbsp;&nbsp;&nbsp;&nbsp;嗯，到这里这篇文章差不多就要结束了，说的有点乱，大致就是前端实现图片上传，加水印，和后台数据传输（base64，二进制流）实现过程中的一些坑和注意事项，如有错误，不吝指教。

