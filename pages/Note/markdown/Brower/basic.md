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
