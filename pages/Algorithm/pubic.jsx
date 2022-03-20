// 队列实现 


export class Queue {

  constructor(items) {
    this.items = items || []
  }

  add(element) {
    this.items.push(element)
  }

  delete() {
    return this.items.shift()
  }

  front() {
    return this.items[0]
  }

  clear() {
    this.items = []
  }

  get size() {
    return this.items.length
  }

  get isEmpty() {
    return !this.items.length
  }

  print() {
    console.log(this.items.toString())
  }
}

// 栈实现
export class Stack {
  constructor() {
    this.items = []
  }
  push(ele) {
    this.items.push(ele)
  }
  pop() {
    return this.items.pop()
  }
  get peek() {
    return this.items[this.items.length -1]
  }
  get isEmpty() {
    return !this.items.length
  }
  get size() {
    return this.items.length
  }
  clear() {
    this.items = []
  }
  print() {
    console.log(this.items.toString);
  }
}

// 单向链表节点
class Node {
  constructor(element) {
      this.element = element;
      this.next = null;
  }
}

// 链表
export class LinkedList {
  constructor() {
      this.head = null;
      this.length = 0; // length 同数组 length 与下标关系
  }

  // 追加元素
  append(element) {
      let node = new Node(element);
      let current = null;  // 指针？

      if (this.head === null) {
          this.head = node;
      } else {
          current = this.head;
          while (current.next) {
              current = current.next;
          }
          current.next = node;
      }
      this.length++;
  }

  // 任意位置插入元素
  insert (position, element) {
      if (position >= 0 && position <= this.length) {
          let node = new Node(element);
          let current = this.head;
          let previous = null;
          let index = 0;
          if (position === 0) {
              this.head = node;
          } else {
              while (index++ < position) {
                  previous = current;
                  current = current.next;
              }
              node.next = current;
              previous.next = node;
          }
          this.length++;
          return true
      }
      return false
  }

  // 移除指定位置元素
  removeAt(position) {
      if (position > -1 && position < length) {
          let current = this.head;
          let previous = null;
          let index = 0;
          if (position === 0) {
              this.head = current.next;
          } else {
              while(index++ < position) {
                  previous = current;
                  current = current.next;
              }
              previous.next = current.next;
          }
          this.length--;
          return current.element;
      }
      return null
  }

  // 寻找元素下标
  findIndex(element) {
      let current = this.head;
      let index = -1;
      while (current) {
          if (element === current.element) {
              return index + 1;
          }
          index++;
          current = current.next;
      }

      return -1;
  }

  // 删除指定文档
  remove(element) {
      let index = this.findIndex(element);
      return removeAt(index);
  }

  isEmpty() {
      return !this.length;
  }

  size() {
      return this.length;
  }

  // 输出字符串
  toString() {
      let current = this.head;
      let string = '';
      while (current) {
          string += ` ${current.element}`;
          current = current.next;
      }
      return string;
  }
}
