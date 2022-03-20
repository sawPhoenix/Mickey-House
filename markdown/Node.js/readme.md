@[TOC]
# 模块

## CommonJS规范
  commonjs规范的愿景是一个让JavaScript能在任何地方运行
  ### 出现的原因
  JavaScript虽然已经有了ECMAScript规范，不过缺乏在后端的规范。主要缺陷有： 
   1. 没有模块系统。
   2. 标准库比较少。
   3. 没有标准的接口。
   4. 缺乏包管理系统。
  ### 弥补的缺陷
  可以使JavaScript拥有和其他后端语言一样的开发大型应用的基础能力。这样不仅可以利用js编写客户端应用还能编写以下应用。
  1. 服务器JS程序。
  2. 命令行工具。
  3. 桌面图形界面应用程序。
  4. 混合应用（Tiamium和AdobeAIR等形式的应用）。
   
   **Commonjs包涵ECMAScript，但是不包含BOM和DOM**
  ### 具体使用方法

  #### 模块应用
   和import方法类似

  ```
    <!--在暴露的文件下用export -->
    exports.add = function () { }
    <!-- 在引入的文件下使用require -->
     var math = require('math');
  ```
    注意: 传递给require()方法的参数必须是小驼峰命名的字符串，或者是.,..开头的相对路径，或绝对路径，可以没有后缀名js。
  
## Node模块
  Node在实现中并非完全按照规范实现，而是对模块规范进行了一定的取舍，同时也增加的许多自身需要的特性。

  在Node中引入模块，需要经历以下步骤：
  1. 路径分析
  2. 文件定位
  3. 编译执行

  > 在node中，模块分为两类，一类是Node提供的核心模块，另一类是用户编写的文件模块。

  **核心模块部分在Node源代码编译过程中，编译进了二进制执行文件。在Node启动时，部分核心模块被直接加载进内存中，无需定位和编译，所以执行速度快**

  ### 优先从缓存加载
    不论核心模块还是文件模块，require()方法对相同模块的二次加载都一律采用优先缓存的方式，这是第一优先级的。

  ### 路径分析和文件定位

  1. 核心模块
    
    优先度仅次于缓存加载，加载过程最快，自定义模块不能与其命名冲突。

  2. 路径模块（包括相对路径和绝对路径）
    
    在分析路径模块时，require()方法会将路径转换为真实路径，并以真实路径作为索引，将编译后的结果加载到缓存中，以使二次加载时更快。
  3. 自定义模块

    生成方式与js的原型链或作用域链的查找方式类似，从创建的目录向上递归，直到根目录。当前文件的路径越深，查找耗时会越多，所以速度最慢。

  文件定位优化：
   1. 如果是.node和.json文件，在传递require()的标识符中带上扩展名，会加快一点速度。
   2. 同步配合缓存，可以大幅缓解Node单线程中阻塞式调用的缺陷。

  目录分析和包：
    查找顺序是先查找package.json文件，如果没有，则会依次查找index.js、index.json、index.node。如果都没有，则报错。
## 包和MPN
  包和NPM是将模块连接起来的一种机制
  ### 包
  包实际上是一个存档文件，即一个目录直接打包为.zip或tar.gz格式的文件，安装后解压还原为目录。
  完全符合CommonJS规范的包应该包含：
   1. package.json：包描述文件
   2. bin
   3. lib
   4. doc
   5. test

  CommonJS为package.json文件定义了如下一些必须的字段：
  ....待填充

  ### NPM
  CommonJS包规范是理论,NPM是其中的一种实践。（yarn也是一种）
  NPM常用命令：
  
  1. npm -v ： 查看版本
  2. npm help : 查看命令说明
  3. npm install *** : 安装
  4. npm install *** -g: 全局安装
  5. npm run *** : 运行程序
  6. npm publish .: 在package.json所在的目录下开始上传包
  7. npm owner： add添加管理者，rm删除管理者 Ls查看管理者
  8. npm ls 路径： 分析包
    

 ## 前后端公用模块
  ###　AMD规范 
  
  AMD规范是CommonJS模块规范的一个延伸，下面一块代码定义了一个简单的模块： 

    ```
    <!-- 定义 -->
    define(id?, dependencies?, factory);
    <!-- 代码 -->

    define(function() { 
      var exports = {}; 
      exports.sayHello = function() { 
      alert('Hello from module: ' + module.id); 
      }; 
      return exports; 
      });
    ```
    优点：按需引入，避免过去那种通过全局变量或者命名空间的方式，一面变量污染和不小心被修改。

  ### CMD规范
  由玉伯提出，区别是:

    ```
    <!-- 定义 -->
    define(factory);
    <!-- 代码 -->
    define(function(require, exports, module) { 
    // The module code goes here 
    });
    ```

  ### amd和cmd混合使用
  ```
  ;(function (name, definition) { 
  // 检测上下文环境是否为AMD或CMD
  var hasDefine = typeof define === 'function', 
  // 检查上下文环境是否为Node
  hasExports = typeof module !== 'undefined' && module.exports; 
  if (hasDefine) { 
  // AMD环境或CMD环境
  define(definition); 
  } else if (hasExports) { 
  // 定义为普通Node模块
  module.exports = definition(); 
  } else { 
  // 将模块的执行结果挂在window变量中，在浏览器中this指向window对象
  this[name] = definition(); 
  } 
  })('hello', function () { 
  var hello = function () {}; 
  return hello; 
  });
  ```
# 异步
  Node带来的最大特特性就是其基于事件驱动的非阻塞I/O模型
  ## 异步的优点难点
   优点

  1.  Node带来的最大特特性就是其基于事件驱动的非阻塞I/O模型，非阻塞I/O可以使CPU与I/O并不相互依赖等待，让资源得到更好的应用。
   
   难点
    
  1. try/catch/final语法在异步中不适用。异步I/O提交请求和处理结果两个阶段中间有事件循环的调度，两者彼此不关联。
  2. 函数嵌套过深，node中多个异步调用如果采用默认的异步方法会出现层数太多的情况。影响码容码貌。
  3. 阻塞代码：node上没有sleep()这样的现成沉睡功能，延时操作只能有setinterval和settimeout两个函数，如果自己写一个sleep功能，由于node单线程的原因，CPU资源会全部为这段代码服务，其余请求无法得到回应。
  4. 多线程编程： 在JavaScript中，浏览器提出了Web Workers，通过将js执行与UI渲染分离，可以很好的利用多核CPU为大量计算服务。可惜运用不广泛，另外，Web Workers能解决利用CPU和减少阻塞UI渲染，但是不能解决UI渲染的效率问题。Node借鉴了这个模式，child_process是其基础API，cluster模块是更深层次的应用。
  5. 异步转同步：Node缺少同步API，如果要同步编程，需要借助库或者编译等手段来实现。

  ## 异步编程的解决方案
  分三种：
  1. 事件发布/订阅者模式
   
      Node自身提供的events模块（http://nodejs.org/docs/latest/api/events.html ）,没有事件冒泡，有addListener/on() 、 once() 、 removeListener() 、removeAllListeners()和emit(),代码如下： 
      ```
      // 订阅
      emitter.on("event1", function (message) { 
      console.log(message); 
      }); 
      // 发布
      emitter.emit('event1', "I am message!");
      ```
      订阅事件就是一个高阶函数的应用，事件发布/订阅者模式可以实现一个时间与多个毁掉函数的关联，这些回调函数又称为事件侦听器。
      
      其本身没有同步异步调用的问题，但在node中emit()调用多半是伴随循环事件而异步触发的，所以说这个模式广泛应用于异步编程。
      
      事件监听其实也是一种钩子（hook）机制，利用钩子导出内部数据或状态给外部的调用者。

      1. 继承events模块
      ```
      var events = require('events'); 
      function Stream() {   
        events.EventEmitter.call(this);
         } 
      util.inherits(Stream, events.EventEmitter); //node在util模块中封装了继承的方法。
      ```
      2. 利用事件队列解决雪崩问题
      ```
      var proxy = new events.EventEmitter(); 
      var status = "ready"; //状态锁
      var select = function (callback) { 
        proxy.once("selected", callback); 
        if (status === "ready") { 
          status = "pending"; 
          db.select("SQL", function (results) { 
            proxy.emit("selected", results); 
            status = "ready"; 
          }); 
        } 
      };
      //这里我们使用了once()方法，将所有请求的回调都压入事件队列中，利用其执行一次就会将监视器移除的特点，保证每一个回调只会被执行一次。对于相同的sql语句，保证在同一个查询开始到结束的过程中永远只有一次。
      ```
      3. 多异步之间的协作方案（解决多层嵌套）
      ```
      //业务代码
      var count = 0;
      var results = {};
      var done = function (key, value) {
        results[key] = value;
        count++;
        if (count === 3) {
          // 渲染页面   
          render(results);
        }
      };
      fs.readFile(template_path, "utf8", function (err, template) {
        done("template", template);
      });
      db.query(sql, function (err, data) {
        done("data", data);
      });
      l10n.get(function (err, resources) {
        done("resources", resources);
      });

      <!-- 这样的代码，要处理多个异步的话嵌套就会非常深 -->
      <!-- 我们可以用以下代码优化 -->
      var done = after(times, render); 

      emitter.on("done", done); 
      emitter.on("done", other); 
      
      fs.readFile(template_path, "utf8", function (err, template) { 
        emitter.emit("done", "template", template); 
      }); 
      db.query(sql, function (err, data) { 
        emitter.emit("done", "data", data); 
      }); 
      l10n.get(function (err, resources) { 
        emitter.emit("done", "resources", resources); 
      });
      <!-- 以上方法需要准备一个done（函数），下面是一个补充的版本 -->
      var proxy = new EventProxy(); 
      proxy.all("template", "data", "resources", function (template, data, resources) { 
        // TODO
      }); 
      fs.readFile(template_path, "utf8", function (err, template) { 
        proxy.emit("template", template); 
      }); 
      db.query(sql, function (err, data) { 
        proxy.emit("data", data); 
      }); 
      l10n.get(function (err, resources) { 
        proxy.emit("resources", resources); 
      });
      ```
          
  2. Promise/Deferred模式
      
      promise在这里就不赘述了，主要是讲一下Deferred，以及两者的差别

      Deferred主要运用于内部，用于维护异步模型的状态，Promise则是暴露外部。Deferred主要是控制Promise的返回参数值

      多异步操作使用all()方法，

  3. 流程控制库
     1. Connect
     2. async（比较主流，比较火）
     3. Step
     4. wind（https://github.com/JeffreyZhao/wind）。

