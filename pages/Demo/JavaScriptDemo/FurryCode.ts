import React from "react";

export function getTop3Dom() {
  /**
   *  获取元素
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

  // 获取元素 end

  const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);
  const top3 = sorted.slice(0, 3);
  return top3.map((i) => i[0]);
}
