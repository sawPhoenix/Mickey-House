
type Key = any

export class ST {
  put(arr: any, key: Key, val: any) {
    arr[key] = val
  }
  get(key: Key) {

  }
  contains(key: Key) {
    return this.get(key) !== null;
  }
  // isEmpty(){
  //  return this.size(lo,hi) === 0
  // }
  deleteMin() {

  }
  delete(arr: any, key: Key) {
    return this.put(arr, key, null)
  }
  deleteMax() { }
  size(lo: Key, hi: Key): number {
    if (hi < lo) return 0;
    else if (this.contains(hi)) return this.rank(hi) - this.rank(lo) + 1;
    else return this.rank(hi) - this.rank(lo);
  }
  min() { }
  max() { }
  floor(key: Key) { }
  ceiling(key: Key) { }
  rank(key: Key) {
    return key
  }
  select(lo: Key, hi: Key) { }
}


class Node {

  key: any;
  value: any;
  next: any;
  constructor(key: Key, value: any, next: any) {
    this.key = key;
    this.value = value;
    this.next = next
  }
}

export class SequentialSearchST {

  length: number;
  first: any;
  constructor() {
    this.first = new Node(null, null, null)
    this.length = 0
  }
  get(key: Key) {
    for (let x = this.first; x !== null; x = x.next) {
      if (key === x.key) {
        return x.value
      }
      return null
    }
  }
  put(key: Key, value: any) {
    for (let x = this.first; x !== null; x = x.next) {


      ++this.length;
      console.log(key, x.key, value);

      if (key === x.key) {
        console.log(123);

        x.value = value;
        return
      }
      console.log(value);

      this.first = new Node(key, value, this.first)
      return
    }
  }
  delete(key: Key) {
    for (let x = this.first; x !== null; x = x.next) {

      if (key === x.key) {
        x.value = null;
        this.length--;
      }
    }
  }
}

/**
 * 二分法链表查找
 */
export class BinarySearchST {
  N: number;
  keys: any[];
  values: any[];
  constructor(parameters: any) {
    this.keys = []
    this.values = []
    this.N = 0
  }
  size() {
    return this.N
  }
  isEmpty() {
    return this.N === 0
  }
  get(key: Key) {
    if (this.isEmpty()) {
      return null
    }
    let i = this.rank(key)
    if (i < this.N && this.keys[i] === key) {
      return this.values[i]
    } else {
      return null
    }
  }
  put(key: Key, value: any) {
    let i = this.rank(key)
    if (i < this.N && this.keys[i] === key) {
      this.values[i] = value
      return
    }
    for (let j = this.N; j > i; j--) {
      this.keys[j] = this.keys[j - 1]
      this.values[j] = this.values[j - 1]
    }
    this.keys[i] = key;
    this.values[i] = value;
    this.N++
  }
  rank(key: Key) {
    let lo = 0, hi = this.N - 1;
    while (lo <= hi) {
      let mid = lo + (hi - lo) / 2;
      let cmp = key - this.keys[mid];
      if (cmp < 0) {
        hi = mid - 1
      } else if (cmp > 0) {
        lo = mid + 1
      } else {
        return mid
      }
    }
    return lo
  }
  min() {
    return this.keys[0]
  }
  max() {
    return this.keys[this.N - 1]
  }
  ceiling(key: Key) {
    let i = this.rank(key)
    return this.keys[i]
  }
  floor(key: Key) {
    let i = this.rank(key)
    return this.keys[i]
  }
  delete(key: Key) {
    let i = this.rank(key)
    this.keys[i] = null;
    this.values[i] = null;
    for (let j = this.N - 1; j > i; j--) {
      this.keys[j] = this.keys[j - 1]
      this.values[j] = this.values[j - 1]
    }
    this.N = this.N - 1
  }

}
