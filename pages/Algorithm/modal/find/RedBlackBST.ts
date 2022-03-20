import { Queue } from "pages/Algorithm/pubic";

/**
 * 红黑树查找
 */
type NodeValueProps = { key: any, value?: any, color: boolean } | null
type TreeNodeProps = { value?: NodeValueProps; count: number; left: TreeNodeProps; right: TreeNodeProps; color: boolean } | null

const RED = true;
const BLACK = false
/**
 * 生命Symbol
 */
const PUT_RECUSIVE = Symbol('BST#recursivePut');
const GET_RECUSIVE = Symbol('BST#recursiveGet');
const DEL_RECUSIVE = Symbol('BST#recursiveDel');

export class RedBlackBST {
  Node: (value: NodeValueProps, color: boolean) => TreeNodeProps
  root: TreeNodeProps;
  count: number;
  color: boolean;// 树颜色， true为红色，false为黑色
  constructor() {
    this.root = null; // 初始化根节点
    this.count = 0; // 节点数量
    this.color = false;// 树颜色， true为红色，false为黑色
    /**
     * 实例化一个 node 节点，在 insert 方法中你会看到
     */
    this.Node = function (value: NodeValueProps, color: boolean): TreeNodeProps {
      return {
        value, // 节点值
        count: 1, // 节点数量，允许节点重复
        left: null, // 左侧子节点
        right: null, // 右侧子节点
        color // 树颜色， true为红色，false为黑色
      }
    }


  }

  /**
   * 判断是否为红树
   * @param node 
   * @returns boolean
   */
  isRed(node: TreeNodeProps) {
    if (node === null) return null;
    return node.color === RED
  }

  /**
   * 坐旋转
   * @param node 
   * @returns 
   */
  rotateLeft(node: TreeNodeProps) {
    let rValue = node?.right;

    if (node && rValue) {
      node.right = rValue.right;
      rValue.left = node;
      rValue.color = node.color;
      node.color = RED;
      rValue.count = node.count;
      node.count++
      return rValue
    }
    return null
  }
  /**
   * 右旋转
   * @param node 
   * @returns 
   */
  rotateRight(node: TreeNodeProps) {
    let lValue = node?.left;

    if (node && lValue) {
      node.left = lValue.right;
      lValue.right = node;
      lValue.color = node.color;
      node.color = RED;
      lValue.count = node.count;
      node.count++
      return lValue
    }
    return null
  }

  flipColors(node: TreeNodeProps) {
    if (node === null || node.left === null || node.right === null) { return null }
    node.color = RED;
    node.left.color = BLACK;
    node.right.color = BLACK;
  }

  /**
   * 添加逻辑
   * @param value 
   */
  put(value: NodeValueProps) {
    this.root = this[PUT_RECUSIVE](this.root, value)

  }
  [PUT_RECUSIVE](node: TreeNodeProps, value: NodeValueProps) {
    // console.log("val", value);

    // {1} 如果当前节点为空，创建一个新节点（递归到底）
    if (node === null) {
      this.count++; // 节点数加 1
      return this.Node(value, RED);
    }

    // {2} 节点数不变，说明要更新的值等于红黑树中的某个节点值
    if (value?.key === node.value?.key) {
      node.count++; // 节点数加 1
    } else if (value?.key < node.value?.key) { // {3} 新插入子节点在红黑树左边，继续递归插入
      node.left = this[PUT_RECUSIVE](node.left, value);
    } else if (value?.key > node.value?.key) { // {4} 新插入子节点在红黑树右边，继续递归插入
      node.right = this[PUT_RECUSIVE](node.right, value);
    }

    if (this.isRed(node.right) && !this.isRed(node.left)) { //将含有红色右链接的3-节点（或临时的4-节点）向左旋转
      node = this.rotateLeft(node)
    } else if (this.isRed(node.right) && this.isRed(node.left?.left || null)) { //将临时的4-节点中两条连续红链接中的上层链接向右旋转
      node = this.rotateRight(node)
    } if (this.isRed(node?.left || null) && this.isRed(node?.right || null)) { //将颜色转换并将红链接在树中向上传递
      this.flipColors(node)
    }
    return node;
  }

  /**
   * 获取当前值所在的位置
   * @param value 
   * @returns 
   */

  get(key: number) {
    return this[GET_RECUSIVE](this.root, key)
  }
  [GET_RECUSIVE](node: TreeNodeProps, key: number): TreeNodeProps {
    if (node === null) {// {1} 节点为 null
      return null
    } else if (key === node.value?.key) {// {2} 找到节点
      return node
    } else if (key < node.value?.key) {// {3} 从左侧节点搜索
      return this[GET_RECUSIVE](node.left, key)
    } else { // {4} 从右侧节点搜索
      return this[GET_RECUSIVE](node.left, key)
    }
  }


  /**
   * 获取最小值
   * @returns 
   */
  min() {
    let res = this.minNode(this.root)
    return res !== null ? res.value : null
  }

  minNode(node: TreeNodeProps): TreeNodeProps {
    if (node === null) {
      return node
    }
    return this.minNode(node.left)
  }


  /**
  * 获取最大值
  * @returns 
  */
  max() {
    let node = this.root;
    if (node === null) {
      return node
    }

    while (node && node.right !== null) {
      node = node.right;
    }
    return node.value
  }


  /**
   * 删除节点
   * @param key 
   */
  delete(key: number) {
    this.root = this[DEL_RECUSIVE](this.root, key)
  }
  [DEL_RECUSIVE](node: TreeNodeProps, key: number): TreeNodeProps {
    if (node === null) return null; //{1} 未查找到直接返回 null


    if (key < node.value?.key) { // {2} 左侧节点递归删除
      node.left = this[DEL_RECUSIVE](node.left, key)
      return node;
    } else if (key > node.value?.key) {  // {3} 右侧节点递归删除
      node.right = this[DEL_RECUSIVE](node.right, key);
      return node;
    }

    //当前节点找到后
    //4.1 当前节点即无左侧节点又无右侧节点，直接删除，返回 null
    if (node.left === null && node.right === null) {
      node === null;
      this.count--;
      return node
    }

    // 4.2 若左侧节点为 null，就证明它有右侧节点，将当前节点的引用改为右侧节点的引用，返回更新之后的值,反之亦然
    if (node.left === null) {
      node = node.right;
      this.count--;
      return node;
    }
    if (node.right === null) {
      node = node.left;
      this.count--;
      return node
    }

    //4.3 若左右节点都不为空
    if (node.left !== null && node.right !== null) {
      console.log(this.minNode(node.right));
      //找到最小节点，复制一个新对象s
      const s = this.minNode(node.right);
      if (s) {
        this.count++;
        s.left = node.left;
        s.right = this[DEL_RECUSIVE](node.right, s?.value?.key); //删除最小节点
      }
      node = null;
      this.count--;
      return s
    }
    return null;
  }


  /**
   * 范围查找
   * @param lo 
   * @param hi 
   * @returns 
   */
  keys(lo: number, hi: number): Queue {
    let queue = new Queue;
    this.findKeys(this.root, queue, lo, hi)
    return queue
  }
  findKeys(node: TreeNodeProps, queue: Queue, lo: number, hi: number) {
    if (node === null) return; //节点为空
    // console.log(node);
    // console.log(node.value?.key);

    if (lo < node.value?.key) {
      this.findKeys(node.left, queue, lo, hi)
    }
    if (lo <= node.value?.key && node.value?.key <= hi) {
      console.log(node);

      queue.add(node.value?.key)

    }
    if (hi > node.value?.key) {
      this.findKeys(node.right, queue, lo, hi)
    }
  }

}