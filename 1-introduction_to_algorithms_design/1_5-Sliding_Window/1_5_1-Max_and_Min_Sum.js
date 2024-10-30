// 寫兩個函數來計算數組中 n 個連續數字的最大和最小和。
// maxSum([2, 7, 3, 0, 6, 1, -5, -12, -11], 3);  // 12
// minSum ([2, 7, 3, 0, 6, 1, -5, -12, -11], 3); // -28

// O(n)
const maxSum = function (arr, size) {
  // 計算初始加總(第一個window的加總)
  let max = 0;
  for (let i = 0; i < size; i++) {
    max += arr[i];
  }

  // now_sum紀錄當前window的總和
  let now_sum = max;

  // 因為第一個window已經算過了，所以從i開始(第二個window的左邊界)
  // arr.length - size + 1 = 最後一個window的左邊界
  for (let i = 1; i < arr.length - size + 1; i++) {
    let reduce = arr[i - 1]; // 上一個window的左邊界
    let plus = arr[i + size - 1]; // 這個window的右邊界
    now_sum = now_sum - reduce + plus;
    if (now_sum > max) {
      max = now_sum;
    }
  }
  return max;
};
console.log(maxSum([2, 7, 3, 0, 6, 1, 30, -12, -11], 3)); // 37
console.log(maxSum([2, 7, 3, 0, 6, 1, -5, -12, -11], 3)); // 12
console.log(maxSum([2, 7, 3, 0, 6, 1, -5, -12, 100], 3)); //83
const minSum = function (arr, size) {
  let min = 0;
  // 計算第一個window的sum
  for (let i = 0; i < size; i++) {
    min += arr[i];
  }
  let now_sum = min;
  for (let i = 1; i < arr.length - size + 1; i++) {
    let reduce = arr[i - 1]; // 上一個window的左邊界
    let plus = arr[i + size - 1]; // 這個window的右邊界
    now_sum = now_sum - reduce + plus;
    if (now_sum < min) {
      min = now_sum;
    }
  }
  return min;
};
console.log(minSum([2, 7, 3, 0, 6, 1, -5, -12, -11], 3)); // -28
