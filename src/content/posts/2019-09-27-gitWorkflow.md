---
title: Git的基本操作和 git workflow
published: 2019-09-27T23:03:05+08:00
pinned: false
draft: false
description: 一、扯扯Git的诞生 在没有Git之前，大家大部分都是靠 SVN 和 CVS 等集中式的版本控制系统，集中式版本控制系统不但速度慢，而且必须联网才能使用，所有的版本信息都放在服务器上，万一服务器宕机一
tags: [git]
category: 前端
slug: gitWorkflow
---
### 一、扯扯Git的诞生

&nbsp;&nbsp;&nbsp;&nbsp;在没有Git之前，大家大部分都是靠`SVN`和`CVS`等集中式的版本控制系统，集中式版本控制系统不但速度慢，而且必须联网才能使用，所有的版本信息都放在服务器上，万一服务器宕机一个小时，基本上这一个小时大家就不用工作了。这个时候分布式代码版本控制就横空出世了，优点很明显，分布式管理，没有网络的情况下仍然可以查看日志、提交代码、创建分支，而且支持`local branch`, 缺点可能算是有一定的学习曲线，但是作为程序员算是一个基本技能。

<!-- more -->

### 二、Git的基本操作

#### 1、创建版本库

&nbsp;&nbsp;&nbsp;&nbsp;版本库其实就是一个仓库，仓库里面的所有文件都可以被`Git`管理起来，对文件的每次修改，删除，新增都可以进行追踪。新建一个仓库非常简单只需要新增一个文件夹，然后`init`一下就可以。
```shell
// 新建一个文件夹
$  mkdir gitDemo

// 初始化Git仓库
$  git init
```
&nbsp;&nbsp;&nbsp;&nbsp;然后你就会发现在文件夹下多了一个`.git`的文件夹，这个文件夹就是来跟踪管理版本库的，一般不需要改动。如果没有看到`.git`文件夹那应该是隐藏了可以通过 `ls -ah` 命令查看。

#### 2、将文件添加到版本库
&nbsp;&nbsp;&nbsp;&nbsp;当我们对文件进行改动需要提交到仓库时，只需要做二步就可以,假如我需要把readme.text加入到仓库
```shell
// 用 add 命令告诉 git 我准备把文件添加到仓库, 暂时先放在你这(暂存区)
$   git add readme.text

// 用 commit 命令提交到本地仓库，Git是分布式，commit后本地就会有提交记录
// commit命令是有一个 -m 参数后面跟随的是此次提交的说明，这个说明很重要，不能乱写，不然后面找改动记录就很麻烦了
$   git commit -m 'init readme.text file'

```
&nbsp;&nbsp;&nbsp;&nbsp;我们现在已经成功提交了一个文件，如果我们想随时知道当前版本库的状态可以使用 `git status` 命令进行查看，这个命令会告诉我们当前的状态几个文件`add`, 几个`commit`都可以清楚的看到，但是如果我们想知道这次对文件做了哪些修改，就可以使用 ` git diff `命令进行查看，这个命令在我们实际开发中每次提交前通过`diff`去查看本次的改动还是很有必要的。

#### 3、远程仓库
&nbsp;&nbsp;&nbsp;&nbsp;我们知道一个项目不可能只有我们自己在开发，那么协作开发就需要用到一个中间服务器，角色有点类似`SVN`的中央存储但是又有本质的区别，在`git`中可以理解成交换中心，我们自己写完代码推送到远程交换中心，别人想要看到我们的最新代码就需要就远程就拉取。远程库的创建有两种方式，一种是本地已有仓库，和远程关联，一种是先创建远程，直接通过命令克隆到本地然后进行开发。如果一个项目从头开始，个人还是比较建议先创建远程仓库，然后从远程克隆库。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>I、</b>添加远程库
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;假设我们现在已经创建了一个远程仓库，现在流行的git仓库管理地址也就差不多是`Github Gitee GitLab`等平台，创建仓库的方式都大同小异也很简单。创建仓库后会提示我们克隆新的，还是关联已有的，如果关联已有的话我们需要在本地仓库运行命令：
```shell
$ git remote add origin git@github.com:userName/gitDemo.git
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;以 `GitHub` 为例，上面的userName需要替换成你自己的账户名称，这个命令其实就是将本地仓库和远程关联了起来，下一步就需要把本地的内容全部推送上去。
```shell
$ git push -u origin master
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`git push`命令就是把本地库的内容推送到远程，由于远程库是空的，我们第一次推送`master`分支时，加上了`-u`参数，`Git`不但会把本地的`master`分支内容推送的远程新的`master`分支，还会把本地的`master`分支和远程的`master`分支关联起来，在以后的推送或者拉取时就可以简化命令。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>II、</b>从远程克隆
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;从远程克隆的话其实就很简单了，远端创建好仓库后，只需要执行命令：
```shell
$ git clone git@github.com:userName/gitDemo.git
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如果有多人开发只需要每个人各自克隆一下就好了。
#### 4、分支管理
&nbsp;&nbsp;&nbsp;&nbsp;几乎每一种版本控制系统都以某种形式支持分支，分支的功能大致就是将不同功能的代码剥离出来，同时不影响主线的开发。实际应用中，一般采用一个`master`主分支，为线上稳定版本分支，此分支不可直接提交，只能通过`develop`或者`hotfix`分支进行合并。一个为`develop`开发分支，分支为最新完成开发通过开发自测的开发分支，在我们项目中，给到测试的代码就是直接从`develop`中打包，而没有采用`release`分支。第三个为`feature`分支，也就是功能分支，当我们接到一个新功能需要开发时，需要从`develop`分支切一个属于自己的功能开发分支，当功能开发完成需要交付测试时，将代码合并至`develop`分支。最后还需要一个`hotfix`分支，此分支用来解决线上爆出的bug需要紧急修复，此分支需要从线上版本`master`分支切出，通过测试上线后合并至`master`和`develop`分支。这是现在大多数包括我们自己开发团队在使用的`Git`分支管理规范和流程，也是前人经过探索总结的，来保证开发过程更好的进行沟通协作。这种` git flow `模式下的项目会一直保留两个长期分支，`master`存放对外发布的稳定版，`develop`存放日常开发的最新版。另外`master`每次发布后需要对当前节点打上`标签(Tag)`进行记录，一般可以用于版本号记录，方便以后版本追溯。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>I、</b>基本管理
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;创建分支很简单,速度也很快，主要因为创建分支时，`Git`只是新建了一个指针，指向切出分支相同的那次提交，再把`HEAD`指向新分支，就表示在新建分支上，工作区文件实质上没有变化。分支操作的基础命令如下:
```js
// 创建分支
$ git branch (branchname)

