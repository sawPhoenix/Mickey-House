# ES6

   ES6 需要注意的问题以及坑

## Class

   class相关内容

### class 解决了什么问题

1. （基本上，下面会详细介绍）不再引用杂乱的 .prototype 了。
2. 子类 声 明 时 直 接“ 继 承 ” 了 父类， 不 再 需 要 通 过 Object.create(..) 来 替 换 .prototype 对象，也不需要设置 .__proto__ 或者 Object.setPrototypeOf(..)。
3. 可以通过 super(..) 来实现相对多态，这样任何方法都可以引用原型链上层的同名方 法。这可以解决问题：构造函数不属于类，所以无法互相引用—— super() 可以完美解决构造函数的问题。~~~~
4. class 字面语法不能声明属性（只能声明方法）。看起来这是一种限制，但是它会排除 掉许多不好的情况，如果没有这种限制的话，原型链末端的“实例”可能会意外地获取 其他地方的属性（这些属性隐式被所有“实例”所“共享”）。所以，class 语法实际上 可以帮助你避免犯错。 
5. 可以通过 extends 很自然地扩展对象（子）类型，甚至是内置的对象（子）类型，比如 Array 或 RegExp。没有 class ..extends 语法时，想实现这一点是非常困难的，基本上 只有框架的作者才能搞清楚这一点。但是现在可以轻而易举地做到！

### class 有什么缺陷

1. class 基本上只是现有 [[Prototype]]（委托！）机制的一种语法糖。 并不会像传统面向类的语言一样在声明时静态复制所有行为
2. class 语法无法定义类成员属性（只能定义方法），如果为了跟踪实例之间共享状态必须要 这么做，那你只能使用丑陋的 .prototype 语法
3. super 并不是动态绑定的，它会在 声明时“静态”绑定。如果你和大多数 JavaScript 开发者一样，会用许多不同的方 法把函数应用在不同的（使用 class 定义的）对象上，那你可能不知道，每次执行这些操 作时都必须重新绑定 super。
4. 类的内部定义的方法，都是不可枚举的

## Map

   Map 是一种ES6新增的数据格式，map格式主要是一种类数组（二维数组），而且key值唯一

### WeakMap  vs Map

   WeakMap: key的引用是一个弱引用，清空的时候会影响到页面
