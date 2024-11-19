// Radix Sort(基數排序)
//基數排序是一種非比較型排序演算法，主要適用於數字排序。它的核心思想是按照「位數」來逐步比較數字，從最低位（或最高位）開始，依次對每一位進行排序，直到完成所有位數的排序

// 運作原理
// 基數排序的基本流程分為以下幾個步驟：
// 1. 確定數字的位數範圍：找出待排序數列中最大數字的位數（如十進位數字 `543` 有 3 位）。
// 2. 從最低位開始排序：對每一位（個位數、十位數、百位數……）分別進行穩定排序（通常使用 計數排序 作為子程序來確保穩定性）。
// 3. 逐位處理：每次處理一位數字後，整個數列變得更加有序，最後當最高位數排序完成時，數列已完全有序。

// 時間與空間複雜度
// 時間複雜度：
// O(n * k)：
// `n` 是數列的長度。
// `k` 是數字的最大位數。
// 如果 `k` 是固定的（例如十進位），則基數排序的時間複雜度接近 O(n)，比比較型排序（如快速排序的 O(n * log n)）在某些情況下更快。
// 空間複雜度：
// 空間複雜度為 O(n + k)：
// `n` 是數列的長度。
// `k` 是桶的數量（十進制下固定為 10 個）。

// 優缺點
// 優點：
// 1. 時間複雜度接近線性，在數列長度較大且數字範圍有限時表現優秀。
// 2. 非比較型排序，不受數列特性影響。
// 缺點：
// 1. 範圍過大時，空間複雜度會增大。
// 2. 只能處理整數數列，若需要處理浮點數或負數，則需額外處理邏輯。

// function1. getDigit(num,index):取得num的第index位數。ex: getDigit(205,0) => 5(取得205的個位數)
const getDigit = function (num, index) {
  // Math.abs(num) => 取num的絕對值
  // Math.pow(10, index) => 取得10的index次方
  // %10用前面的Math.floor的值/10的餘數
  return Math.floor(Math.abs(num) / Math.pow(10, index)) % 10;
};

// function2. getDigitCount(num):取得num有幾位數字
const getDigitCount = function (num) {
  // Math.log10(num) : log底數為10 num => 10的幾次方為num
  // Math.floor: 無條件捨去

  return Math.floor(Math.log10(Math.abs(num))) + 1;
};

// function3. getMaxDigitCount(nums):取得整數Array中
const getMaxDigitCount = function (nums) {
  // 先預設最大的位數為0
  let maxDigitCount = 0;
  // 遍歷nums中所有element
  for (let i = 0; i < nums.length; i++) {
    // maxDigitCount = maxDigitCount與nums[i]的位數中比較大的那個
    maxDigitCount = Math.max(maxDigitCount, getDigitCount(nums[i]));
  }
  return maxDigitCount;
};

function radixSort(nums) {
  // 找出陣列中最長的位數有幾個數字，來知道我們需要做幾次迭代
  let maxDigitsCount = getMaxDigitCount(nums);

  // 做maxDigitsCount次迴圈
  for (let k = 0; k < maxDigitsCount; k++) {
    // 製作內含10個empty array的Array，每個array分別照index代表0~9
    let digitBuckets = Array.from({ length: 10 }, () => []);
    console.log(`目前要照第${k}位數做排序`);
    // 遍歷nums
    for (let i = 0; i < nums.length; i++) {
      // 找出第 k位數的數字，並把它放進對應的籃子裡
      let bucketIdx = getDigit(nums[i], k);
      console.log(`${nums[i]}的第${k}位數為:${bucketIdx}`);
      digitBuckets[bucketIdx].push(nums[i]);
    }

    // 合併所有 array
    nums = [].concat(...digitBuckets);
    console.log(`按照第${k}位數排序好的nums為:[${nums}]`);
    console.log();
  }
  return nums;
}
console.log(radixSort([3, 56, 2222, 1111111, 2, 888]));