// 切换分支（-b 参数表示创建并切换）
// 或者 git switch （-c 参数表示创建并切换）
$ git checkout (branchname)
$ git checkout -b (branchname)

$ git switch (branchname)
$ git switch -c (branchname)

// 合并分支
$ git merge

// 列出所有分支
$ git branch

// 删除分支
$ git branch -d (branchname)
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>II、</b>标签管理
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;上面我们其实也有提到针对`master`的每次发布进行打标签，其实标签就是来定义一个重要阶段，并希望永远记住那个时刻，比如我们版本发布了`1.0版本`,就可以在`master`的最新一次提交加上`V1.0`得标签。
```JS
// 创建一个带注解标签
$ git tag -a v1.0

// 查看所有标签
$ git tag

// 删除标签
$ git tag -d v1.0

// 对历史提交打标签
$ git tag v1.0 commitID
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;需要注意的一点是标签总是与某个`commit`挂钩的，如果这个`commit`既出现在`master`分支又出现在`dev`分支那么这两个分支都是可以看到标签的。
#### 5、Git Stash 和 Git WorkTree 场景和用法
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>I、Git Stash </b>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我们在开发时经常会遇到这样的场景，正在 `feature` 分支开发功能，线上突然出现了高优先级bug要马上解决，但是新功能才写了一半不想提交，这个时候就可以用`stash`命令将当前进度保存起来，然后切换至另一个分支修改bug，修改完成后切回 `feature` 恢复之前进度继续开发。
```JS
// 保存当前工作进度，可以添加save增加注释，可以多次使用
$ git stash save <message>

// 显示保存进度列表
$ git stash list

// 恢复最新的进度
$ git stash pop

// 删除一个存储进度，不指定stash_id，默认删除最新
$ git stash drop [stash_id]

// 删除所有存储进度
$ git stash clear
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>II、Git WorkTree </b>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`git stash` 已经可以基本上帮助我们解决多个分支切换工作的问题，但是工作中更多的时候会有需要并行开发的情况，我需要同时多开编辑器，而且更多时候因为分支不同，我有可能依赖的`node_modules`版本也是有差异的，但是因为我们配置`ignore`的原因，切换分支并不会重新安装依赖会导致打包依赖时的各种问题，`git 2.6 `以上开始提供了` worktree` 功能，可以解决这样的问题。`git worktree` 从一个仓库中可以创建多个工作目录，方便多开编辑器并行开发。`git worktree `的命令只有几行非常容易记住。
```js
// 增加新的worktree
$ git worktree add [路径] [分支]

// 新分支创建
$ git worktree add -b [新分支名] [新路径] [从此分支创建]
// eg. git worktree add -b myNewBranch ../testDir master

// worktree 详细情况, 可以增加 --porcelain 选项，用来改变显示风格
$ git worktree list --porcelain

// 删除worktree(删除关联目录后，清除worktree信息
$ git worktree prune
```
#### 6、撤销和回滚
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在我们开发过程中肯定会遇到这样的场景，一、我刚把不想要的代码，点错了给`commit`，但是还没有`push`，二、线上炸了，需要还原这次代码。类似于这几种情况我们就需要用到`git`的撤销与回滚。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;场景一、未`push`之前的所有提交操作，可以统称为撤销.
```js
// 文件被修改，但是还没 add
$ git checkout fileName
$ git checkout .

// 对多个文件执行了add，但是只想提交一部分
$ git add *
$ git status
# 取消暂存
$ git reset HEAD <filename>

// 文件执行了add 但是不想要这些改动
# 取消暂存
$ git reset HEAD fileName
# 撤销修改
$ git checkout fileName
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;场景二、已进行`push`，需要回滚。
```js
// 回滚到tag标记处
$ git checkout <tag>

// 撤销指定文件到指定版本
# 查看指定文件的历史版本
git log <filename>
# 回滚到指定commitID
git checkout <commitID> <filename>

// 删除最后一次远程提交
#使用revert
$ git revert HEAD
$ git push origin master
# 使用reset
$ git reset --hard commitID^
$ git push origin master -f
#区别: revert 放弃提交但是会生成一次新的提交，reset直接重置到指定提交

// 回滚某次提交
# 找到要回滚的commitID
git log
git revert commitID

```