## 异步并发控制
  异步I/O并发容易实现，但是由于太容易，所以需要对底层系统进行一定的过载保护，防止过犹不及。
  ### bagpipe解决方案
  通关一个队列来控制并发量，如果当前活跃（指调用发起但未执行回调）的异步调用量小于限定值，从队列中取出执行。如果活跃调用达到限定值，调用暂时存放在队列中执行。每个异步调用结束时，从队列中取出新的异步调用执行。

  ### async解决方案
  parallelLimit()，也是限制并发数，不过有个缺点，无法动态地增加并行任务，因此，async提供了queue（）方法来满足该需求。不过其接收的参数是固定的。




# 内存控制

  ## node与v8
    node的JavaScript引擎是Chrome的V8
    node只能使用部分内存（64位系统下约为1.4GB，32位系统下约为0.7GB）。原因也是v8
    在v8中，所有JavaScript对象都是通过堆来进行分配的。
    可通过memoryUsage()查看
    限制堆大小的原因：
      表层：浏览器不需要太大的内存
      深层：v8中的垃圾回收机制的限制。一次非增量式的垃圾回收需要1s以上。
    如何打开限制：
      在node启动时传递--max-old-space-size（）或--max-new-space-size
      事例：
      node --max-old-space-size=1700 test.js //单位是MB
      node --max-new-space-size=1024 test.js //单位是KB

    这两段命令会在V8初始时生效，且无法动态改变。


  ##  垃圾回收机制

  ### 分代
    V8的垃圾回收策略主要基于分代式垃圾回收机制。
    主要分为新生代和老生代两代：
    新生代汇总的对象为存活时间较短的对象，老生代中的对象为存活时间较长或常驻内存的对象。

  ### Scavenge算法
    新生代中的对象主要通过Scavenge算法进行垃圾回收。在Scavenge的具体实现中，主要采用Cheney算法。
    Cheney是一种采用复制的方式实现的垃圾回收算法。将内存一分为二，每一部分空间成为Semispace，在这两个Semispace空间汇总，只有一个处于使用中，另一个闲置。使用中为From空间，闲置为To空间。分配对象时，对象先在From中进行分配。开始进行垃圾回收时，，会检查From空间中的存货对象，这些存活对象将会被复制到To空间中，而非存活对象占用的空间将会被释放。完成复制后，From空间和To空间的角色发生互换。
    Scavenge的缺点：只能使用堆内存的一半，这是由划分空间和复制机制所决定的。所以无法用于长时间的使用，这样会长时间占用不必要的内存。

  **实际使用的堆内存是新生代中的两个semispace空间大小和老生代所用内存大小之和**

    当一个对象经过多次复制依然存在，它就会被认为是生命周期较长的对象。这种对象随后会被移动到老生代中。这种行为称为晋升。

  晋升的条件：
  1. 是否经历过scavenge回收
  2. To空间的内存占比超过限制（25%）

  ### Mark-Sweep & Mark-Compact
  不用Scavenge的原因：
   一是存活量多，复制效率低，二是一半资源浪费。
   所以用到了Mark-Sweep & Mark-Compact相结合

  Mark-Sweep：
    
    标记清除，分为标记和清除两个阶段。
    第一阶段-标记：遍历堆中所有的对象，并标记活着的对象。
    第二阶段-清除：清除没有被标记的对象。

    问题：一次标记清除回收后，内存空间会出现不连续的状态。以防后面内存分配出现内存碎片问题，Mark-Compact应运而生。

  Mark-Compact： 

    标记整理。 和Mark-Sweep不同的是标记死亡后，在整理过程中将活着的对象往一段移动，移动完成后清理掉边界外的内存。

  在取舍上，Mark-Compact由于要移动对象，所以慢，V8主要是用Mark-Sweep，空间不足以晋升时才用 Mark-Compact

  ### Incremental Marking
    为了避免出现js应用逻辑与垃圾回收器看到的不一致的情况，垃圾回收的三种算法都要将应用逻辑暂停下来，待执行完垃圾回收后再执行执行应用逻辑，这种行为被称为“全停顿（stop-the-world）”。

    新生代还好，老生代由于行动不便，需要优化。
    为了降低时间，V8先从标记阶段入手，(增量标记)incremental marking出现。也就是拆分行动，每一个步进就让js应用逻辑执行一小会儿。两者交替执行。直到标记阶段完成。经过增量标记后，最大停顿时间可以减少到原来的1/6左右

    V8后续还引入了延迟清理（lazy sweeping）和增量式整理（incremental compaction），让清理和整理也变成增量式的。


  ### 查看垃圾回收机制
  在启动时添加--trace_gc参数，在执行结束后，会在gc.log文件中得到所有垃圾回收的信息

  通过在Node启动时使用--prof参数，可以得到数据V8执行时的性能分析数据
  
  统计日志信息工具linux-tick-processor
  Windows用windows-tick-processor.bat

##　 高效使用内存
  1. 控制作用域
  2. 闭包

  这里就不解释了，很熟。


## 查看内存
  process.memoryUsage()，os模块的totalmem(),freemem()方法

  process.memoryUsage()

    里面有3个参数：
    rss：resident set size ，进程的常驻内存部分，进程的内存一共有几个部分，一部分是rss，其余部分在交换区（swap）或文件系统（filesystem）中。
    heapTotal和heapUsed： 对应的是V8的堆内存信息
    heapTotal：堆内总共申请的内存量
    heapUsed：目前堆内使用的内存量
    单位都是字节
  
  os.totalmem()： 设备总内存

  os.freemem()： 限制内存

