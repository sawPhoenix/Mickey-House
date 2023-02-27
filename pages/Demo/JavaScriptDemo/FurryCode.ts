import React from "react";

export function getTop3Dom() {
  /**
   *  获取元素 ------------------------------------
   *  两种方法
   */
  // 1

  //   const elements = Array.from(document.querySelectorAll("*"));
  //   const count: { [x: string]: number } = {};
  //   for (const el of elements) {
  //     const tag = el.tagName;
  //     count[tag] = (count[tag] || 0) + 1;
  //   }

  // 2
  let html = document.querySelector("html");
  const count: { [x: string]: number } = {};

  function scan(parent: any) {
    const tag = parent.tagName;
    count[tag] = (count[tag] || 0) + 1;
    for (const el of parent.children) {
      scan(el);
    }
  }
  scan(html);

  /**
   *  获取元素  ------------------------------------
   */

  const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);
  const top3 = sorted.slice(0, 3);
  return top3.map((i) => i[0]);
}

/**
 *   reverse子元素
 */
function reverseChildren(ele: Element) {
  /*
  // 1. 简单的操作
  let children = Array.prototype.slice.call(ele.childNodes);
  for (let child of children) {
    ele.removeChild(child);
  }
  children.reverse();
  for (let child of children) {
    ele.appendChild(child);
  }

  /*
  // 2.直接从最后一个元素往前append，替换
  let l = ele.childNodes.length;
  while (l-- > 0) {
    ele.appendChild(ele.childNodes[l]);
  }
 */
  /*
    3. range api 控制
   *  以上操作要操作3次dom，对dom进行3次重排（拿节点，翻转节点，放回去）
   * range 的fragment翻转节点不需要重排，减少一次dom操作
 */
  let range = new Range();
  range.selectNodeContents(ele);
  let fragment = range.extractContents();
  let l = fragment.childNodes.length;
  while (l-- > 0) {
    fragment.appendChild(fragment.childNodes[l]);
  }
  ele.appendChild(fragment);
}
