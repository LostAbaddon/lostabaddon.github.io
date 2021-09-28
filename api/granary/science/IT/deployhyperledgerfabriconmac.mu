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

如果反复多次出现诸如`“xxxx”命令需要安装命令行开发者工具`这样的提醒，则可能是XCode损坏，建议重新安装最新版XCode。

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

接着，是比较重要的，那就是去官网下载bin和config目录，其中有需要的二进制文件与默认配置，可以通过前面下载的fabric文件夹中的源码直接用`make`命令来编译来获得，或者[到官网下载编译好的包](https://github.com/hyperledger/fabric/releases)，其中Mac的话选择`hyperledger-fabric-darwin-amd64-X.X.X.tar.gz`文件。下载下来后解压，然后将两个目录复制到fabric-samples目录中，就可以正常使用了。

有时会需要fabric-ca包，源码可以点[这里](https://github.com/hyperledger/fabric-ca)，或者点[这里](https://github.com/hyperledger/fabric-ca/releases)直接下载官方编译好的包。

#   4.  其它

##  test-network

在运行fabric-samples中的test-network测试项目时，可能会在执行`./network.sh createChannel`时遇到`osnadmin: error: unknown long flag '--channelID'`错误，此时需要编辑该目录下/scripts中的createChannel.sh文件，其中40行原本代码为：

```
osnadmin channel join --channelID $CHANNEL_NAME --config-block ./channel-artifacts/${CHANNEL_NAME}.block -o localhost:7053 --ca-file "$ORDERER_CA" --client-cert "$ORDERER_ADMIN_TLS_SIGN_CERT" --client-key "$ORDERER_ADMIN_TLS_PRIVATE_KEY" >&log.txt
```

将其中的`--channelID`调整为`--channel-id`即可：

```
osnadmin channel join --channel-id $CHANNEL_NAME --config-block ./channel-artifacts/${CHANNEL_NAME}.block -o localhost:7053 --ca-file "$ORDERER_CA" --client-cert "$ORDERER_ADMIN_TLS_SIGN_CERT" --client-key "$ORDERER_ADMIN_TLS_PRIVATE_KEY" >&log.txt
```

>   注意：上述配置文件修改后必须重启Docker才能生效。


另一方面，运行一些例子比如Token-ERC-20的时候，会出现network _test不存在这样的错误，此时需要修改`/docker/docker-composer-test-net.yaml`，将其中的两处如下内容做替换：

```
原本：
- CORE_VM_DOCKER_HOSTCONFIG_NETWORKMODE=${COMPOSE_PROJECT_NAME}_test

改为：
- CORE_VM_DOCKER_HOSTCONFIG_NETWORKMODE=docker_test
```

此后，如果之前已经启动了Docker，需要关闭后重启。
