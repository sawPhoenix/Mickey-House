# this 

  >thi指向会根据环境变量来改变，如果是在一个对象里面调取函数的this，这里的this指向该对象，如果是声明变量调用函数，则this指向声明变量所在的作用域。
  其原理是在内存中的位置不一样，对象和函数在内存中保存的位置不一样，浏览器引擎会将函数单独保存在内存中，然后再将函数的地址赋值给对象或者声明变量。由于函数是一个单独的值，所以它可以在不同的环境中执行。

首先，我们需要函数的理解调用的位置，在调用时this才会出现，

## 绑定规则
 1. 默认绑定，其他规则无法作用时的默认规则。即函数被调用的作用域。
    全局对象在严格模式下不能被默认绑定。

 2. 隐式绑定：当函数在obj中被调用，this则会隐式绑定到该obj的上下文对象中。

 3. 显式绑定：即bind(),call(), apply()，其变种有：硬绑定，  在调用的函数内部显式绑定，所以无论如何调用，this指向一定会发生改变。
 
 
 4. new绑定
   
    使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。 
     1. 创建（或者说构造）一个全新的对象。 
     2. 这个新对象会被执行 [[ 原型 ]] 连接。
     3. 这个新对象会绑定到函数调用的 this。
     4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。
    使用
  ## 优先级
  new是创建一个新的对象，优先级最高，显式绑定是强制改变this指向，优先级次之，隐式转换优先级较低。
  ### 优先级例外
  1. 把null和undefined作为this绑定的对象传入call，apply或bind，这些值在调用时会被忽略。（常见用法：用apply来“展开”一个数组，进行柯里化）这种情况一般不用，因为会导致function里面的this指向全局对象。解决方法是创造一个DMZ空对象，将值带入进去var ø = Object.create( null );
  2. 
    ```
    function foo() { console.log( this.a ); }
    var a = 2;
    var o = { a: 3, foo: foo };
    var p = { a: 4 };
    o.foo(); // 3 
    (p.foo = o.foo)(); // 2
    ```
    赋值表达式 p.foo = o.foo 的返回值是目标函数的引用，因此调用位置是 foo() 而不是 p.foo() 或者 o.foo()。根据我们之前说过的，这里会应用默认绑定。注意：对于默认绑定来说，决定 this 绑定对象的并不是调用位置是否处于严格模式，而是 函数体是否处于严格模式。如果函数体处于严格模式，this 会被绑定到 undefined，否则 this 会被绑定到全局对象。
  3. 软绑定
    用软绑定来加大绑定的灵活性，使得绑定函数视情况而选择硬绑定还是显示绑定，又或是隐性绑定

  ```
  if (!Function.prototype.softBind) {
    Function.prototype.softBind = function (obj) {
      var fn = this; // 捕获所有 curried 参数
      var curried = [].slice.call(arguments, 1);
      var bound = function () {
        return fn.apply((!this || this === (window || global)) 
        ? obj 
        : this.curried.concat.apply(curried, arguments));
      }; bound.prototype = Object.create(fn.prototype);
      return bound;
    };
  }
  ```

  使用方法：
  ```
  function foo() { console.log("name: " + this.name); }
  var obj = { name: "obj" }, obj2 = { name: "obj2" }, obj3 = { name: "obj3" };
  var fooOBJ = foo.softBind(obj); fooOBJ(); // name: obj 
  obj2.foo = foo.softBind(obj); obj2.foo(); // name: obj2 <---- 看！！！ 
  fooOBJ.call(obj3); // name: obj3 <---- 看！ 
  setTimeout(obj2.foo, 10); // name: obj <---- 应用了软绑定
  ```

  ## 箭头函数
  箭头函数不使用 this 的四种标准规则，而是根据外层（函数或者全局）作用域来决 定 this。
  箭头函数的绑定调用过一次后，会自动绑定到被调用的作用域中，且无法变更，如果第二次绑定到其他作用域上，this也会指向第一次绑定的函数上。


  
  ## 对象

  ### 访问类型
  1. obj.xxx ：属性访问
  2. obj['xxx']：键访问
    
  两者区别： 键访问可以接受任意 UTF-8/Unicode 字符串作为属性名。而且由于键访问使用字符串来访问属性，所以可以在程序中构造这个字符串
  
  例：
  ```
  var myObject = { a:2 };
  var idx;
  if (wantA) { idx = "a"; }
  // 之后 
  console.log( myObject[idx] ); // 2
  ```
- 这种方式可以用来做可计算属性名，可计算属性名可以用来做ES6的Symbol。（less中的classnames插件）
  
注意：
- 如果访问对象是一个函数中的属性，那这个访问对象所访问的是这个属性值本身的指针，并不是值本身，函数和其属性对象的关系是一种间接关系。所以，当我们在访问某个函数的属性或方法的时候，其实访问的是这个属性或方法的指针。
- 如果是数组，给数组添加属性（不是下标），则这个属性会添加成功，但是原数组的长度并不会改变，不过这属性名如果是个==数字的格式，则会被当成下标属性，数组长度会变化。


