指令：
基本和linux一样，docker container ***
用$() 全选 例： docker container stop$(docker container ps -a)
rm id -f  强制删除

- pull from registry 拉取镜像
- Dockerfile 创建文件，online环境
- docker image ls  --查看镜像
- docker image save 镜像名称：版本号   -- 导出镜像
- docker image load -i  .\            --导入镜像
自有文件导入 offline
- docker system prune -f 批量清除容器
- docker image prune -a  批量清除镜像

#  Dockerfile
    用于构建docker镜像的一个文件
## 创建步骤
 - 第一步，安装一个Ubuntu系统。

 - 第二步，下载安装Python环境
```
apt-get update && \
DEBIAN_FRONTEND=noninteractive apt-get install --no-install-recommends -y python3.9 python3-pip python3.9-dev
```

第三步，准备jspang.py文件。这个可以在D盘新建一个DockerTest文件夹，然后在文件夹中新建一个jspang.py文件，然后编写下面的文件。
```
print("Hello JSPang")
```
第四步，运行jspang.py
```
$ python3 hello.py
hello docker
```

这是我们拆解的步骤，有步骤之后，我们看看如何写一个Dockerfile文件（建议把Dockerfile文件和jspang.py文件放在一起个文件夹下）

```
FROM ubuntu:latest
RUN  apt-get update && \
         DEBIAN_FRONTEND=noninteractive apt-get install --no-install-recommends -y python3.9 python3-pip python3.9-dev
ADD jspang.py /
CMD ["python3","jspang.py"]
```

## 构建镜像文件
  docker image build -t test(文件名):1.0(版本号) .（路径）

  docker image tag test sawdockerid/test

  docker login 

  docker image push sawdeockerid/test    


比如在windos11下进入PowerShell，运行一个Node的容器，然后把/app目录作为，把本机的当前目录作为绑定目录，意思是容器中的app目录和本机的当前目录绑定到了一起
  docker container run -it -v ${pwd}:/app node