/**
 * @param {number} n
 * @return {number}
 */

// memo儲存fib的結果，防止重複計算相同的問題
memo = { 0: 0, 1: 1 };

const fib = function (n) {
  console.log(`------------------ fib(${n}) -------------------`);
  // 如果memo[n]不為undefined的話代表fib(n)是已經計算過的，直接return memo[n]就好
  if (memo[n] !== undefined) {
    console.log(`memo中已經有fib(${n})的答案:${memo[n]}`);
    return memo[n];
  } else {
    // 用num1與num2分別儲存fib(n-1)與fib(n-2)的結果
    let num1 = fib(n - 1);
    let num2 = fib(n - 2);
    // 如果memo中沒有n-1, n-2的話就將結果記錄下來
    if (memo[n - 1] == undefined) {
      console.log(`memo中沒有n-1:${n - 1}的答案:${num1}`);
      memo[n - 1] = num1;
    }
    if (memo[n - 2] == undefined) {
      console.log(`memo中沒有n-2:${n - 2}的答案:${num2}`);
      memo[n - 2] = num2;
    }
    // 最後return num1+num2
    return num1 + num2;
  }
};

console.log(fib(13));