复制对象： 
  - 首先，深浅拷贝，浅拷贝只是拷贝引用，深拷贝是拷贝值。但这里有个问题就是，当我们深拷贝后的值其本身是深拷贝还是浅拷贝，如果每一层的数据都需要深拷贝，也就是说深拷贝的标椎是怎样的，我们要怎么处理呢？

  - 对于JSON来说，可以用JSON()来进行复制，这样一来复制的就是数据的值。不过这种方法要保证对象是JSON安全的，有局限性。


  - ES6定义了Object.assign(..)方法来实现浅复制，

属性描述：

 Object.getOwnPropertyDescriptor（）

例子：
```
var myObj = {}
Object.defineProperty( myObj, "a", {
   value: 2, 
   writable: true, // 可写性
   configurable: true, // 可配置性，即是否可以用defineProperty来修改，用delete来删除属性，而且把configurable修改成false是个不可撤销的单向操作。
   enumerable: true // 可枚举性 默认ture， false时不会出现在for..in循环中
});
myObj.a; // 2

```

不可变性：
  所用的方法创建的都是浅不变性，如果需要，可以考虑重新设计程序。
  - 对象常量： writable:false + configurable:false 
  - 禁止扩展：Object.preventExtensions( myObj );
  - 密封：Object.seal(..) 会创建一个“密封”的对象，这个方法实际上会在一个现有对象上调用 Object.preventExtensions(..) 并把所有现有属性标记为 configurable:false。
  - 冻结：Object.freeze(..) 会创建一个冻结对象，这个方法实际上会在一个现有对象上调用 Object.seal(..) 并把所有“数据访问”属性标记为 writable:false，这样就无法修改它们 的值。

存在性：
  Object.hasOwnProperty() or Object.prototype.hasOwnProperty.call(myObject,"a")//加强版，会将基础的hasOwnProperty()方法显式绑定到Object上。
  propertyIsEnumerable(..) 会检查给定的属性名是否直接存在于对象中（而不是在原型链 上）并且满足 enumerable:true
  Object.keys(..) 会返回一个数组，包含所有可枚举属性
  Object.getOwnPropertyNames(..) 会返回一个数组，包含所有属性，无论它们是否可枚举。


for..in 循环可以用来遍历对象的可枚举属性列表（包括 [[Prototype]] 链）

你可以使用 ES6 的 for..of 语法来遍历数据结构（数组、对象，等等）中的值，for..of 会寻找内置或者自定义的 @@iterator 对象并调用它的 next() 方法来遍历数据值

```
var myObject = { a: 2, b: 3 }; Object.defineProperty(myObject, Symbol.iterator, {
    enumerable: false, writable: false, configurable: true, value: function () {
      var o = this;
      var idx = 0;
      var ks = Object.keys(o);
      return {
        next: function () {
          return { value: o[ks[idx++]], done: (idx > ks.length) };
        }
      };
    }
  });
  // 手动遍历 myObject var it = myObject[Symbol.iterator](); it.next(); // { value:2, done:false } 
  it.next(); // { value:3, done:false } 
  it.next(); // { value:undefined, done:true }
  // 用 for..of 遍历 myObject
  for (var v of myObject) { console.log(v); }// 2 // 3
```

## 类
  类的三要素：实例化，继承，多态
  js实际上没有类， es6的类属于语法糖

