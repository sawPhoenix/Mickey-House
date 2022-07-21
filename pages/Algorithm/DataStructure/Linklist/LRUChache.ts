export class LRUCache {
  cache: Map<number, number | undefined>;
  max: number;
  constructor(capacity: number) {
    this.cache = new Map();
    this.max = capacity;
  }

  get(key: number) {
    if (this.cache.has(key)) {
      let tmp = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, tmp);
      return tmp;
    }
    return -1;
  }
  put(key: number, value: number) {
    if (this.cache.has(key)) {
      // 存在，替换
      this.cache.delete(key);
    } else if (this.cache.size >= this.max) {
      // 不存在，新增：要有淘汰机制
      this.cache.delete(this.cache.keys().next().value);
    }

    this.cache.set(key, value);
  }
}
