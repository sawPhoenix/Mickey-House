# 基础

## 回溯算法

1. 需要全部答案的路径

let list = []
function backtrack(list, 临时路径, 输入) {

    结束条件:
        临时路径。 新增一个路径

    循环 {
        选择一个数据    (选择其他数据)
        递归  backtrack(list, 临时路径, 输入)
        撤回选择的数据
    }

}

backtrack(list, 临时路径, 输入)

return list 2. 不需要全部路径, 只需要一个 boolean

## 贪心算法

每一步都选择当前最优解， 跟之前的选择没有关系

- 找钱为例
  找零钱（最少的张数）

- 100，50，20，10，5，1
- 每次都可以按照这个当前能找的最大值，最终能够得出全局最后解（没有反例）

## 动态规划

    求极值
    每一步的状态都是前一步推导而来
    走迷宫 每一步都有钱


    dp[i] 中间值的推导
    确定推导的公式
    确定初始化和遍历顺序

    Vue 中的虚拟dom diff 最长递增子序列

# 刷题

## 数据结构

1. 链表

```js
// 遍历
while (head) {
  head = head.next;
}
return head;

let dummny = {
  next: head,
};
return dummny.next;
```

1. 数组

```js
for (let i = 0; i < arr.length; i++) {
    ...
}

```

3. 树 最重要！！！

```js
function walk(treeNode) {
  //终止条件

  // 前序遍历
  处理treeNode;
  walk(treeNode.left);
  walk(treeNode.left);
  // 中序遍历
  walk(treeNode.left);
  处理treeNode;
  walk(treeNode.left);
  // 后序遍历
  walk(treeNode.left);
  walk(treeNode.left);
  处理treeNode;
}
```

## 算法思想

1. 二分
2. 双指针（快慢指针，头尾指针）
   1. 链表，数组

```js
let fast = head
let slow = head
while (fast && fast.next) {
    ...code
}
let
```

3. 递归和回溯（画递归树）

```js
function backtrack(数据,路径缓存) {
    for(...) {
        标记
        backtrack(数据,路径缓存)
        取消标记
    }
}
```

4. 动态规划
   想清楚，结果是怎么推导出来的
   例(找零钱，[1,3,5],11)：
   dp[11] 11 块钱这个值得找零的最优解
   (dp[10],dp[9], dp[6]) 这三个的最优解 + 1

5. 贪心
6. bfs（宽度优先） dfs（回溯，广度优先）

## 题型

1. 盛水
2. 炒股
3. 打劫
   ....
