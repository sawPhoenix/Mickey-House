## 宏任务/微任务
|                                  | 宏任务                             | 微任务                                   |
| -------------------------------- | ---------------------------------- | ---------------------------------------- |
| 定义                             | 运行在宿主上的任务                 | 运行在js上的任务                         |
| 具体事件                         | 1. script (可以理解为外层同步代码) | Promise                                  |
|                                  | 2. setTimeout/setInterval          | MutaionObserver                          |
|                                  | 3. UI rendering/UI事件             | Object.observe（已废弃；Proxy 对象替代） |
|                                  | 4. postMessage，MessageChannel     | process.nextTick（Node.js                |
|                                  | 5. setImmediate，I/O（Node.js）    | /                                        |
| 运行先后                         | 先                                 | 后                                       |
| 会触发新一轮Tick吗（event loop） | 会                                 | 不会                                     |


拓展： 
1. async是通过Promise包装异步任务
2. 一般情况下setImmediate比 setTimeout先执行， 因为在node中setTimeout会被强制改为1毫秒后执行。修改后就是同时执行
3. process.nextTick 比 Promise队列优先级高，所以先执行。
4. vue中的vm.$nextTick会优先使用Promise，如果不支持或强行开启红任务则会根据以下顺序依次检测： setImmediate -> MessageChannel -> setTimeout


## 堆/栈
|          | 堆（heap）                                           | 栈（stack）    |
| -------- | ---------------------------------------------------- | -------------- |
| 存储内容 | 值                                                   | 指针           |
| 存储方式 | 顺序随意（树），申请某个大小的内存空间，动态分配内存 | 后进先出（表） |
| 缓存方式 | 二级缓存                                             | 一级缓存       |


## JSX/template
|      | JSX        | template                       |
| ---- | ---------- | ------------------------------ |
| 本质 | js语法扩展 | html扩展                       |
| 特点 | 灵活       | 内置指令，简化开发，组件作用域 |

jsx：
>react将jsx代码片段分为几块：类型（元素名），属性值props（包含children和属性参数等），key和ref，owner和store。

>在转义中，没有被{}包裹住的默认是字符串，会进行转移，被包住的则会被当作表达式，不会被转义。所以，被转义的代码会称为字符串，会有效防止xss攻击。

若想在表达式内转义成html，可以使用Unicode编码，dangerouslySetInnerHTML，在{}内通过数组将字符串和表达式包裹在一起。

jsx原理：
1. 基于babel-preset-react-app这个语法解析包，把jsx语法转换成一个名为 React.createElement() 的方法调用
2. 基于createElement把传递的参数处理为jsx对象。
3. 基于render把jsx对象按照动态创建dom元素的方式插入到指定的容器中即可。



## webpack chunk,module,budle.


|      | module     | chunk      | budle      |
| ---- | ---------- | ---------- | ---------- |
| 含义 | 编译前文件 | 编译中文件 | 编译后文件 |

解释：
1. 对于一份同逻辑的代码，当我们手写下一个一个的文件，它们无论是 ESM 还是 commonJS 或是 AMD，他们都是 module ；
2. 当我们写的 module 源文件传到 webpack 进行打包时，webpack 会根据文件引用关系生成 chunk 文件，webpack 会对这个 chunk 文件进行一些操作；
2. webpack 处理好 chunk 文件后，最后会输出 bundle 文件，这个 bundle 文件包含了经过加载和编译的最终源文件，所以它可以直接在浏览器中运行。


|      | filename      | chunkFilename                   |
| ---- | ------------- | ------------------------------- |
| 含义 | entry里的文件 | 不在entry中却要被打包出来的文件 |


## 跨域传递cookie

服务器： 指定Access-Control-Allow-Credentials: true；
js： var xhr = new XMLHttpRequest();   xhr.withCredentials = true;


## Set和Map

|      | Set                                | Map                                |
| ---- | ---------------------------------- | ---------------------------------- |
| 含义 | 类似数组，成员唯一，是一个构造函数 | js对象，本质是键值对的集合（hash） |
| 特点 | 值唯一                             | key唯一，转成数组是一个二维数组    |

## memorize(备忘模式)
每次调用函数都会执行一遍函数里面的代码，如果传进来的值一样，再计算一边，在函数复杂的情况下会非常消耗性能，这时我们便会使用高阶函数来解决这个问题，将传入的参数进行缓存，然后对比，如果相同直接输出值即可。

```
const memorize = function(fn) {
  const cache = {};
  return function (...args) {
    const _args = JSON.stringify(args)
    return cache[_args] || (cache[_args] = fn.apply(fn, args))
  }
}

const add = function(a) {
  return a + 1
}

const adder = memorize(add)
console.log(adder(1));
console.log(adder(1));
console.log(adder(2));
```
这里的add()只会被调用两次，由于有一个值是一样的，所以在高阶函数中返回了cache[_args]。并没有调用add()


## 构造函数
使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。 
1. 创建（或者说构造）一个全新的对象。 
2. 这个新对象会被执行 [[ 原型 ]] 连接。
3. 这个新对象会绑定到函数调用的 this。
4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。


## 多个异步顺序执行
回调函数：
```
  let b = async (a) => {
    let ret = setTimeout(function () {
      console.log(1)
      a("b")
    }, 500);
    return ret
  }
  let c = (a) => {
    let ret = setTimeout(function () {
      console.log(2)
      a("c")
    }, 300);
    return ret
  }
  let d = (a) => {
    let ret = setTimeout(function () {
      console.log(3)
      a("d")
    }, 100);
    return ret
  }
  let a = (value) => {
  
    switch (value) {
      case await "a":
        b(a)
       break 
      case await "b":
        c(a)
       break 
      case await "c":
        d(a)
       break 
       default : 
    }    
  }
  a("a")
```

Promise： 
```

```