## 内存泄漏
  内存泄漏实质是应当回收的对象出现意外而没有被回收，变成了常驻在老生代中的对象。Node对内存泄漏十分敏感，在node中内存泄漏的后果相对严重。
  
  通常，造成内存泄漏的原因有一下几个：
  1. 缓存
  
      在node中，任何拿缓存当内存的行为都应该被限制。
      限制思路： 
      1. 记录建在数组中，一旦超过数量，就以先入先出的方式进行淘汰。（缺点： 不算高效，只能应付小场景）
      2. 模块机制存在缓存，请添加清空队列的相应接口，以供调用者释放内存。

    缓存的解决方案：
    需十分慎重，除了限制大小以外，还要考虑的是进程之间无法共享内存。如果在进程中使用缓存，这些缓存不可避免的有重复。
    这种情况目前比较好的方法是使用进程外的缓存，进程自身不进入存储状态。外部缓存软件有着良好的缓存过期淘汰策略以及自有的内存管理，影响node的性能。在node中主要解决两个问题
      1. 将缓存转移到外部，减少常驻内存的对象的数量，让垃圾回收更高效。
      2. 进程之间可以共享缓存
    
    两个产品：
    Redis： https://github.com/mranney/node_redis。
    Memcached：https://github.com/3rd-Eden/node-memcached

  2. 队列消费不及时
      队列如Bagpipe会在消费者-生产者模型中充当中间产物。如果消费速度低于生产速度，将会形成堆积
      解决方法：

      表层：

        更换消费速度更高的技术
          
      深度：

        监控队列的长度，一旦堆积，通过监控系统产生警报并通知相关人员。
        另一个解决方案是任意异步都应该包含超时机制。
  3. 作用域未释放

  ## 内存泄漏排查
  常见工具：

    v8-profiler
    node-heapdump
    node-mtrace
    dtrace
    node-memwatch
  
  内存排查主要通过对堆内存进行分析而找到。

  ## 大内存引用
  node提供了stream模块用于处理大文件，stream继承自EventEmitter。

  fs的createReadStream()和createWriteStream()用于创建文件的可读流和可写流。
  可读流提供了管道方法pipe()，封装了data事件和写入操作。通过流的方式，上述代码不会受到v8内存限制的影响，有效的提高了程序的健壮性。


# 理解Buffer
  由于应用场景不同，在Node中，应用需要处理网络协议，操作数据库，梳理图片，接收上传文件等，在网络流和文件操作中，还要处理大量二进制数据，JavaScript自由的字符串远远不能满足这些需求，于是Buffer对象应运而生。

  ## Buffer结构
    Buffer是一个典型的JavaScript与C++结合的模块，它将性能相关部分用C++实现，非性能部分用JavaScript实现。
    Buffer所占用的内存不是通过V8分配的，属于堆外内存。
    Buffer是一个全局对象，所以无需require引用。

  ### Buffer对象
    Buffer对象类似于数组，它的元素为16进制的两位数，及0-255的数值
    给元素赋值，小于0加256，大于255减256，小数则取整。总之一定在0-255区间内。

  ### Buffer内存分配
  Buffer在Node的C++层实现的内存申请。
  为了高效使用内存，Node采用了slab分配机制。slab是一种动态内存管理机制。简单来说，就是一块申请好的固定大小的内存区域。

  slab有以下三个状态：

    full： 完全分配状态。
    partial： 部分分配状态。
    empty： 没有分配状态。

  new Buffer(size)用来分配Buffer对象的大小。
  Node以8KB来区分Buffer是大对象还是小对象：
  Buffer.poolSize = 8 * 1024;
  8KB也是每个slab的大小值。

  小对象： 
  ```
  var pool; 
  function allocPool() { 
    pool = new SlowBuffer(Buffer.poolSize); 
    pool.used = 0; 
  }

  new Buffer(1024);

  // 检查pool对象，如果没有被创建，将会创建一个新的slab单元指向他
  if (!pool || pool.length - pool.used < this.length) allocPool();

  this.parent = pool; //将当前Buffer对象的parent指向该slab
  this.offset = pool.used; //记录是从这个slab的哪个位置开始使用的
  pool.used += this.length; 
  if (pool.used & 7) pool.used = (pool.used + 8) & ~7; 判断剩余空间是否足够

  //再次分配
  new Buffer(3000); 
  ```
  如果剩余空间不够，会构造新的slab，原slab就会浪费。

  大对象：
  ```
  // Big buffer, just alloc one 
  this.parent = new SlowBuffer(this.length); 
  this.offset = 0;

  //SlowBuffer不推荐直接操作，最好用Buffer替代
  ```

  ## Buffer的转换
  支持编码类型有：
    
    ASCII
    UTF-8
    UTF-16LE/UCS-2
    Base64
    Binary
    Hex

  
  字符串转Buffer
  ```
  //构造函数
  new Buffer(str, [encoding]);//默认是UTF-8

  //write方法
  buf.write(string, [offset], [length], [encoding])

  每种编码所用的字节长度不同，将Buffer反转回字符串是需谨慎处理。
  ```
  Buffer不支持的编码类型：
  ```
  Buffer.isEncoding(encoding)//来判定是否可用
  ```
  以下类型可用iconv-lite或iconv转换

  包括：

    Windows 125系列
    ISO-8859系列
    IBM/DOS代码页系列
    Macintosh
    KOI8
    Latin1、
    US-ASCII
    宽字节编码GBK和GB2312

  iconv-lite：纯JavaScript实现
  iconv： 通过C++调用libiconv库完成，前者比后者性能更好
  

  ## Buffer 的拼接
  用Buffer输入流中有宽字节（类似中文）编码时，流的data事件就会出现问题。如果在Node中看到�乱发符号，那么该问题起源多半来自这里 toString()在宽字节的中文中就会出现问题
  ```
  var fs = require('fs'); 
    var rs = fs.createReadStream('test.md'); 
    var data = ''; 
    rs.on("data", function (chunk){ 
      data += chunk; //默认toString，出现乱码
    }); 
    rs.on("end", function () { 
     console.log(data); 
    });
  ```

  ### 乱码如是何产生的
  toString()方法默认以UTF-8为编码，中文字节在UTF-8中占3个字节，Buffer剩下的两个字节将会以乱码的形式现实。Buffer长度越大，被截断的情况越少，不过还是会有。
  
  ### setEncoding()和string_decoder()
  setEncoding()：作用是data事件中的传递不再是一个Buffer对线，而是编码后的字符串

  ```
  var rs = fs.createReadStream('test.md', { highWaterMark: 11}); 
  rs.setEncoding('utf8');
  ```
  原因是调用setEncoding()时，可读流对象在内部设置了decoder对象，decoder对线解码Buffer，然后将其移步，虽然后两个被分开了但是第二次write的时候会将剩余的两个和后面的11个结合在一起，再次调用3的整数倍字节进行转码，不过这个方法只能处理
UTF-8、Base64和UCS-2/UTF-16LE，适用性不高。

  ## 正确拼接Buffer
  正确的拼接方式是用一个数组来存储接收到的所有Buffer片段并记录下来所有片段的总长度，然后调用Buffer.concat()方法生成一个合并的Buffer对象
  ```
  var chunks = []; 
  var size = 0; 
  res.on('data', function (chunk) { 
    chunks.push(chunk); 
    size += chunk.length; 
  }); 
  res.on('end', function () {
    var buf = Buffer.concat(chunks, size); 
    var str = iconv.decode(buf, 'utf8'); 
    console.log(str); 
  });
  ```
  concat封装，值得学习：
  ```
  Buffer.concat = function (list, length) {
    if (!Array.isArray(list)) {
      throw new Error('Usage: Buffer.concat(list, [length])');
    }
    if (list.length === 0) {
      return new Buffer(0);
    } else if (list.length === 1) {
      return list[0];
    }
    if (typeof length !== 'number') {
      length = 0;
      for (var i = 0; i < list.length; i++) {
        var buf = list[i];
        length += buf.length;
      }
    }
    var buffer = new Buffer(length);
    var pos = 0;
    for (var i = 0; i < list.length; i++) {
      var buf = list[i];
      buf.copy(buffer, pos);
      pos += buf.length;
    }
    return buffer;
  };
  ```

  ## Buffer 与性能
  只要字符串在网络中传输就需要转换为Buffer，以进行二进制传输
  ```
  var http = require('http'); 
  var helloworld = "";
  for (var i = 0; i < 1024 * 10; i++) { 
    helloworld += "a";  
  } 
  helloworld = new Buffer(helloworld); //核心代码
  http.createServer(function (req, res) { 
    res.writeHead(200); 
    res.end(helloworld); 
  }).listen(8001);
  ```

  预先转换静态内容为Buffer对象，可以有效地减少CPU的重复使用。

  文件读取
  读取文件时，有一个highWaterMark设置性能的影响至关重要。

  ```
  var pool; 
  function allocNewPool(poolSize) { 
    pool = new Buffer(poolSize); 
    pool.used = 0; 
  }
  if (!pool || pool.length - pool.used < kMinPoolSpace) { 
    // discard the old pool 
    pool = null; 
    allocNewPool(this._readableState.highWaterMark); 
  }
  ```
  highWaterMark设置对Buffer内存的分配使用有一定的影响。
  highWaterMark设置过小，可能导致系统导致调用次数过多。


