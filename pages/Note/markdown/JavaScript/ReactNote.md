# jsx

jsx 是 js 的一种语法扩展
流程：

- 编写 jsx 代码
- babel 编译成 React.createElement
- React.createElement: 处理传入的属性值 => 遍历 config，筛选出可以提进 props 里的属性 => 提取子元素，推入 childArray（即 props，children）数组 => 格式化 defaultProps => 结合以上数据作为入参，发起 ReactElement 调用
- ReactElement: 本质上是一个虚拟 dom，通过 render 方法渲染到容器中

# render

## state 更新流程：

    当react在执行渲染时会触发一个ReactDefaultBatchingStrategy对象（其本身是一个Transaction（事物）机制）来管控render更新，对象中会有一个isBatchingUpdates的锁标识，当这个标识为true的时候，批量更新将会被锁上，无法更新。

    而在render更新流中，isBatchingUpdates在react生命周期函数以及合成事件更新前会被修改为true，当函数执行完毕后，事物的close方法会将其改为false

- 异步情况

  首先，setState 本身会将数据添加到更新队列中，每次 set 都会触发一次入列行为，此时的行为是同步的
  然后，将队列中的数据统一 render（更新数据），这个过程是异步的

- 同步情况：

  在 setTimeout 等异步或者 DOM 原生事件情况发生时，isBatchingUpdates 已经处于 false 状态，所以更新是同步的

# hooks

函数式组件和类组件的区别：
函数组件会捕获 render 内部的状态
----这是两类组件最大的不同
class 会根据 this 的转变而改变 props 的值，而子组件获取到的则是改变后的 props 的值，而函数式组件则会捕获这一状态

## hook

api：
https://react.docschina.org/docs/hooks-overview.html

useEffect：

```
useEffect(() => {
  //挂载阶段执行
  ...

  //卸载阶段执行
  return() => {

  }
},[])
```

## hooks 原理

hooks 的正常运作在底层依赖于顺序链表，即其本质是一个链表

hooks 调用链路（以 useState 为例）：

（首次渲染）
useState ->通过 resolveDispatcher 获取 dispatcher -> 调用 dispatcher.useState -> **调用 mountState** -> 返回目标数组（如[state,setState]）
（二次渲染）
useState ->通过 resolveDispatcher 获取 dispatcher -> 调用 dispatcher.useState -> **调用 uodateState -> 调用 updateReducer** -> 返回目标数组（如[state,setState]）\*\*\*\*

mountState:用来初始化 hooks， 构建链表并渲染（首次渲染）
updateState：按顺序遍历之前构建好的链表，取出对应的数据信息进行渲染

hooks 的渲染是通过依次遍历来定位每个 hooks 的内容的

# 虚拟 DOM

- 本质是 js 和 DOM 之间的一个映射缓存
- 在形态上表现为： 一个能够描述 DOM 结构及其属性信息的 js 对象

挂载阶段： React 结合 JSX 的描述，构建出虚拟 DOM 树，然后通过 ReactDOM.render 实现虚拟 DOM 到真实 DOM 的映射（触发渲染流水线）

更新阶段： 页面的变化会先作用于虚拟 DOM，虚拟 DOM 将在 JS 层借助算法先对比出具体有那些真实的 DOM 需要被改变，然后再将这些改变用于真实 DOM

## 协调和 diff 算法

调和：UI 以一种理想化的，或者说‘虚拟的’表现形式被保存于内存中，并**通过如 ReactDOM 等类库使之与“真实的”DOM 同步，这一过程被称为协调（调和）**

- react 15 的栈调和
- react 16+ 的 diff

### diff：

设计思想：

- 若两个组件属于同一个类型，它们将拥有相同的 DOM 树形结构
- 处于同一层级的一组子节点，可用通过设置 key 作为唯一标识从而维持各个节点在不同渲染过程中的稳定性

三个要点：

1. Diff 算法性能突破的关键点在于“分层对比”
2. 类型一致的节点才有继续 Diff 的必要性
3. key 属性的设置，可以帮我们竟可能重用同一层级内的节点

React 中的 Transaction 机制：
其本身是一个盒子，首先会将目标函数用 wrapper 封装起来，同时用 Transaction 类暴露的 perform 方法来执行它

