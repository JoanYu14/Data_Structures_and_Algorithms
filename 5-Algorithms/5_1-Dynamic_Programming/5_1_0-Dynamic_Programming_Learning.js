// 如果今天我要問公司人數，但我只要一間特定的奇怪公司，這間公司創立在 1970 年，草創時只有 10 個人，而這間公司的老闆有個怪僻，要求每年就是要增加 25% 的人數，並無條件進位至整數，那我想問你在 2024 年的公司總人數有多少。
// 狀態定義:f(年份) = 人數
// 多了兩個資訊，可以稱之為初始值與狀態轉移公式
// 初始值：f(1970) = 10
// 狀態轉移公式：f(x) = ceil( f(x-1) * 1.25 )
/* 把這個計算過程都記錄下來，會變成一張表
年份 1970 1971 1972 ...
人數  10   13   17  ...
*/

let memo = { 1970: 10 };
function empCountUseHashTable(n) {
  if (memo[n] === undefined) {
    let result = Math.ceil(empCountUseHashTable(n - 1) * 1.25);
    memo[n] = result;
    return result;
  } else {
    return memo[n];
  }
}

function empCountUseArray(year) {
  // 想詢問的年度，與 1970 差距 n 年，從1970~year有year-1970年
  let n = year - 1970;
  // 1. 製作有n+1個element的array
  let arr = Array(n + 1).fill(undefined, 0, n + 1);
  // 2. 設定初始值:用 index0代表 1970 年，此時有 10 個人
  arr[0] = 10;
  // 從1(1971年)開始計算員工數
  for (let i = 1; i < arr.length; i++) {
    // arr[i]就為前一年*1.25
    arr[i] = Math.ceil(arr[i - 1] * 1.25); // 3. 狀態轉移公式
  }
  // 用第 n 個位置的值做為答案回傳
  return arr[n];
}

function fib(n) {
  let fibMemo = Array(n).fill(undefined, 0, n + 1); // 初始化
  function getFibAns(n) {
    if (fibMemo[n] !== undefined) {
      return fibMemo[n];
    } else if (n === 0) {
      return 0;
    } else if (n === 1) {
      return 1;
    } else {
      fibMemo[n] = getFibAns(n - 1) + getFibAns(n - 2);
      return fibMemo[n];
    }
  }
  return getFibAns(n);
}

function fibHashTable(n) {
  // 1. 初始化，儲存已經算過的答案與 2.已知的初始值
  let fibMemo = { 0: 0, 1: 1 };
  // 用來計算fibNum
  function getFibAns(n) {
    // 如果要fibMemo[n]為undefined代表還沒計算過
    if (fibMemo[n] !== undefined) {
      return fibMemo[n];
    } else {
      // getFibAns就是getFibAns(n-1)+getFibAns(n-2)，記錄在fibMemo中
      // 3. 狀態轉移公式
      fibMemo[n] = getFibAns(n - 1) + getFibAns(n - 2);
      // 4. 回傳第memo中n.value
      return fibMemo[n];
    }
  }
  return getFibAns(n);
}

console.log(empCountUseHashTable(2024, memo));
console.log(empCountUseArray(2024));
console.log(fib(3));
console.log(fibHashTable(100));