# 网络编程
Node可以用代码直接构建服务器，无需Nginx，IIS，Tomcat等服务器。
  ## 构建TCP服务
  TCP是面向连接的协议，其显著特征是在传输之前要进行3次握手形成会话。只有会话形成之后，服务器和客户端之间才能互相发送数据。在创建会话的过程中，服务器和客户端分别提供一个套接字，两个套接字共同形成一套链接。

  ###　TCP服务的事件

  服务器事件：

      listening(): 简洁写法server.listen(port,listeningListener)
      connection:每个客户端套接字连接到服务器端时触发，简洁写法为通过net.create-Server(),最后一个参数传递。
      close：关闭并停止新的链接
      error：
   
  链接事件：
    
    data：当一端用
    write()发送数据时，另一端会触发data事件，data数据即是write()发送的数据。
    end：当链接中任意一端发送了FIN数据，触发。
    connect：用于客户端，套接字与服务器链接成功时触发。
    drain：当任意一端用write()发送数据时，当前端触发。
    error：
    close：
    timeout：链接闲置时触发。

  在Node中，TCP默认启用了Nagle算法，合并多个少量数据包，放在一起发出，优化网络带宽使用，可使用socket.setNoDelay(true)去掉.关掉后，data事件只会触发一次。


  ## 构建UDP服务
  UDP服务又称用户数据包协议，与TCP一样处于网络传输层。
  UDP不是面向连接的，TCP中连接一旦建立，所有会话都会基于连接完成，属于一个套接字连接一个服务。而UDP服务可以一个套接字连接多个服务。
  优点：无需连接，资源消耗低，处理快速且灵活。
  缺点：丢包率高，不稳定。

  ## 创建UDP
  创建套接字：
  ```
  var dgram = require('dgram'); 
  var socket = dgram.createSocket("udp4");
  ```
  创建服务器端:
  ```
  var dgram = require("dgram");
  var server = dgram.createSocket("udp4");
  server.on("message", function (msg, rinfo) {
    console.log("server got: " + msg + " from " +
      rinfo.address + ":" + rinfo.port);
  });
  server.on("listening", function () {
    var address = server.address();
    console.log("server listening " +
      address.address + ":" + address.port);
  });
  server.bind(41234);
  ```
  创建客户端：
  ```
  var dgram = require('dgram');
  var message = new Buffer("Node.js");
  var client = dgram.createSocket("udp4");
  client.send(message, 0, message.length, 41234, "localhost", function (err, bytes) {
    client.close();
  });

  //send方法参数
  socket.send(buf, offset, length, port, address, [callback])
  ```

  UDP套接字事件：

    message：当UDP套接字侦听网卡端口后，接收到信息时触发，携带的数据是Buffer对象和一个远程地址信息。
    listening：
    close：
    error：

  ## 构建HTTP服务
  ```
  var http = require('http'); 
  http.createServer(function (req, res) { 
    res.writeHead(200, {'Content-Type': 'text/plain'}); 
    res.end('Hello World\n'); 
  }).listen(1337, '127.0.0.1'); 
  console.log('Server running at http://127.0.0.1:1337/');
  ```
  ### HTTP解释
  HTTP全称超文本传输协议，英文：HyperText Transfer Protocol，http构建在TCP之上，属于应用层。
  HTTP的两端是服务器和浏览器，即著名的B/S模式。
  现在的应用，如浏览器，其实是一个HTTP的代理，用户的行为将会通过它转化为HTTP请求报文发送给服务端，服务器在处理请求后，发送响应报文给代理，代理在理解报文后，将用户需要的内容呈现在界面上。
  无论是http请求报文还是响应报文，内容都包含两个部分：报文头和报文体。

  ### http模块
  TCP服务是以connection为单位进行服务，HTTP服务以request为单位进行服务。http模块是将connection到request的过程进行了封装

  对于TCP链接的读操作http模块将其封装为ServerRequest对象。
  
  HTTP请求

    对于TCP链接的读操作，http模块将其封装为ServerRequest对象。
    请求头报文头将会通过http_parser进行解析。
    有以下属性：
    req.method
    req.url
    req.httpVersion等

    解析后的样子
    headers: 
    { 'user-agent': 'curl/7.24.0 (x86_64-apple-darwin12.0) libcurl/7.24.0 OpenSSL/0.9.8r zlib/1.2.5', 
    host: '127.0.0.1:1337', 
    accept: '*/*' },
  
  HTTP响应

    HTTP响应封装了对底层链接的写操作，可以将其看成一个可写的流对象。分为setHeader()和writeHead()两个步骤。
    
    调用setHeader()后，报头才会写入到链接中。报文提部分则是调用res.write()和res.end()方法实现，后者与前者的差别是end会先调用write发送数据，然后发送信号告知服务器这次响应结束。
    响应结束后，HTTP服务器可能会将当前的链接用于下一个请求，或关闭链接。报头实在报文体发送前发送的，一旦数据开始发送，setHeader()和writeHead()将不再生效，这由协议的特性决定。
    另外，无论服务器在处理业务逻辑时是否发生异常，务必在结束时调用res.end()结束请求，否则客户端将一直处于等待状态。

  HTTP服务的事件：

    connection：在开始http请求和响应前，客户端和服务端底层进行的TCP链接。这个链接可能开启了keep-alive,可以在多次请求响应之间使用。链接建立时触发该事件。

    request：解析出HTTP请求头后，将会触发该事件，在res.end()后，TCP链接可能将用于下一次请求响应。
    
    close：

    checkContinue：某些客户端在发送较大的数据时，并不会将数据直接发送，而是先发送一个头部带Expect: 100-continue的请求到服务器，服务器将会触发checkContinue事件。如果没有监听该事件，服务器将会自动响应客户端100 Continue的状态码，其与request事件互斥，网客户端收到100 Continue后重新发起请求时才会触发request事件。

    connect：客户端发起CONNECT请求时触发。

    upgrade： 客户端要求升级链接的协议时，会在请求头带上Upgrade字段，服务器接收后触发。
    clientError：客户端触发error时，在服务器端触发该事件

  ### HTTP客户端
  http模块底层API：http.request(options, connect),用于构造HTTP客户端。

  options参数决定了这个HTTP请求头的内容，它的选项有：

    host：服务器域名或者IP地址
    hostname：服务器名称
    port：端口，默认80
    localAddress: 建立网络的本地网卡
    socketPath: Domain套接字路径
    method: HTTP请求方法，默认get
    path: 请求路径，默认/
    headers：请求头对象
    auth：Basic认证

  报文体的内容由请求对象的write()和end()方法实现：通过write()方法连接写入数据，end()方法告知报文结束。 它与Ajax调用几近相同，**Ajax的实质就是一个异步的网络HTTP请求。**

  http响应：
  ```
  function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log(chunk);
    });
  }
  ```

  HTTP代理：

    http提供的ClientRequest对象也是基于TCP层实现的。为了重用TCP连接，http模块包含一个默认的客户端代理对象http.globalAgent。它对每个服务器端创建的连接进行了管理，默认情况下，通过ClientRequest对象对同一个服务器端发起的HTTP请求最多可以创建5个连接。它的实质是一个连接池。
    调用HTTP客户端同时对一个服务器发起10次http请求时，实质只有5个处于并发状态，后续的需要等待某个请求完成服务后才真正发出。

  http客户端事件

    response
    socket
    connect
    upgrade
    continue

  ## 构建WebSocket服务
  WebSocket和Node配合堪称完美。理由：
  1. WebSocket客户端基于事件的编程模型与Node中自定义事件相差无几。
  2. WebSocket实现了客户端与服务器端之间的长链接，而Node事件驱动的方式十分擅长与大量的客户端保持高并发链接。

  示例：
  ```
  var socket = new WebSocket('ws://127.0.0.1:12010/updates');
  socket.onopen = function () {
    setInterval(function () {
      if (socket.bufferedAmount == 0)
        socket.send(getUpdateData());
    }, 50);
  };
  socket.onmessage = function (event) {
    // TODO：event.data 
  };
  ```
  上述代码，浏览器每50毫秒想服务器发送一次数据，通过onmessage方法接受服务器端传来的数据

  WebSocket主要分成两个部分：握手和数据传输。

  ### WebSocket握手

  可以用以下两个协议头将协议升级为WebSocket

    Upgrade: websocket 
    Connection: Upgrade
    
  Sec-WebSocket-Key用于安全检验，其值是随机Base64编码的字符串。服务器端接受后将其与字符串258EAFA5-E914-47DA-95CA-C5AB0DC85B11相连，形成新的字符串，然后通过sha1安全散列算法计算出结果后，在进行Base64编码，最后返回给客户端.客户端会校验Sec-WebSocket-Accept的值，如果成功，即可开始传输数据

  ### WebSocket数据传输

  握手顺利完成后，开始WebSocket的数据帧协议，而不是http交互。

  握手顺利完成后，客户端的onopen()将会被触发执行。
  代码
  ```
  socket.onopen = function () { 
  // TODO: opened() 
  };
  ```
  服务器端则是对底层data事件上进行封装：
  ```
  //在接受数据时
  WebSocket.prototype.setSocket = function (socket) { 
    this.socket = socket; 
    this.socket.on('data', this.receiver); 
  };
  //在发送数据时
  WebSocket.prototype.send = function (data) { 
  this._send(data); 
  };
  ```
  为了安全考虑，客户端需要对发送的数据进行掩码处理，服务器一旦受到无掩码帧（比如中间拦截破坏），链接将关闭。

  ## 网络服务与安全
  SSL（Secure Sockets Layer，安全套接层）安全协议，在传输层提供对网络链接加密的功能。对应用层是透明的，在数据传输到应用层前就完成了加密解密的过程，后来IETF将其标准化，称为TLS（Transport Layer Security,安全传输协议）

  ### TLS/SSL
  秘钥：
    TLS/SSL是一个公钥/私钥的结构，它是一个非对称结构。公钥用来加密数据，私钥用来解密。客户端与服务端需要互换公钥。Node在底层采用openssl实现TLS/SSL。

    // 生成服务器端私钥
    $ openssl genrsa -out server.key 1024 
    // 生成客户端私钥
    $ openssl genrsa -out client.key 1024    
    //生成公钥
    $ openssl rsa -in server.key -pubout -out server.pem 
    $ openssl rsa -in client.key -pubout -out client.pem

    惧怕中间人攻击

  数字证书：
  引入第三方：CA（Certificate Authority，数字认证中心）。CA的作用是为站点颁发证书，且这个证书中具有CA通过自己公钥和私钥实现的签名。这是一个繁琐的过程，对于中小型企业而言，多半采用自签名证书来构建安全网络的。即自己扮演CA机构给自己服务器端颁发签名证书。过程：
  ```
  $ openssl genrsa -out ca.key 1024 
  $ openssl req -new -key ca.key -out ca.csr 
  $ openssl x509 -req -in ca.csr -signkey ca.key -out ca.crt
  ```
  在申请签名证书之前要创建自己的CSR文件。
  ```
  //生成CSR文件
  $ openssl req -new -key server.key -out server.csr
  //想CA机构申请签名，其中需要CA的证书和私钥的参与，最终颁发一个带有CA签名的证书。
  $ openssl x509 -req -CA ca.crt -CAkey ca.key -CAcreateserial -in server.csr -out server.crt
  ```
  客户端在发起安全连接前回去获取服务器端的证书，并通过CA的证书验证服务器端证书的真伪。证书在请求的过程中会被发送给客户端。颁发自由签名证书

  ###　TLS服务

  服务器端：
  创建服务器端，创建一个echo服务，启动后通过下面命令可以测试证书是否正常：
    $ openssl s_client -connect 127.0.0.1:8000

  客户端：
    构建前需为客户端生成属于自己的私钥和签名：
    ```
    // 创建私钥
    $ openssl genrsa -out client.key 1024 
    // 生成CSR 
    $ openssl req -new -key client.key -out client.csr 
    // 生成签名证书
    $ openssl x509 -req -CA ca.crt -CAkey ca.key -CAcreateserial -in client.csr -out client.crt
    ```
    启动客户端的过程中用到了为客户端生成的私钥，证书，CA证书。与普通的TCP服务器和客户端相比，TLS的服务器和客户端仅仅只在证书的配置上有差别，其余部分基本相同。


  ### HTTPS 服务
  私钥和签名证书生成方式是一样的。

  创建https服务：就比http服务多了一个选项配置，其余地方几乎相同

  启动之后通过curl进行测试，相关代码如下：
  ```
  $ curl https://localhost:8000/ 
  curl: (60) SSL certificate problem, verify that the CA cert is OK.Details:
  error: 14090086: SSL routines: SSL3_GET_SERVER_CERTIFICATE: certificate verify failed
  More details here: http://curl.haxx.se/docs/sslcerts.html 
  curl performs SSL certificate verification by default, using a "bundle"
  of Certificate Authority(CA) public keys(CA certs).If the default
  bundle file isn't adequate, you can specify an alternate file 
  using the--cacert option.
  If this HTTPS server uses a certificate signed by a CA represented in
    the bundle, the certificate verification probably failed due to a
  problem with the certificate(it might be expired, or the name might 
  not match the domain name in the URL).
  If you'd like to turn off curl's verification of the certificate, use
  the - k(or--insecure) option.
  ```
  由于是自签名的证书，curl无法验证服务器端证书是否正确。
  解决方式两种：
  1. 加-k选项，让curl工具忽略掉证书的验证，安全度低。
   ```
   $ curl -k https://localhost:8000/
   ```
  2. 给curl设置--cacert选项，告知CA证书使之完成对服务器证书的验证，如下所示：
  ```
  $ curl --cacert keys/ca.crt https://localhost:8000/
  ```
  https客户端：
  同上，比http多了指定证书的相关参数
  如果不设置ca选项，将会得到：
  [Error: UNABLE_TO_VERIFY_LEAF_SIGNATURE]


  # 构建web应用

  ## 基础功能
  一个简单的Hello World：
  ```
  var http = require('http');
  http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
  }).listen(1337, '127.0.0.1');
  console.log('Server running at http://127.0.0.1:1337/');
  ```  
  一个正常的，具体的业务中，我们可能会有以下需求：
    请求方法的判断
    URL的路径解析
    URL中查询字符串解析
    Cookie的解析
    Basic认证
    表单数据的解析
    任意格式文件的上传处理

  ### HTTP_Parser解析
  解析方法，req.method

  解析路径，req.url，hash部分会被抛弃

  查询字符串：
  ```
  // 查询字符串

  // var url = require('url');
  // var querystring = require('querystring');
  // var query = querystring.parse(url.parse(req.url).query);

  // 更简洁的方法，给url.parse()传递第二个参数，如下所示：
  var query = url.parse(req.url, true).query;
  ```
  业务调用产生之前，我们中间件或者框架会将查询字符串转换，然后挂载在请求对象上供业务使用,如果查询字段出现多次，值会是一个数组


  ### Cookie 
  Cookie最早是用来记录服务器与客户端之间的状态的。

  Cookie 的处理分为以下几步：
  1. 服务器想客户端发送Cookie。
  2. 浏览器将Cookie保存。
  3. 之后每次浏览器都会将Cookie发向服务器。

  可以通过curl工具构造几个字段
  ```
  curl -v -H "Cookie: foo=bar; baz=val" "http://127.0.0.1:1337/path?foo=bar&foo=baz"
  ```
  解析Cookie：
  ```
  var parseCookie = function (cookie) {
    var cookies = {};
    if (!cookie) {
      return cookies;
    }
    var list = cookie.split(';');
    for (var i = 0; i < list.length; i++) {
      var pair = list[i].split('=');
      cookies[pair[0].trim()] = pair[1];
    }
    return cookies;
  };
  ```
  挂载到req对象上，让业务代码可以直接访问
  ```
  function (req, res) { 
    req.cookies = parseCookie(req.headers.cookie); 
    hande(req, res); 
  }
  ```
  相应Cookie是在Set-Cookie字段中，格式如下：
  ```
  Set-Cookie: name=value; Path=/; Expires=Sun, 23-Apr-23 09:01:35 GMT; Domain=.domain.com;
  ```
  Cookie参数，name=value必填，其它都是可选有，主要选项：
  
    path:
    Expires和Max-Age：告知浏览器何时过期，前者是一个时刻，后者是一个时间段。
    HttpOnly：告知刘爱力器不允许通过脚本document.cookie去更改Cookie的值。（只会消失，值依然在）
    Secure：为true时只在https中有效
  
  Set-Cookie中第二个参数可以是数组,会在报头显示出来
  ```
  res.setHeader('Set-Cookie', [serialize('foo', 'bar'), serialize('baz', 'val')]);

  Set-Cookie: foo=bar; Path=/; Expires=Sun, 23-Apr-23 09:01:35 GMT; Domain=.domain.com; 
  Set-Cookie: baz=val; Path=/; Expires=Sun, 23-Apr-23 09:01:35 GMT; Domain=.domain.com;
  ```
  Cookie性能:
  1. 减少Cookie的大小
  2. 为静态组件使用不同的域名
  3. 减少DNS查询