# Fiber

目的：实现增量渲染，以达成任务可中断，可恢复，并给任务赋予不同的优先级，，最终达成更加顺滑的用户体验

拆解 ReactDOM.render 调用栈过程

- 初始化阶段）：
  调用 legacCreateRootFromDOMContainer 创建 container.\_reactRootContainer 对象，并赋值给 root -> 将 root 上的\_internalRoot 属性赋值给 fiberRoot -> 将 fiberRoot 与方法入参一起，传入 updateContainer 方法，形成回调 -> 将 updateContainer 回调作为参数传入，调用 unbatchedUpdates

fiberroot：本质是一个 fiber 节点对应的对象类型

fiberRoot 对象（FiberRootNode 实例）经过 current 转换成 rootFiber 对象（FiberNode 实例）

- render 阶段：

  1. workInProgress 节点的创建：current 节点（即 rootFiber）的副本
  2. beginWork 开启 Filber 节点的创建过程：
     - beginWork 的入参是一对用 alternate 链接起来的 workInprogress 和 current 节点。
     - beginWork 的核心逻辑是根据 fiber 节点（workInProgress）的 tag 属性的不同调用不同的节点创建函数
  3. updateHostRoot，进入 rootFiber 节点的处理逻辑
  4. 调用 reconcileChildren，分发当前节点（此处为 rootFiber 节点）的子节点（此处为 app 节点）的创建逻辑
  5. current 不为 null，逻辑因此被分发进 reconcileChildFibers，reconcileChildFibers 是 ChildReconciler（true）的返回值，意味着副作用将被追踪
  6. reconcileChildFibers 将子节点的创建逻辑分发给 reconcileSingleElement，得到 AppFiberNode

  形成一个 workInProgress 树，处理这个数的阶段被称为 completeWork 阶段

- completeWork 阶段：

  过程：

  1. performUnitOfWork 调用 completeUnitOfWork
  2. completeUnitOfWork 调用 completeWork

  completeWork：

  - 工作内容： 负责处理 Fiber 节点到 DOM 节点的映射逻辑
  - 关键动作：
    1. 创建 DOM 节点
    2. 将 DOM 节点插入到 DOM 树中
    3. 为 DOM 节点设置属性
  - 创建好的 DOM 节点会被赋值给 workInProgress 节点的 stateNode 属性
  - 将 DOM 节点插入到 DOM 树的操作是通过 appendAllChildren 函数来完成的：实际上是将子 Fiber 节点所对应的 DOM 节点挂载到其父 Fiber 节点所对应的 DOM 节点里去

  completeUnitOfWork：
  开启收集 EffectList 的“大循环”

  过程：

  1. 针对传入的当前节点，调用 completeWork
  2. 将当前节点的副作用插入到其父节点对应的副作用链中
  3. 以当前节点为起点，循环遍历其兄弟节点及其父节点

  这里需要注意的是，在这个过程中，completeUnitOfWork 处理父节点是直接让其进入下一次循环，而处理兄弟节点则是遍历，而且是先处理兄弟节点后处理父节点，也就是说 completeWork 的执行是严格自底向上的

workInProgress 副作用链（effectList）

设计目的：
把所有需要更新的 Fiber 节点单独串成一串链表，方便后续有针对性的对他们进行更新

实现：

- 判断 FiberNode 的 flags 属性是否大于 PerformedWork，是的话就进入 effectList 的创建逻辑
- 创建 effectList，并不是为当前 Fiber 节点创建，而是为它的父节点创建，App 节点的父节点是 rootFiber，rootFiber 的 effectList 此时为空
- rootFiber 的 firstEffect 和 lastEffect 指针都会指向 App 节点，App 节点由此称为 effectList 中的唯一一个 FiberNode

current 树和 workInProgress

# redux

三要素：

- Store： 单一数据源，只读的
- Action： 动作，对变化的描述
- Reducer： 负责对变化进行分发和处理，最终将新的数据返回给 Store

主要流程（在 createStore 文件中）：

