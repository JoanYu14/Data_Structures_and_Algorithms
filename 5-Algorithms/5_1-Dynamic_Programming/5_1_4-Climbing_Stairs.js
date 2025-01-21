// 你正在爬樓梯。需要n步才能到達頂部。
// 每次您可以爬 1 或 2 級台階。您可以透過多少種不同的方式登上頂峰？

// Example 1:
// Input: n = 2
// Output: 2
// Explanation: There are two ways to climb to the top.
// 1. 1 step + 1 step
// 2. 2 steps

// Example 2:
// Input: n = 3
// Output: 3
// Explanation: There are three ways to climb to the top.
// 1. 1 step + 1 step + 1 step
// 2. 1 step + 2 steps
// 3. 2 steps + 1 step
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  const memo = { 1: 1, 2: 2 };
  const getAns = function (floor) {
    if (memo[floor] !== undefined) {
      return memo[floor];
    } else {
      // 因為一次只能走1接或2階，所以要到達floor一定是從前一階(floor-1)或前兩階(floor-2)來的
      // 將floor-1的所有組合+1就是從floor-1到floor的走法
      // 將floor-2的所有組合+2就是從floor-1到floor的走法
      // 所以將以上全部加起來就是走到floor的所有走法#
      memo[floor] = getAns(floor - 1) + getAns(floor - 2);
      return memo[floor];
    }
  };
  return getAns(n);
};

console.log(climbStairs(3));