### Session
  解决对Cookie敏感数据的保护无效问题,Session数据只保留在服务端,客户端无法修改.

  设置Session的两种方式:
  第一种:基于Cookie来实现用户和数据的映射.
  第二种：通过查询字符串来实现浏览器端和服务器端数据的对应。原理是检查请求的查询字符串，如果没有值，会先生成新的带值的URL进行传输，不过这种情况效果

  Session与内存：

    Session数据一般直接存在变量sessions中，它位于内存中。不过存在内存中会有很大的隐患，第一，会引起垃圾回收的频繁操作，第二，可能为了利用多核CPU而启动多个进程。Node的进程与进程之间是不能直接共享内存的，用户的Session可能会产生混乱。

    解决方法：
    Session集中化，统一转移到集中的数据存储中。目前常用工具是：Redis、Memcached等。虽然速度相对慢了一点，不过有以下优点：
    1. Node与缓存服务保持长连接，不是频繁的短连接，握手导致的延迟只影响初始化。
    2. 高速缓存直接在内存中进行数据存储和访问
    3. 换fun服务通常与Node进程运行在相同的机器上或者相同的机房里，网络速度受到的影响较小。


  Session与安全

    以上两种方式都会使得Session的口令保存在客户端，依然还是会出现被盗用的情况。
    做法：
      通过将这个私钥加密进行签名，使得伪造的成本较高。客户端尽管可以伪造口令值，但是由于不知道私钥值，签名信息很难伪造。

    XSS攻击就是通过页面跳转逻辑漏洞修改跳转页面，然后将Cookie发送到攻击者的服务器，再拿到改用户的Session口令，伪装用户身份。

  设置缓存：
  其它方式如Expires，或多或少有缺陷，在此不赘述。
  Cache-Control方式：
  ```
  var handle = function (req, res) {
    fs.readFile(filename, function (err, file) {
      res.setHeader("Cache-Control", "max-age=" + 10 * 365 * 24 * 60 * 60 * 1000);
      res.writeHead(200, "Ok");
      res.end(file);
    });
  };
  ```
  这种方式能避免浏览器端与服务器端时间不同步带来的不一致性问题，只要进行类似倒计时的方式计算过期时间即可。

  清除缓存：
    缓存清除需要版本号控制，浏览器是根据URL进行缓存，每次更新内容时，我们让浏览器发起新的URl请求，一版更新机制有两种：
    1. 每次发布路径跟随版本号。
    2. 每次发布路径跟随该文件内容的hash值。

  ### Basic认证
    Basic认证是当客户端与服务端进行请求时，允许通过用户名和密码实现的一种身份认证方式。
    代码如下
    ```
    var encode = function (username, password) { 
      return new Buffer(username + ':' + password).toString('base64'); 
    };
    ```