1. 调用 createStore
2. 处理没有传入初始状态（前两个入参都为 function）的情况
3. 若 enhancer 不为空，则用 enhancer 包装 createStore
4. 定义内部变量
5. 定义 ensureCanMutateNextListeners 方法，该方法确保 currentListeners 与 nextListeners 不指向同一个引用
6. 定义 getState 方法，该方法用户获取当前的状态
7. 定义 subscribe 方法，该方法用户注册 listeners（订阅监听函数 ）
8. 定义 dispatch 方法，该方法用于派发 action，调用 reducer 并触发订阅
9. 定义 replaceReducer 方法，该方法用于替换 reducer
10. 执行一次 dispatch，完成状态的初始化
11. 定义 observeable 方法（此处可忽略）
12. 将步骤 6~11 中定义的方法放进 store 对象中返回

## dispatch

流程：

1. 调用 dispatch,入参为 action 对象
2. 前置校验
3. “上锁”：isDispatching= true
4. 调用 reducer，计算新的 state
5. “解锁”：isDispatching= false
6. 触发订阅（执行 subscribe 方法）
7. 返回 action

上锁避免套娃式的 dispatch，在 dispatch 中只能用一次 reducer

## subscribe

流程：

1. 调用 subscribe，入参是一个函数
2. 前置校验
3. 调用 ensureCanMutateNextListeners，确保 currentListeners 与 nextListeners 不指向同一个引用
4. 注册监听函数，将入参 listener 函数推入 nextListeners 数组中
5. 放回渠道订阅当前 listeners 的方法（unsubscribe）

currentListeners 与 nextListeners：
被定义时两个数组指向同一应用，
触发，注册，取消监听皆是 nextListeners
currentListeners 为了记录当下正在工作中的 listeners 数组的引用，将它与可能发生改变的 nextListeners 区分开来，以确保监听函数在执行过程中的稳定性

## 中间件

解决 redux 中异步的问题

thunk：
可以允许让我们以函数的形式派发 action

中间件的执行时机

action -> **middleware...(more)** ->dispatch -> reducer -> nextState

为什么可以是个函数？

dispatch 被 applyMiddleware 改写了

中间件的思想： 面向切面编程

# 优化

shouldComponentUpdate： 判断 state 的某个值是否变化，如不变化则不更新想应的组件
PureComponent：shouldComponentUpdate 的浅比较集合
Immutable：弥补 PureComponent 浅比较的不足

react.Memo: 组件化的管控

useMemo： 精细化的管控

# 设计模式

软件设计模式中，有一个非常重要的原则，叫“开放封闭原则”，一个好的模式，应该尽可能的做到对拓展开放，对修改封闭

类组件中有两个解决方法： 高阶组件和 renderProps（更灵活）
不过无论是哪一个设计模式都不是特别灵活，这类设计模式解决不了一些问题，如：

1. 嵌套地狱
2. 较高的学习成本，数据溯源成本
3. props 属性命名冲突问题
4. 。。。。

所以 hooks 应运而生，复用逻辑可以用“自定义 hook”

# react 新版本以及框架学习方法

## react 17

新特性：

- 渐进式升级
  将项目从 react17 升级到 18 19 或更高版本时，可以部分升级
- 新 jsx 转换逻辑：自动引入 React
- 事件系统重构：
  - 事件的中心化管控不会全部依赖 document，管控相关的逻辑被转移到了每个 React 组件自己的 DOM 节点中
  - 放弃事件池，合成时间对象会被放入一个叫“事件池”的地方统一管理，每当事件函数执行完毕后，对应的合成事件对象内部的所有属性都会被置空，意在为下一次复用做准备，这样就有一个问题，事件对象执行完毕后就拿不到事件对象了，需要调用 e.persist()来控制。旧版本中，这样做是为了兼容（防止内存泄漏），现在不需要考虑兼容问题了
- Lane 模型的引入：react16 处理优先级采用的是 expirationTime 模型（用 expirationTime（一个事件长度）来描述任务的优先级），Lane 模型则用的是二进制

## 学习前端框架

官方文档： 仔细阅读官方文档

调用栈： 观察调用栈，看代码运行时都调用哪些函数，可以快速定位源码主流程

了解官方对框架设计，源码分层的相关介绍，如官方团队的博文，或者相关作者的文章
