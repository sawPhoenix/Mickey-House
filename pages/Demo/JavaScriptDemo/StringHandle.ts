/**
 * 连续字符串，如果是连续数字，就用~隔开，如不连续就用,隔开
 *
 * @param val
 * @returns
 */

// 第一种
export const getContinuousNumber1 = (str: string) => {
  const arr = str.split(",").map((i) => +i);
  const result: string[] = [];
  let tmp = arr[0];
  arr.forEach((item, index, self) => {
    if (item + 1 !== self[index + 1]) {
      console.log("tmp", tmp);
      console.log("item", item);

      if (tmp !== item) {
        result.push(`${tmp}~${item}`);
      } else {
        result.push(item + "");
      }
      tmp = self[index + 1];
    }
  });
  console.log(result);

  return result.join();
};
// 第二种
export function getContinuousNumber2(str: string) {
  const arr = str.split(",").map((i) => i);
  const target = arr.reduce((pre, cur, idx, self) => {
    if (idx > 0) {
      if (Number(cur) - 1 + "" === self[idx - 1]) {
        return `${pre}~${cur}`;
      } else {
        return `${pre},${cur}`;
      }
    } else {
      return cur;
    }
  });

  return target
    .split(",")
    .map((item) => {
      const reg = /(\d{1,})(~\d{1,})*(~\d{1,})/;
      return item.replace(reg, "$1$3");
    })
    .join();
}
