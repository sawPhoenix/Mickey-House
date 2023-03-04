export class Sorted<T> {
  data: T[];
  compare: Function;
  constructor(data: T[], compare?: Function) {
    this.data = data.slice();
    this.compare = compare || ((a: number, b: number) => a - b);
  }
  take() {
    if (!this.data.length) return;
    let min = this.data[0];
    let minIndex = 0;

    //查找最小元素
    for (let i = 1; i < this.data.length; i++) {
      if (this.compare(this.data[i], min) < 0) {
        min = this.data[i];
        minIndex = i;
      }
    }

    // 删除  O（1） 的写操作
    this.data[minIndex] = this.data[this.data.length - 1];
    this.data.pop();
    return min;
  }
  give(v: T) {
    this.data.push(v);
  }
}

//TODO: 二插堆实现
export class BinaryHeap<T> {
  data: T[];
  compare: Function;
  constructor(data: T[], compare: Function) {
    this.data = data;
    this.compare = compare;
  }
  take() {
    if (!this.data.length) return;
    let min = this.data[0];
    let i = 0;
    const leftNodeidx = i * 2 + 1,
      rightNodeidx = i * 2 + 2;
    // fix heap
    while (i < this.compare.length) {
      if (leftNodeidx >= this.data.length) {
        break;
      }
      if (rightNodeidx >= this.data.length) {
        this.data[i] = this.data[leftNodeidx];
        i = leftNodeidx;
        break;
      }
      if (this.compare(this.data[leftNodeidx], this.data[rightNodeidx]) < 0) {
        this.data[i] = this.data[leftNodeidx];
        i = leftNodeidx;
      } else {
        this.data[i] = this.data[rightNodeidx];
        i = rightNodeidx;
      }
    }

    // 删除  O（1） 的写操作
    if (i < this.data.length - 1) {
      this.insertAt(i, this.data.pop());
    }
    return min;
  }
  insertAt(i: number, v?: T) {
    if (v) {
      this.data[i] = v;
      while (i > 0 && this.compare(v, this.data[Math.floor((i - 1) / 2)]) < 0) {
        this.data[i] = this.data[Math.floor((i - 1) / 2)];
        this.data[Math.floor((i - 1) / 2)] = v;
        i = Math.floor((i - 1) / 2);
      }
    }
  }
  insert(v: T) {
    this.insertAt(this.data.length, v);
  }
  give(v: T) {
    this.data.push(v);
  }
  get length() {
    return this.data.length;
  }
}