## 路由解析

### 文件路径
1. 静态文件
  直观简单，

2. 动态文件
  根据文件后缀影响输入，输出的方式，这种情况在node中不常见，因为node也是以js为后缀的

### MVC  
MVC主要思想是将业务逻辑按职责分离，主要有以下几种：

>控制器（Controller）：一组行为的组合。
>模型（Model）：数据相关的操作和封装。
>视图（View）：视图的渲染。

大致工作模式：

>路由分析，根据URL寻找对应的控制器和行为
>行为调用相关的模型，进行数据操作
>数据操作结束后，调用视图和相关数据进行页面渲染，输出到客户端。

第一个，路由映射：
1. 手工映射：方法比较原始，不过对URL要求比较灵活。
2. 正则匹配：用正则表达式来映射，匹配速度快，可用于大量数据。
3. 参数解析： 将正则匹配的结果解析出来。

第二个，自然映射：在url上拼接参数


### RESTful
  REST全称：Representational State Transfer，表现层状态转化。

  在RESTful设计中，资源格式由请求报头中的Accept字段和服务器的支持情况来决定。

  客户端设置同时接收json格式和XML格式：
  > Accept: application/json,application/xml

  响应报文设置：
  >Content-Type: application/json

## 中间件
  即将请求和响应之间的内容封装起来，如访问日志，查询字符串，Cookie等。让开发只负责开发部分，简化开发流程，提升开发效率。
  代码在index.js中

  如何提升中间件性能:
  1. 编写高效的中间件
  
      即提升单个处理单元的速度,以尽早调用next()执行后的逻辑. 常见的优化方法有:

          使用高效方法,必要时通过jsperf.com测试基准性能.
          缓存需要重复计算的结果
          避免不必要的计算.

  2. 合理使用路由

## 页面渲染

### 内容响应
内容响应过程中，Content-*字段十分重要，如：
```
Content-Encoding: gzip                        //编码格式
Content-Length: 21170                         //内容长度，单位字节
Content-Type: text/javascript; charset=utf-8  //类型是js,字符集是utf-8 
```

Content-Type不同，终端的解析方式就不同，如text/html则会解析html标签，浏览器通过Content-Type决定渲染方式，这个值被称为MIME（Multipurpose Internet Mail Extensions）值。

获取mime值：
```
var mime = require('mime');
mime.lookup('...');
```
常用的mime值有：

    .doc     application/msword

    .docx   application/vnd.openxmlformats-officedocument.wordprocessingml.document
    .rtf       application/rtf
    
    .xls     application/vnd.ms-excel application/x-excel
    .xlsx    application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
    
    .ppt     application/vnd.ms-powerpoint
    .pptx    application/vnd.openxmlformats-officedocument.presentationml.presentation
    
    .pps     application/vnd.ms-powerpoint
    .ppsx   application/vnd.openxmlformats-officedocument.presentationml.slideshow
    
    .pdf     application/pdf
    .swf    application/x-shockwave-flash
    .dll      application/x-msdownload
    
    .exe    application/octet-stream
    .msi    application/octet-stream
    .chm    application/octet-stream
    .cab    application/octet-stream
    .ocx    application/octet-stream
    
    .rar     application/octet-stream
    .tar     application/x-tar
    .tgz    application/x-compressed
    .zip    application/x-zip-compressed
    .z       application/x-compress
    
    .wav   audio/wav
    .wma   audio/x-ms-wma
    .wmv   video/x-ms-wmv
    .mp3 .mp2 .mpe .mpeg .mpg     audio/mpeg
    .rm     application/vnd.rn-realmedia
    
    .mid .midi .rmi     audio/mid
    
    .bmp     image/bmp
    .gif     image/gif
    .png    image/png
    .tif .tiff    image/tiff
    .jpe .jpeg .jpg     image/jpeg
    
    .txt      text/plain
    .xml     text/xml
    .html     text/html
    .css      text/css
    .js        text/javascript

  >下载内容：Content-Disposition，当内容值需及时查看时，值为inline，当数据可以存为附件时。值为attachment。
  

# 进程
  本章主要介绍Node是如何充分理由多核CPU以及如何保证使用后进程的健壮性和稳定性。
  进程模型：

    同步进程： 最早的模型，不赘述。
    复制进程： 复制进程，预复制，进程复用，不具备伸缩性 QPS： M/N
    多线程： 线程之间共享数据，通过时间切片方法，可均匀使用CPU资源 QPS： M * L/N 代表：Apache
    事件驱动：采用单线程，避免不必要内存开销， 可伸缩性高，代表： Node，Nginx，PHP。如果解决多核CPU利用的问题，
