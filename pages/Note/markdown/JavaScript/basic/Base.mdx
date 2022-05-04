# 类型
- JavaScript 有七种内置类 型：null 、undefined 、boolean 、number 、string 、object 和 symbol ，可以使用 typeof 运算符来查看。 
- 变量没有类型，但它们持有的值有类型。类型定义了值的行为特征。 
- 很多开发人员将 undefined 和 undeclared 混为一谈，但在 JavaScript 中它们是两码事。undefined 是值的一种。undeclared 则表 示变量还没有被声明过。 遗憾的是，JavaScript 却将它们混为一谈，在我们试图访问 "undeclared" 变量时这样报错：ReferenceError:ais not defined， 并且 typeof 对 undefined 和 undeclared 变量都返回 "undefined" 。 然而，通过 typeof 的安全防范机制（阻止报错）来检查 undeclared 变量，有时是个不错的办法。

# 值
## 数组

  ### 类数组转换成数组
  - es5
  function foo() { var arr = Array.prototype.slice.call( arguments ); arr.push( "bam" ); console.log( arr ); }
  - es6  
    var arr = Array.from( arguments );

## 字符串
- 字符串和数组的确很相似，它们都是类数组，都有 length 属性以及 indexOf(..) （从 ES5 开始数组支持此方法）和 concat(..) 方法
- JavaScript 中字符串是不可变的，而数组是可变的。并且 a[1] 在 JavaScript 中并非总是合法语法，在老版本的 IE中就不被允许 （现在可以了）。正确正 的方法应该是 a.charAt(1) 。 字符串不可变是指字符串的成员函数不会改变其原始值，而是创建并返回一个新的字符串。而数组的成员函数都是在其原始值 上进行操作。
- ~~字符串可以通过 Array.prototype来使用数组上面的函数，如map，join等,反过来也可以~~
  ```
  var a = "foo"; var b = ["f","o","o"];
  a.join; // undefined
  a.map; // undefined
  var c = Array.prototype.join.call(a, '-');
  var d = Array.prototype.map
    .call(a, function (v) {
      return v.toUpperCase() + '.';
    })
    .join('');
  c; // "f-o-o"
  d; // "F.O.O."
  ```
- **另一个不同点在于字符串反转（JavaScript 面试常见问题）。数组有一个字符串没有的可变更成员函数 reverse()**

## 数字
 - 二进制浮点数中的 0.1 和 0.2 并不是十分精确，它们相加的结果并非刚好等于 0.3 ，而是一个比较接近的数字 0.30000000000000004 ，所以条件判断结果为 false 。
 - 能够被“安全”呈现的最大整数是 2^53 - 1 ，即 9007199254740991 ，在 ES6 中被定义为 Number.MAX_SAFE_INTEGER 。最小整数是 -9007199254740991 ，在 ES6 中被定义为 Number.MIN_SAFE_INTEGER 。
 - Number.isInteger（）  //检测是否是整数
 - Number.isSafeInteger()  //检测是否是安全整数

## 特殊字符
 - null 是一个特殊关键字，不是标识符，我们不能将其当作变量来使用和赋值。然而 undefined 却是一个标识符，可以被当 作变量来使用和赋值。
 - NaN 意指“不是一个数字”（nota number），这个名字容易引起误会，后面将会提到。将它理解为“无效数值”“失败数值”或者“坏 数值”可能更准确，用isNaN(..)来判断，因为NaN ！== NaN
 -  Infinity   JavaScript 使用有限数字表示法（finite numericrepresentation，即之前介绍过的 IEEE 754 浮点数），所以和纯粹的数学运算不 同，JavaScript 的运算结果有可能溢出，此时结果为 Infinity 或者 -Infinity 。
 -  -0 JSON.stringify(-0) 返回 "0" ，而 JSON.parse("-0") 返回 -0 。
 -  Object.is(..) 来判断两个值是否绝对相等 

### 相等性
   - falsy值（表示false的值）：false， +/-0, 0, '',"",``,null, undefind, NaN, 8n
  - 同值相等（same-value）：底层实现： Object.is() ，
    在这种情况下，+/-0, 0,三个值不相等，且NaN===NaN
  - 零值相等（same-value-zero）

 ```

  '0' == false; // true -- 晕！
  false == 0; // true -- 晕！
  false == ''; // true -- 晕！
  false == []; // true -- 晕！
  '' == 0; // true -- 晕！
  '' == []; // true -- 晕！
  '' == 0; // true -- 晕！
  '' == []; // true -- 晕！
  0 == []; // true -- 晕！
 ```
- 根据规范 a <= b 被处理为 b < a ，然后将结果反转。因为 b < a 的结果是 false ，所以 a <= b 的结果是 true


## 值和引用
- JavaScript 引用指向的是值。如果一个值有 10 个引用，这些引用指向的都是同一个值，它们相互之间没有引用 / 指向关系。
- JavaScript 对值和引用的赋值 / 传递在语法上没有区别，完全根据值的类型来决定 

# 原生函数
 
 ##  [[Class]]
  - Object.prototype.toString(..)


# 类型转换
  - ‘~’ !~a.indexOf( "ol" ) 等于 a.indexOf("ol") === -1
  - '~~' 我们要多加注意。首先它只适用于 32 位数字，更重要的是它对负数的处理与 Math.floor(..) 不同。



# 原型

- Function._proto_ === Function.prototype
- Object._prpto_ === Funciton.prototype 


# EventLoop

# 异步
## 异步和并行
  这是两个不同的概念，一个是有时间概念的，一个是多线程

# 生成器和迭代器
## 生成器
作用：生成一个迭代器
当你执行一个生成器，就得到了一个迭代器
生成器不是一个iterable，所以生成一个函数需要加上括号才是iterable，其本身不是iterable

## 迭代器

  - for of ： 只能遍历有迭代器的元素，获得的值是键值,只遍历可迭代的值（iterable）

  - for in ： 遍历

 ## iterable:
 值中有 [Symbol.iterator]