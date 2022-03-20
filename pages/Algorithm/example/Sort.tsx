import React, { useState } from 'react';
import Button from '../../../components/PublicComponents/Button';
// import Button from '/components/PublicComponents/Button';
import { Queue, Stack, LinkedList } from "../pubic"; //  数据结构实现
import sort from "../modal/sort";
import moment from 'moment';

const Duration = (fun: Function | [], a: number[]) => {
  // console.log(arr);

  let timer = moment.now();
  if (typeof fun === 'function') {
    fun(a)
  } else {
    a.sort((a, b) => a - b)
  }
  let now = moment.now()
  return moment.duration(now - timer).milliseconds()
}
const Sort: React.FC = () => {
  let Sort = new sort
  /**
   * 选择排序
   * @param arr 
   * @returns 
   */
  const Selection = (a: any[]) => {
    let min = 0;
    let arr = [...a]
    for (let i = 0; i < arr.length; i++) {
      min = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[min]) {
          min = j
        }

      }
      Sort.exch(arr, i, min)
    }
    return arr
  }
  // console.log(Selection([2, 1, 8, 4, 6, 3, 5, 7]));

  /**
   * 插入排序
   * @param arr 
   * @returns 
   */
  const InsertionSort = (a: any[]) => {
    let arr = [...a]
    for (let i = 1; i < arr.length; i++) {
      for (let j = i; j > 0 && Sort.less(arr[j], arr[j - 1]); j--) {
        Sort.exch(arr, j, j - 1)
      }
    }
    return arr
  }

  /**
   * 希尔排序
   * @param arr 
   * @returns 
   */
  const Shell = (a: any[]) => {
    let arr = [...a]
    let h = 1;
    while (h < arr.length / 3) {
      h = 3 * h + 1
    }

    while (h >= 1) {
      //将数组变为h有序
      for (let i = 1; i < arr.length; i++) {

        //将a[i]插入到a[i-h],a[i-2*h],a[i-3*h]...之中
        for (let j = i; j >= h && Sort.less(arr[j], arr[j - h]); j -= h) {
          Sort.exch(arr, j, j - h)
        }

      }
      h = h / 3
    }
    return arr
  }

  /**
   * 并归排序
   * @param T 
   */

  const merge = (a: any[], lo: number, mid: number, hi: number) => {
    let i = lo, j = mid + 1;
    let aux = []
    for (let k = lo; k <= hi; k++) {
      aux[k] = a[k]
    }
    for (let k = lo; k <= hi; k++) {
      if (i > mid) {
        a[k] = aux[j++]
      } else if (j > hi) {
        a[k] = aux[i++]
      } else if (Sort.less(aux[j], aux[i])) {
        a[k] = aux[j++]
      } else {
        a[k] = aux[i++]
      }
    }

    return a
  }

  //自上而下
  const mergeT = (a: any[]) => {
    let N = a.length;

    const sort = (lo: number, hi: number) => {
      if (hi <= lo) return;

      let mid = Math.floor(lo + (hi - lo) / 2);
      console.log(mid);
      sort(lo, mid);
      sort(mid + 1, hi);
      merge(a, lo, mid, hi)

    }
    sort(0, N - 1)
    return a
  }

  // console.log(mergeT([8,5,9,6,4,7,2,3,1]));

  //自下而上
  const mergeBU = (a: any[]) => {
    let N = a.length;
    for (let sz = 1; sz < N; sz = sz + sz) {
      for (let lo = 0; lo < N - sz; lo += sz + sz) {
        merge(a, lo, lo + sz - 1, Math.min(lo + sz + sz - 1, N - 1))
      }
    }

    return a
  }

  // console.log(mergeBU([8, 5, 9, 6, 4, 7, 2, 3, 1]));


  /**
   * 快速排序
   * @param T 
   */

  const Quick = (arr: any[]) => {

    // 切分
    const partition = (a: any[], lo: number, hi: number): number => {
      let i = lo, j = hi + 1, v = a[lo];
      while (true) {
        while (Sort.less(a[++i], v)) {
          if (i === hi) {
            break
          }
        }
        while (Sort.less(v, a[--j])) {
          if (i === lo) {
            break
          }
        }
        if (i >= j) break
        Sort.exch(a, i, j)
      }

      Sort.exch(a, lo, j)

      return j
    }
    const qsort = (a: any[], lo: number, hi: number) => {
      if (hi <= lo) {
        return
      }
      let j = partition(a, lo, hi)
      qsort(a, lo, j - 1)
      qsort(a, j + 1, hi)
    }
    qsort(arr, 0, arr.length - 1)
    return arr

  }

  const Quick3way = (arr: any[]) => {
    const sort = (a: any[], lo: number, hi: number) => {
      if (hi <= lo) return;
      let lt = lo, i = lo + 1, gt = hi, v = a[lo];
      while (i <= gt) {
        let cmp = Sort.compareTo(a[i], v)
        if (cmp < 0) {
          Sort.exch(a, lt++, i++)
        } else if (cmp > 0) {
          Sort.exch(a, i, gt--)
        } else {
          i++
        }
      }
      sort(arr, lo, lt - 1);
      sort(a, gt + 1, hi)
    }
    sort(arr, 0, arr.length - 1)
    return arr
  }

  const compare = (T: number) => {
    let arr = []
    for (let i = 0; i < T; i++) {
      arr.push(Math.floor(Math.random() * T) + 1)
    }

    // let res = Duration(Selection, arr)
    // console.log(res);

    // let res2 = Duration(InsertionSort, arr)
    // console.log(res2);

    // // console.log(arr);

    // let res3 = Duration(Shell, arr)
    // console.log(res3);
    // console.log(Shell(arr));

    // let res4 = Duration(Quick, arr)
    // console.log(res4);
    // console.log(Quick(arr));
    let res5 = Duration(Quick3way, arr)
    console.log(res5);
    console.log(Quick3way(arr));
  }




  /**
   * 练习
   */

  // 1。找出数组中第k小的元素
  const partition = (a: any[], lo: number, hi: number): number => {
    let i = lo, j = hi + 1, v = a[lo];
    while (true) {
      while (Sort.less(a[++i], v)) {
        if (i === hi) {
          break
        }
      }
      while (Sort.less(v, a[--j])) {
        if (i === lo) {
          break
        }
      }
      if (i >= j) break
      Sort.exch(a, i, j)
    }

    Sort.exch(a, lo, j)

    return j
  }
  const selectLess = (a:any[],k:number) => {
    let lo = 0, hi = a.length - 1;
    while (hi > lo) {
      let j = partition(a,lo,hi)
      if (j === k) {
        return a[k]
      } else if (j > k) {
        hi = j - 1
      } else if (j < k) {
        lo =  j + 1
      }
    }
  }

  return (
    <div>
      <Button onClick={() => { compare(50000) }}> 时间测试</Button>
    </div>
  )
}
export default Sort;