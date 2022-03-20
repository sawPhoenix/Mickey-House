/**
 * 模拟Object.is(), Object.is() 与 === 只有 0 和 NaN 的判断有区别，其他情况相等
 * @param {*} a  any
 * @param {*} b
 * @returns
 */
export const myObjectIs = (a, b) => {
  if (a === b) {
    return a !== 0 || 1 / a === 1 / b; // 若a === 0 判断后面的情况，因为-Infinity ！== Infinity
  }
  return a !== a && b !== b; // 判断NaN的情况
};

/**
 * 深拷贝实现
 * @param {*} origin 拷贝对象
 * @returns
 */
export const deepClone = (origin, hashMap = new WeakMap()) => {
  if (origin == undefined || typeof origin !== 'object') {
    return origin;
  }
  if (origin instanceof Date) {
    return new Date(origin);
  }
  if (origin instanceof RegExp) {
    return new RegExp(origin);
  }

  // 用weakMap保存一下相关参数，如果数据存在就不用复制
  const hashkey = hashMap.get(origin);
  if (hashkey) {
    return hashkey;
  }

  const target = new origin.constructor();
  for (let k in origin) {
    if (origin.hasOwnProperty(k)) {
      target[k] = deepClone(origin[k]);
    }
  }
  return target;
};

/**
 * reduce方法实现
 * @param {cb} 返回函数
 * @param {initialValue} 初始值，可不传
 * @returns
 */
export const myReduce = function (cb, initialValue) {
  var _arr = this;
  const _len = _arr.length;
  let _item;
  let value = initialValue || _arr[0];
  const startIndex = initialValue ? 0 : 1;
  for (var i = startIndex; i < _len; i++) {
    _item = _arr[i];
    value = cb(value, _item, i, _arr);
  }
  return value;
};

/**
 * generator(生成器)方法实现
 * @param {arr} 数组
 * @returns
 */
export function generator(arr) {
  let nextIndex = 0;

  return {
    next() {
      return nextIndex > arr.length
        ? {
            value: arr[nextIndex++],
            done: false,
          }
        : { value: undefined, done: true };
    },
  };
}

/**
 * iterator（迭代器）方法实现
 * @returns
 */
export function iterator() {
  let index = 0;
  var _this = this;
  return {
    next() {
      return index > _this.length
        ? {
            value: _this[nextIndex++],
            done: false,
          }
        : { value: undefined, done: true };
    },
  };
}