## 多进程架构
  Node提供了child_process以及child_process.fork()函数供我们实现进程的复制。
  
  Master-Worker模式(主从模式)，主进程不负责具体的业务处理，而是负责调度或者管理工作进程，它是趋向稳定的。工作进程负责具体的业务处理。
  通过fork()复制的进程都是一个独立的进程，这个进程中有着独立而全新的V8实例。它需要至少30毫秒的启动时间和至少10MB的内存。尽管Node提供了fork()供我们使用，但是依然要切记fork()进程是昂贵的。好在Node通过事件驱动在单线程上解决了打并发的问题，这里启动多个进程只是为了充分将CPU资源利用起来，而不是为了解决并发问题。

  ### 创建子进程
  child_process提供了4个方法来创建子进程：
  1. spawn()：启动一个子进程来执行命令
  2. exec()：同上，不同的是有一个回调函数获知子进程的情况
  3. execFile()：启动一个子进程来执行可执行的文件
  4. fork()：与spawn()类似，不同：其创建的Node子进程只需要指定执行的JavaScript文件模块即可
  
  区别：

  | 类型       | 回调/异常 | 进程类型 | 执行类型       | 可设置超时 |
  | ---------- | --------- | -------- | -------------- | ---------- |
  | spawn()    | no        | 任意     | 命令           | no         |
  | exec()     | yes       | 任意     | 命令           | yes        |
  | execFile() | yes       | 任意     | 可执行文件     | yes        |
  | fork()     | no        | Node     | JavaScript文件 | no         |

  这里的执行文件是指可以直接执行的文件，如果是JavaScript文件通过execFile()运行，它的首行内人必须添加如下代码：
  #!/usr/bin/env node

  ### 进程间通信
  在前端浏览器中，JavaScript主线程与UI渲染公用一个线程，两者无法同时运行，为了解决此问题，HTML5提出了WebWorker API。WebWorker允许创建工作线程并在后台运行。
  主线程与工作线程之间通过onmessage()和postMessage()进行通信，子进程对象则通过send()方法实现主进程向子进程发送数据，message事件实现收听子进程发来的数据。
  
  创建子进程后，父子进程间会创建IPC通道，通过IPC通道，父子进程才能通过message()和send()传递信息。

  IPC（Inter-Process Communication），即进程间通信。这里的技术有很多：命名管道，匿名管道，socket，信号量，共享内存，消息队列，Domain Socket等。Node中是管道（pipe）技术。不过此管道非彼管道，在Node中管道是个抽象层面的称呼，具体实现细节由libuv提供，在Windows下由命名管道（named pipe）实现。Unix下用Unix Domain Socket实现。表现在应用层上只有message和send()方法。父进程在创建子进程之前，会创建IPC通道并监听它，然后创建真正的子进程，并通过环境变量（NODE_CHANNEL_FD）告诉子进程这个IPC通道的文件描述。
  由于IPC通道是用Domain Socket或命名通道创建的，他们与网络socket的行为比较类似，属于双向通信。不同的是它们在系统的内核中就完成了进程之间的通信，而不用进过实际的网络层，非常高效。(子进程只有是Node进程才会有IPC通道，其它类型除非按约定提前建好IPC通道，否则无法使用)
  
  ### 句柄传递


  句柄是一种可以用来标识资源的引用，它的内部包含了指向对象的文件描述符。比如句柄可以用来标识一个服务器的socket对象，一个客户端socket对象，一个UDP套接字，一个管道等。

  句柄是用來解决多个进程无法监听同一个接口的问题，句柄还能使得每个进程较为均衡的执行任务。
  句柄可以让主进程接收到socket请求后，将这个socket直接发送给工作进程，无需建立新的socket链接。

  使用方法(send()方法的第二个参数)：
  child.send(message, [sendHandle])

  send()方法可以发送的句柄类型：
  net.Socket. TCP套接字。
  net.Server. TCP服务器。
  net.Native. C++层面的TCP套接字或IPC管道。
  dgram.Socket。 UDP套接字。
  dgram.Native。C++层面的UDP套接字。

  message：
  ```
  { 
  cmd: 'NODE_HANDLE', 
  type: 'net.Server', 
  msg: message 
  }
  ```
  send()方法在父子进程传递过程中会将message对象JSON.stringify()后通过IPC通道，然后再用JSON.parse()解析，所以其实Node进程之间只有消息传递，没有对象传递。

  各线程能监听的原因是因为它们的文件描述是相同的，不过在使用中只能一个进程使用，所以，这些进程服务是抢占式的。

## 集群稳定
  利用多核CPU还需要考虑一下问题：
  1. 性能问题。
  2. 多个工作进程的存活状态管理。
  3. 工作进程的平滑重启。
  4. 配置或者静态数据的动态重新载入。
  5. 其它细节。

### 进程事件
子进程除了send()和message对象事件外，还有如下事件：
1. error：当子进程无法被复制创建，无法被杀死，无法发送消息时会触发。
2. exit：子进程退出时触发，正常退出第一个参数是退出码，否则是null，如果通过kill()方法，则会出现第二个参数，表示杀死进程时的信号。
3. close：在子进程的标准输入输出流中止时触发该事件，参数与exit相同。
4. disconnect：在父进程或子进程中调用disconnect()方法时触发该事件，调用该方法时间关闭监听IPC通道

以上是父进程能监听到子进程相关的事件,另外还有一个kill()方法,给字进程发送了一个系统信号。默认情况是SIGTERM信号,每个进程都可以监听到这个信号，进程收到信号时会做出相应的行为，如SIGTERM是终止信号，则进程收到信号后应当退出。
```
// 子进程
child.kill([signal]); 
// 当前进程
process.kill(pid, [signal]);
```
###　自动重启
  
  自杀信号：由于代码在出问题后会自动重启，不过重启不能等到工作进程退出后才重启新的进程。也不能暴力退出，这样会导致已连接的用户直接断开。于是我们需要在退出流程中添加一个自杀（suicide）信号。工作线程得知要退出后向主线程发出信号，接收后才开始停止接收新的连接，断开所有连接后退出。

  优化后代码的稳定性和健壮性会大大提高， 由于我们的链接是长连接，断开可能会比较久，所以后面会加一个定时器。而且需要在进程中捕获异常，记录日志。

  工作进程不能无限制地被重启，所以还要设置重启次数

### 负载均衡
  Node处理负载均衡的策略叫Round-Robin，又叫轮叫调度。工作方式是由主进程接收链接，将其依次分发给工作进程，分发的策略是在N个工作进程中，每次选择第i=(i+1)mod n个进程来发送链接。在cluster模块中启用它的方式如下：
  ```
  // 启用Round-Robin 
  cluster.schedulingPolicy = cluster.SCHED_RR 
  // 不启用Round-Robin
  cluster.schedulingPolicy = cluster.SCHED_NONE
  ```
  或者在环境变量中设置NODE_CLUSTER_SCHED_POLICY的值：
  ```
  export NODE_CLUSTER_SCHED_POLICY=rr
  export NODE_CLUSTER_SCHED_POLICY=none
  ```
  缺点：导致服务器上消耗的文件描述符是平常方式的两倍

### 状态共享
  即多进程之间的数据共享

  方法1：
  第三方数据存储，如数据库，磁盘文件，缓存服务（如Redis）中。存到这里面需要实现状态同步，机制有两种：

   1. 各个子进程去向第三方进行定时轮询
      问题：轮询时间不能过密，会出现并发，无法及时更新

  2. (先进)主动通知：当数据发生更新时，主动通知子进程。虽然也需要一种机制来即使获取数据的改变，这个过程仍不能脱离轮询，但我们可以减少轮询数量，单独一个进程用来发送通知和查询状态是否修改，这样的进程叫通知进程。

  这种机制按进程间信号传递，在跨多台服务器时会无效，事故可以考虑TCP或UDP的方案。

## Cluster 模块

  Node在v0.8版本后，新增了cluster模块来解决多核cpu的利用率的问题，同时也提供了较完善的API，用以处理进程的健壮性问题。
  在进程中判断时主进程还是父进程，主要取决于环境变量中是否有NODE_UNIQUE_ID,如下所示：
  ```
    cluster.isWorker = ('NODE_UNIQUE_ID' in process.env); 
    cluster.isMaster = (cluster.isWorker === false);
  ```
  这里建议用cluster.setupMaster()API创建子进程，将主进程和工作进程从代码中完全剥离。而不是用cluster.fork()

  ### cluster工作原理
  事实上cluster模块就是child_process和net模块的组合应用。cluster启动时，会在内部启动TCP服务器，在cluster.fork()子进程时，将这个TCP服务端socket的文件描述符发送给工作进程。如果进程时cluster.fork()复制出来的，其环境变量中存在NODE_UNIQUE_ID，如果进程中存在listen()侦听网络端口的调用，它将拿到该文件描述符，通过SO_REUSEADDR端口重用，从而实现多个子进程共享端口。普通情况下没有这种情况。 

  >cluster中，一个主进程只能管理一组工作进程。而child_process则可以控制多组

  ## cluster事件

    fork: 复制一个工作进程后触发
    online:复制好一个工作进程后，工作进程会主动触发一条online消息给主进程，主进程收到消息后触发
    listening:工作进程中调用listen()（共享了服务器端Socket）后，发送一条listening消息给主线程，主线程收到消息后触发
    disconnect:主线程和工作进程之间IPC通道断开后会触发该事件。
    exit:有工作进程推出时触发
    setup:cluster.setupMaster()执行后触发该事件。


## 总结
虽然Node从单线程来讲时脆弱的，不过用主从形式整合能力强大，这里要注意主线程的稳定性，如果主线程崩了，后果会非常严重。


# 测试

