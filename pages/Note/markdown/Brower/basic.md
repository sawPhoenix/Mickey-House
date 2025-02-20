# DOM

## API:

### Node API

### Range API

> 创建一个 range

```JavaScript
var range = new Range()
    range.setStart(element, 9)
    range.setEnd(element, 4)
    var gange = document.getSelection().getRangeAt(0)

```

> Range API

- range.setStartBefore //设置一个元素的起始前

- range.setEndBefore

- range.setStartAfter

- range.setEndAfter
- range.selectNode // 选中一个元素

- range.selectNodeContents // 选择一个元素的所有内容

操作

```JavaScript
var fragement = range.extractContents() // 取出range选中范围

range.isnertNode(document.createTextNode("aaa"))

```

### 从输入 URL 到页面显示的过程

1. URL 解析

- 浏览器解析 URL 的各个部分(协议、域名、路径等)
- 检查 URL 是否合法

2. DNS 解析

- 检查浏览器 DNS 缓存
- 检查操作系统 DNS 缓存
- 检查路由器 DNS 缓存
- 向本地 DNS 服务器发起递归查询
- 获得目标服务器 IP 地址

3. TCP 连接

- 进行三次握手建立 TCP 连接
- 如果是 HTTPS 还要进行 TLS 握手

4. 发送 HTTP 请求

- 构建 HTTP 请求报文
- 添加请求头和请求体
- 发送请求到服务器

5. 服务器处理请求并返回响应

- 服务器接收请求
- 处理请求
- 返回响应报文

6. 浏览器解析渲染页面

- 解析 HTML 构建 DOM 树
- 解析 CSS 构建 CSSOM 树
- 将 DOM 和 CSSOM 合并成渲染树
- 布局计算(Layout/Reflow)
- 绘制(Paint)
- 合成(Composite)

7. JavaScript 执行

- 解析执行 JavaScript 代码
- 可能会修改 DOM 和 CSSOM
- 触发重新渲染

8. 页面显示完成

- 显示页面内容
- 继续加载其他资源(图片等)

## CSSOM

    docment.styleSheets

    styleSheets 是一个样式表，数组

    window.getComputedStyle(elt: 想要获取的元素,pseudoElt: 可选,伪元素)

> 如何修改 Rule：

```JavaScript
document.styleSheets[0].cssRules
document.styleSheets[0].insertRule("p {color:pink;}",0)
document.styleSheets[0].removeRule(0)

 // demo
 document.styleSheets[0].cssRules[0].style.color = '#fff'

```

> window.getComputedStyle demo

```JavaScript
// 获取a标签的伪元素
getComputedStyle(document.querySelector('a'),"::before")

```

### CSS Rule

> CSS StyleRule: 普通的选择器 rule

- CSSStyleRule.selectorText String
- CSSStyleRule.style: OBject readonly

> CSS at-Rule：@开头的 rule

### CSSOM View

- window.innerHeight window.innerWidth
- window.outerHeight window.outerWidth
- window.devicePixelRatio
- window.screen:
  window.screen.width
  window.screen.height
  window.screen.availHeight // 和设备相关
  window.screen.availWidth

### Window API

- window.open('about:blank','\_blank',"width=100,height=100,left=100,right=100")
- moveTo(x,y) // 改变 window 位置
- moveBy(x,y)
- resizeTo(x,y) // 改变 window 尺寸
- resizeBy(x,y)

### scroll API

略

### layout

getClientRects() // 取多个盒
getBoundingClientRect() // 取一个盒

- 伪元素也会被取中

```JavaScript
 let ele =document.getElementById('#test')
 ele.getClientRects() // 获取盒内的元素盒列表
 ele.getBoundingClientRect() // 获取元素本身的位置
```
