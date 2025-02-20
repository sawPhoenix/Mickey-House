## ESModule 特性

- 自动采用严格模式，忽略‘use strict’
- 每个 ESM 模块都是单独的私有作用域
- ESM 是通过 CORS 去请求外部 JS 模块的
- ESM 的 script 标签会延迟执行脚本

## ESM 与 CommonJS 的区别

- ESM 是静态的，CommonJS 是动态的
- ESM 是运行时加载，CommonJS 是编译时加载
- ESM 是编译时输出接口，CommonJS 是运行时输出接口
- ESM 是运行时绑定，CommonJS 是编译时绑定
- ESM 是异步加载，CommonJS 是同步加载
- ESM 是对象，CommonJS 是函数
- ESM 是静态分析，CommonJS 是动态分析
- ESM 是静态优化，CommonJS 是动态优化

## webpack 构建流程

- 初始化参数
- 开始编译
- 确定入口
- 编译模块
- 完成模块编译
- 输出资源
- 输出完成

## babel 编译原理

- 词法分析 @babel/tokenizer 生成 tokens

```js
var a = 1;
```

- 解析 @babel/parser 生成 AST
- 转换 @babel/traverse 遍历 AST
- 生成 @babel/generator 生成新的 AST
