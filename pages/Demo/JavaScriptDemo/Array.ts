/**
 *  数组中N个连续元素的最大和
 * 例：
 * getMaxSum（[2,5,3,4,6], 2） => 10
 * getMaxSum（[2,3,3,4,6], 3） => 13
 */

/**
 *  1: 截取数组求和
 */
function arrSum(arr: number[]): number {
  return arr.reduce((pre, cur) => pre + cur);
}
function getMaxSum(arr: number[], n: number) {
  let left = 0;
  let right = left + n;
  let max = arrSum(arr.slice(left, right));
  while (right <= arr.length) {
    const curSum = arrSum(arr.slice(left, right));
    max = Math.max(curSum, max);

    left++;
    right++;
  }
  return max;
}
/**
 * 2: 递推
 */
function getMaxSum2(arr: number[], n: number) {
  let max = 0;

  for (let i = 0; i < n; i++) {
    max += arr[i];
  }
  let preSum = max;

  for (let i = 0; i < arr.length; i++) {
    const curSum = preSum - arr[i - 1] + arr[i - 1 + n];
    max = Math.max(curSum, max);
    preSum = curSum;
  }

  return max;
}
export default {};