## 单元测试
  ### 单元测试的意义
  首先，需要倡导的是，开发者应该保证自己的代码质量，从代码方面验证自己的代码质量会更直接，更基本。

  测试工程师可能对Node领域本身不熟悉，而且如果有人事变动，新的测试工程师会有遗漏。

  第三方代码（npm下来的代码）的质量参差不齐

  产品迭代过程中，如API升级，是否可以保证代码可以向下兼容。

  维护方面会有质量保证，代码修改不用害怕功能缺失。可维护性高。

  编写可测试代码的原则： 

    单一职责
    接口抽象
    层次分离

 
 ### 单元测试介绍
  单元测试主要包含断言，测试框架，测试用例，测试覆盖率，mock，持续集成等几个方面
 
  **断言：**

  用于检查程序在运行时是否满足期望。js断言规范最早来自CommonJS规范。在node中，可以用assert模块来做断言。
  ```
  var assert = require('assert'); 
  assert.equal(Math.max(1, 100), 100);
  ```

  断言检测方法：
   1. ok(): 判断结果是否为真
   2. equal():  判断实际值是否和期望值相等
   3. notEqual(): 与2相反
   4. deepEqual(): 判断引用类型的值是否都相等
   5. notDeepEqual(): 与4相反
   6. strictEqual(): 判断是否严格相等（相当于===）
   7. notStrictEqual(): 与6相反（相当于!==）
   8. throws(): 判断代码是否抛出异常
   9. doesNotThrow(): 判断代码块是否没有抛出异常
   10. ifError(): 判断实际值是否是假值（null，undefined，0，'',false）,如果不是假值则抛出异常。

  **测试框架**

  mocha, 下载方法 npm install mocha
  这里补充一下，现在我们常用的测试框架有jest， mocha，jasmine等，我们目前最常用的是jest，也是我个人唯一一个使用过的框架。


  **测试用例**
  一个行为或者功能需要有完善的，多方面的测试用例，一个测试用例中包含至少一个断言。
  
  对于node而言，异步测试会非常常见，mocha中会将一个函数done()注入作为实参然，测试代码需要主动调用这个函数通知测试框架当前测试用例执行完成，然后测试框架才进行下一个测试用例的执行。
  
  并且在异步方法下还要加一个超时设定，以防done一直存在

  写法： setTimeout(done, time);

  **测试覆盖率**
  这里我们需要用到工具：
  1. jscover，安装方法是npm install jscover -g
  2. blanket， 直接通过mocha --require blanket -R html-cov > coverage.html 引用即可。


  **mock**
  模拟异常：即通关未在被调用方来测试上层代码的健壮性
  如一下数据库的异步调用中的网络异常，权限异常等非输入相关的情况。

**私有方法的测试**
  即不挂载在exports或module.exports上的变量或方法如何测试，在Node中，提供了一个rewire模块，
```
var limit = function (num) { 
  return num < 0 ? 0 : num; 
};

it('limit should return success', function () { 
  var lib = rewire('../lib/index.js'); 
  var litmit = lib.__get__('limit'); 
  litmit(10).should.be.equal(10); 
});

<!-- 模拟require -->
(function (exports, require, module, __filename, __dirname) { 
  var method = function () {}; 
  exports.__set__ = function (name, value) { 
  eval(name " = " value.toString()); 
  }; 
  exports.__get__ = function (name) {
    return eval(name); 
  }; 
});
```

### 工程化与自动化

  工程化：
  在lunix下可以用makefile

  这里浅尝截止即可，如果需要了解可以去现在的社区看看


## 性能测试
  性能测试的范围比较广泛，包括负载测试，压力测试和基准测试等。
  这一部分并非node特有，在这里直接撒好一下基准测试，以及对web应用进行网络层面的性能测试和业务指标的换算。
### 基准测试
即两个功能相同的代码，重复执行多次，看哪个代码消耗的时间和内存较小

## 压力测试
主要是对网络接口做压力测试以判断网络接口的性能，指标有吞吐率，响应时间和并发数。
常用的工具是ab、siege、http_load等。

### 基准测试驱动开发
即BDD（Benchmark Driven Development），基准测试驱动开发。
流程：
1. 写基准测试
2. 写/改代码
3. 收集数据
4. 找出问题
5. 如果有问题，回到第二步

# 产品化

## 项目工程化
  即项目，文件的组织能力。最基本的几步是目录结构，构建工具，编码规范和审查代码等。

  第一步：项目配置
  ```
   History.md // 项目改动历史
  INSTALL.md // 安装说明
  Makefile // Makefile文件
  benchmark // 基准测试
  controllers // 控制器
  lib // 没有模块化的文件目录
  middlewares // 中间件
  package.json // 包描述文件，项目依赖项配置等
  proxy // 数据代理目录，类似MVC中的M
  test // 测试目录
  tools // 工具目录
  views // 视图目录
  routes.js // 路由注测表
  dispatch.js // 多进程管理
  README.md //  项目说明文件
  assets // 静态文件目录
  assets.json // 静态文件与CDN路径的映射文件
  bin // 可执行脚本
  config // 配置目录
  logs // 日志目录
  app.js // 工作进程
  ```

  这是一般项目会有的几个应用目录，成熟一点的框架（如Express）还提供了命令行工具来初始化web应用。


  第二步：构建工具
    主要作用是和并静态文件，压缩文件大小，打包应用，编译模块等。

  > Makefile ：Lunix下的构建工具。

  > Grunt: 用Node写成，解决了Makefile无法跨平台的问题

  第三步： 编码规范
    JSLint和ESLint

  第四步： 代码审查
  Github和GitLab等

  ## 部署流程
    即在生产环境上测试，用脚本来停止进程和重启进程

  ## 性能
    提升性能有以下几个原则：
    做专一的事。
    让擅长的工具做擅长的事
    将模型简化
    将风险分离
    处理缓存

  >动静分离：Node处理静态文件的能力并不突出，所以可以将图片，脚本，样式表和多媒体等静态文件都引导到静态文件的服务器上，让Node只处理动态请求即可

    
  >多进程架构：利用多核CPU，建立机制让Node进程更加健壮，以保障Web应用持续服务。

  >读写分离：即数据库的读写分离，将数据库进行主从设计，这样读数据操作不再受到写入的影响，降低了性能要求。

  ## 日志
 > 访问日志：记录每个客户端对应的访问，在web应用中，主要记录一些http请求的关键数据。

 > 异常日志：记录异常报错。Node提供console对象，有log info， warn， error四种。

 >日志与数据库：入职文件与数据库写入在性能上处于两个级别，数据库在写入过程中要经历一些列处理。日志则是直接写入磁盘。所以，将日志分析和日志记录分两个步骤是比较好的选择，记录在线写，分析可以借助一些工具入库。

 >日志分割：日志数据一定会很多，所以将日志通过日期切割开来存储时一个不错的选择。

 ## 监控报警
  用监控报警机制即使反馈，发现错误，方便修复。
  监控分为两类，一个是业务逻辑型监控，一个是硬件型的监控。
   监控方法： 
   1. 日志监控：通过异常日志的变动来监控
   2. 响应时间：查看某一个子系统的响应时间，看出现的异常和性能瓶颈
   3. 进程监控：一般是检查操作系统中运行的应用进程数，进行判断，如果工作进程数量低于预估值则报错
   4. 磁盘监控：监控磁盘的用量，超上限提醒清理
   5. 内存监控：检查内存使用情况，看是否出现内存泄漏。
   6. CPU占用监控：CPU的使用分为用户态，内核态，IOWait等。用户态使用效率高，说明服务器上的应用需要大量的CPU开销；内核态使用率高，说明服务器花费大量时间进行进程调度或者系统调用；IOWait使用率则反应CPU等待磁盘I/O操作。
   7. CPU load监控：又称CPU平均负载。用来描述操作系统当前的繁忙程度。
   8. I/O负载：主要是磁盘I/O,这里一般不会出现磁盘I/O负载过高的情况，大多数I/O压力来自数据库，不过还是以防外一。
   9. 网络监控：对流浪进行监控并设置上限值。
   10. 应用状态监控：外部监控，持续的调用应用的反馈来检查它的健康状态。
   11. DNS监控：域名监控虽然比较稳定，不过一旦出问题就是大问题。所以监控也是并不可少的。

  报警方法： 
  1. 邮件报警 
  2. 短信或电话报警

  还需要保证监控系统的稳定性，不过这里就是另一个话题了。

  ## 稳定性
  应用的稳定性，需求量如果太大，单独一台服务器将满足不了，这就需要将Node按多进程的方式部署到多台服务器中。为此，我们需要考虑如何在多台服务器上架设负载均衡，以及如何进行容灾备份。

  ## 异构共存
  即在原来的架构和语言上与新增的Node共存，因为Node本身构建与C/C++之上，以JavaScript为调用语言，所以异构性较强。