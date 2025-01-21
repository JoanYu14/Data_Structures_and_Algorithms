// m x n 網格上有一個機器人。機器人最初位於左上角（即 grid[0][0]）。機器人嘗試移動到右下角（即 grid[m - 1][n - 1]）。機器人在任何時間點只能向下或向右移動。
// 給定兩個整數 m 和 n，返回機器人到達右下角可能採取的唯一路徑的數量。
// Example :
// Input: m = 3, n = 2
// Output: 3
// Explanation: From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
// 1. Right -> Down -> Down
// 2. Down -> Down -> Right
// 3. Down -> Right -> Down
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  // 1. 建立HashTable => 製作一個m*n的矩陣
  // 使用 map 創建每一行獨立的陣列
  const memo = Array(m)
    .fill(null)
    .map(() => Array(n).fill(undefined));

  // 2. 設定初始值: 機器人初始位置0,0，要走到0,0只有1種路線
  memo[0][0] = 1;

  const getPaths = function (row, col) {
    console.log(`[${row}][${col}]`);
    if (memo[row][col] !== undefined) {
      // memo[row][col]不為undefined代表已經計算過到[row][col]的所有路線了
      console.log(`memo[${row}][${col}]已經知道答案:${memo[row][col]}`);
      return memo[row][col];
    } else if (row === 0 || col === 0) {
      // 因為只能往下或往右，所以如果是最左邊那排或最上面那排的格子一定只能一條路線
      console.log(`memo[${row}][${col}]一定只有一條路線:1`);
      memo[row][col] = 1;
      return memo[row][col];
    } else {
      console.log(
        `memo[${row}][${col}]還沒有計算過，所以要去找memo[${
          row - 1
        }][${col}]與memo[${row}][${col - 1}]相加`
      );
      // 3. 狀態轉移公式 : fn(m-1,n) + fn(m,n-1)
      // 因為只能從[m][n]的上面或左邊才能到達[m][n]
      // => 所以只要[m][n]上面那格([m-1][n])的所有路線 + [m][n]左邊那格([m][n-1])的所有路線 = 到達[m][n]的所有路線
      memo[row][col] = getPaths(row - 1, col) + getPaths(row, col - 1);
      return memo[row][col];
    }
  };

  // 因為memo是從index0開始的，所以要將m,n都-1
  let result = getPaths(m - 1, n - 1);
  let memoResult = ``;
  memo.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      memoResult = memoResult + memo[rowIndex][colIndex] + " | ";
    });
    memoResult = memoResult + "\n";
  });
  console.log(memoResult);
  return result;
};
console.log(uniquePaths((m = 3), (n = 7)));
