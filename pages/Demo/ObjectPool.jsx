import React, { useState, useEffect } from 'react';
import Button from 'components/PublicComponents/Button';

// 对象池技术
const ObjectPool = () => {
  // 初始化对象池
  let tooltipFactory = (function () {
    let toolTipPool = [];
    return {
      // 创建对象
      create: function () {
        if (!toolTipPool.length) {
          let div = document.createElement('div');
          document.body.appendChild(div);
          return div;
        } else {
          return toolTipPool.pop();
        }
      },

      // 回收对象
      recover: function (tooltipDom) {
        return toolTipPool.push(tooltipDom);
      },
    };
  })();

  let divArr = [];
  const searchAndRender = () => {
    for (let i = 0; i < divArr.length; i++) {
      tooltipFactory.recover(divArr[i]);
    }
    let tooltipArr2 = apiResArr || [];
    for (let i = 0; i < tooltipArr2.length; i++) {
      let tooltipDiv = tooltipFactory.create();
      tooltipDiv.innerHTML = tooltipArr[i];
      divArr.push(tooltipDiv);
    }
  };

  return <div></div>;
};
export default ObjectPool;
