TITLE：Hyperledger Fabric在MacOS上的部署
AUTHOR：LostAbaddon
DATE：2021/09/24 18:00
KEYWORD：区块链 Hyperledger

[TOC]

#	1. 前期准备

1.	golang >= 1.16
2.	node.js与npm
3.	git
4.	curl与weget
5.	python 2.7

这些大部分可以用`brew`来实现，记得先`brew update`一下。

如果没有安装`brew`，可以去官网下载后自行安装。有些需要自己编译，注意别忘了设置环境变量。

##	XCode的影响

有时候安装或更新XCode后有些程序会出问题，比如我更新XCode后git不可用，此时需要重新安装Git。

这个坑比较多，只能自己琢磨……

#	2. Docker

下载并安装[Docker for Mac](https://hub.docker.com/editions/community/docker-ce-desktop-mac)。

注意在上述Docker官网需要选择Macbook的芯片是英特尔还是M1，当然字很大一般不会漏掉。

下载后安装Docker.dmg，安装成功后可以用下面的命令来检查是否安装成功：

```
docker --version
docker-compose --version
```

>	注意可能会提示外部安装不可用，此时在“系统偏好设置”的“安全性与隐私”的“通用”页打开一下即可。
后面还有很多地方也可能会遇到这个问题。


此后，打开Docker的配置页“Preference”，在“Docker Engine”中添加或修改如下字段内容：

```
"registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn"
]
```

这是启用国内的中科大镜像，否则速度非常慢。

#	3. Fabric与Fabric-Samples

使用`git`下载fabric：

```
git clone https://github.com/hyperledger/fabric.git
```

下载成功后进入fabric目录，查看当前可用版本：

```
git tag
```

选择最新版，我这里用的是`v2.3.3`：

```
git checkout v2.3.3
git switch -c v2.3.3
```

后面一步是创建本地分支，不执行也没问题。

接着是下载fabric-samples和docker images，我们可以直接使用scripts目录下的bootstrap.sh：

```
chmod +x bootstrap.sh
./bootstrap.sh
```

可以先将bootstrap.sh文件复制到你想要放fabric-samples的目录然后执行。

它会下载所需的目录和镜像，Docker开着的时候会自动加载镜像（但不会自己启动）。

接着，是比较重要的，那就是去官网下载bin和config目录，其中有需要的二进制文件与默认配置，不下载的话fabric-samples中的示例无法征程执行。

这里是[下载地址](https://github.com/hyperledger/fabric/releases)，其中Mac的话选择`hyperledger-fabric-darwin-amd64-X.X.X.tar.gz`文件。

下载下来后解压，然后将两个目录复制到fabric-samples目录中，就可以正常使用了。

