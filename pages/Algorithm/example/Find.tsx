import React, { useState } from 'react';
import { Queue, Stack, LinkedList } from "../pubic"; //  数据结构实现
import {ST, SequentialSearchST } from '../modal/find/find'
import { BST } from '../modal/find/BST'
const Find: React.FC = () => {
  const data = 'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair'

  let demo1 = data.replace(',', '').split(' ')

  const frequencyCounter = (args: any[]) => {
    let sst = new SequentialSearchST;
    sst.put(1,'3433')
    sst.put(2,'1')
    sst.put(3,'1')
    sst.put(4,'3')
    console.log(sst.length);
    
    sst.delete(1)
    console.log(sst);
    console.log(sst.get(4));
    
  }

  const bst = () => {
    let bst = new BST

    bst.put({key:1,value:2})
    bst.put({key:2,value:2})
    bst.put({key:3,value:2})
    bst.put({key:4,value:2})
    bst.put({key:5,value:2})
    console.log(bst);
    // bst.delete(2)
    // console.log(bst);
    
   console.log( bst.keys(2,4));
   

  } 
  // frequencyCounter(demo1)
  bst()
  return (
    <div>

    </div>
  )
}
export default Find;