- 继承： 子类可以继承父类的属性和方法，
- 多态： 子类继承的方法和子类自己的方法是两个不同方法，就算名字一样，引用效果也是不同的，这里需要注意的一点:继承的方法会被绑定到父类或者说创建函数的原型链上，所以如果要在当前类中执行需要使用.call(this)改变this指向
- 混入： 
  ```
  function mixin( sourceObj, targetObj ) {
    for (var key in sourceObj) { // 只会在不存在的情况下复制
      if (!(key in targetObj)) {
        targetObj[key] = sourceObj[key];
      } 
    }
    return targetObj; 
  }
  ```

 ## 原型
 [[Prototype]]：是js的内置属性，所有属性查找时都会查找原型连，直到找到属性或查找完整个原型链
 
 Object.prototype： 所有普通的 [[Prototype]] 链最终都会指向内置的 Object.prototype。由于所有的“普通” （内置，不是特定主机的扩展）对象都“源于”（或者说把 [[Prototype]] 链的顶端设置为） 这个 Object.prototype 对象，所以它包含 JavaScript 中许多通用的功能。

  ### 原型链
  如果在第一个对象上没有找到需要的属性或者方法引用，引擎就会继续在 [[Prototype]] 关联的对象上进行查找。同理，如果在后者中也没有找到需要的引用就会继续查找它的 [[Prototype]]，以此类推。这一系列对象的链接被称为“原型链”。
  ### 原型继承
  示例代码：
  ```
  function Foo(name) {
    this.name = name;
  } Foo.prototype.myName = function () {
    return this.name;
  };
  function Bar(name, label) {
    Foo.call(this, name);
    this.label = label;
  }
  
  // 我们创建了一个新的 Bar.prototype 对象并关联到 Foo.prototype 
  Bar.prototype = Object.create(Foo.prototype); 
  // 注意！现在没有 Bar.prototype.constructor 了
  // 如果你需要这个属性的话可能需要手动修复一下它
  Bar.prototype.myLabel = function () {
    return this.label;
  };
  var a = new Bar("a", "obj a");
  a.myName(); // "a" 
  a.myLabel(); // "obj a"
  ```
  这段代码的核心部分就是语句 Bar.prototype = Object.create( Foo.prototype )。调用 Object.create(..) 会凭空创建一个“新”对象并把新对象内部的 [[Prototype]] 关联到你指定的对象（本例中是 Foo.prototype）。

  常见错误做法
  1. Bar.prototype = Foo.prototype; // 和你想要的机制不一样！
      
      这个做法只是让 Bar.prototype 直接引用 Foo.prototype 对象。因此当你执行类似 Bar.prototype. myLabel = ... 的赋值语句时会直接修改 Foo.prototype 对象本身。这样的话Bar就没有存在的必要了。

  2. Bar.prototype = new Foo();

      Bar.prototype = new Foo() 的确会创建一个关联到 Bar.prototype 的新对象
      副作用： 使用 了 Foo(..) 的“构造函数调用”，如果Foo修改状态，注册到其他对象等操作，会影响到Bar以及它的后代

  检查“类”关系：

  ```
  a instanceof Foo //只能处理对象和函数之间的关系
  Foo.prototype.isPrototypeOf( a ); // 即 a.isPrototypeOf(b),可以直接获取原型链：Object.getPrototypeOf( a );
  ```

  大部分浏览器也可以用：a.__proto__ === Foo.prototype;来访问内部 [[Prototype]] 属性。和.constructor 一样，.__proto__ 实际上并不存在于你正在使用的对象中。实际上，它和其他的常用函数（.toString()、.isPrototypeOf(..)，等等）一样，存在于内置的 Object.prototype 中。
  
  此外，.__proto__ 看起来很像一个属性，但是实际上它更像一个 getter/setter

  大致实现：
  ```
  Object.defineProperty(Object.prototype, "__proto__", {
    get: function () {
      return Object.getPrototypeOf(this);
    }, set: function (o) { // ES6 中的 setPrototypeOf(..) 
      Object.setPrototypeOf(this, o);
      return o;
    }
  });
  ```
  因此，访问（获取值）a.__proto__ 时，实际上是调用了 a.__proto__()（调用 getter 函数）。虽然 getter 函数存在于 Object.prototype 对象中，但是它的 this 指向对象 a，所以和 Object.getPrototypeOf( a ) 结果相同。
 ## 构造函数
  ```
   var a = new Foo();
  ```
  当函数被new调用时，它就会构造一个对象并赋值 给 a，构造函数中也会有constructor 等类相关的属性

  通过构造函数创建的对象中的.constructor实际上是被委托给了Foo，虽然a.constructor === Foo成立，但这并不是真的完全相等。Foo.prototype 的 .constructor 属性只是 Foo 函数在声明时的默认属性。如果你创建了一个新对象并替换了函数默认的 .prototype 对象引用，那么新对象并不会自动获 得 .constructor 属性。

  示例代码：
  ```
  function Foo() { /* .. */ } 
  Foo.prototype = { /* .. */ }; // 创建一个新原型对象
  var a1 = new Foo();
  a1.constructor === Foo; // false! 
  a1.constructor === Object; // true!

  ```
  到底怎么回事？ a1 并没有 .constructor 属性，所以它会委托 [[Prototype]] 链上的 Foo.prototype。但是这个对象也没有 .constructor 属性（不过默认的 Foo.prototype 对象有这 个属性！），所以它会继续委托，这次会委托给委托链顶端的 Object.prototype。这个对象 有 .constructor 属性，指向内置的 Object(..) 函数。


  ## 对象关联
  ### Object.create(..)

  示例： 
  ```
   var foo = {
    something: function () {
      console.log('Tell me something good...');
    },
  };
  var bar = Object.create(foo);
  bar.something(); // Tell me something good...
  ```
  >Object.create(..) 会创建一个新对象（bar）并把它关联到我们指定的对象（foo），这样 我们就可以充分发挥 [[Prototype]] 机制的威力（委托）并且避免不必要的麻烦（比如使 用 new 的构造函数调用会生成 .prototype 和 .constructor 引用）


tips ： 
  > Object.create(null) 会 创 建 一 个 拥 有 空（ 或 者 说 null）[[Prototype]] 链接的对象，这个对象无法进行委托。由于这个对象没有原型链，所以 instanceof 操作符（之前解释过）无法进行判断，因此总是会返回 false。 这些特殊的空 [[Prototype]] 对象通常被称作“字典”，它们完全不会受到原 型链的干扰，因此非常适合用来存储数据


# 原型链