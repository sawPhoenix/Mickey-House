
import React, { useState } from 'react';
import Button from '../../../components/PublicComponents/Button';
// import Button from '/components/PublicComponents/Button';
import { Queue, Stack, LinkedList } from "../pubic"; //  数据结构实现
import sort from "../modal/sort";
import moment from 'moment';


/**
 * API
 */
let PQSort = new sort
const less = (pq: any[], i: number, j: number): boolean => {
  return PQSort.compareTo(pq[i], pq[j]) < 0
}
const exch = (pq: any[], i: number, j: number): void => {
  let t = pq[i];
  pq[i] = pq[j];
  pq[j] = t;
}
const swim = (pq: any[], k: number): void => {
  while (k < 1 && less(pq, k / 2, k)) {
    exch(pq, k / 2, k)
    k = k / 2
  }
}
const sink = (pq: any[], k: number, N: number): void => {

  while (2 * k <= N) {
    let j = 2 * k
    if (j < N && less(pq, j, j + 1)) j++;
    if (!less(pq, k, j)) break;
    exch(pq, k, j)
    k = j
  }
  // console.log(pq);

}

const MaxPQ = () => {

  const insert = (pq: [], v: any) => {
    let N = pq.length;
    //@ts-ignore
    pq[++N] = v;
    swim(pq, N)
  }

  const delMax = (pq: []) => {
    let N = pq.length;
    //@ts-ignore
    let max = pq[1];
    exch(pq, 1, N--)
    //@ts-ignore
    pq[N + 1] = null;
    // sink(pq,1)
    return max
  }

}
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


  const heapSort = (a: any[]) => {
    a = [0,...a]
    let N = a.length - 1;
    for (let k = N / 2; k >= 1; k--) {
      sink(a, k, N)

    }
    while (N > 1) {
      exch(a, 1, N--)
      
      sink(a, 1, N)
    }
    a.shift()
    return a
  }
  console.log(heapSort([9, 6, 4, 3, 7, 2, 7, 8]));

  const compare = (T: number) => {
    let arr = []
    for (let i = 0; i < T; i++) {
      arr.push(Math.floor(Math.random() * T) + 1)
    }
  }

  return (
    <div>
      <Button onClick={() => { compare(50000) }}> 时间测试</Button>
    </div>
  )
}



export default Sort;