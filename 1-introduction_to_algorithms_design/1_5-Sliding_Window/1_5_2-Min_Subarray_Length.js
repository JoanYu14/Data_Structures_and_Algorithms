// 寫一個名為 minSubLength 的函數，它接受兩個參數：一個正整數和一個正整數陣列。
// 此函數應傳回連續子數組的最小長度 - 此子數組內的元素總和必須大於或等於正整數參數。如果未找到子數組，則傳回 0。
// Example: minSubLength(11,[9, 8, 1, 4, 9, 5, 1, 2])); // 2

// O(n)
const minSubLength = function (target, nums) {
  let left = 0; // 左Pointer，表示視窗的起點
  let right = 0; // 右Pointer，表示視窗的終點
  let ans = 0; // 儲存符合條件的最小子陣列長度
  let sum = 0; // 當前視窗的總和
  let do_plus = true; // 來記錄迴圈要做加還是減
  while (right < nums.length) {
    if (do_plus) {
      // 如果do_plus為true，代表上個迴圈的sum<target，所以right++
      // 在這次迴圈要加上right
      sum += nums[right];
    } else {
      // 如果do_plus為false，代表上個迴圈的sum>=target
      // 所以要先減掉left然後left++，另window變小，再去檢查新的sum是否有>=target
      sum -= nums[left];
      left++;
    }

    // 檢查sum是否>target
    if (sum >= target) {
      let subarray_count = right + 1 - left;
      // 如果ans為0代表此前沒找到window>=target的
      // subarray_count < ans代表這個window加總sum既>=target又比之前找到的符合sum>=target的window個數少
      if (ans == 0 || subarray_count < ans) {
        ans = subarray_count;
      }
      // 另da_plus=false，代表下次迴圈要把左邊界(left)減掉，另window縮小，再檢查sum是否仍然>=target
      do_plus = false;
    } else {
      // 另do_plus=true，然後right++，代表下次迴圈要加上nums[right]，將window擴大
      do_plus = true;
      right++;
    }
  }
  return ans;
};
console.log(minSubLength(11, [9, 8, 1, 4, 9, 5, 1, 2])); // 2
console.log(minSubLength(7, [2, 3, 1, 2, 4, 3])); // 2
console.log(minSubLength(10, [1, 1, 1, 1, 1, 1])); // 0
console.log(minSubLength(9, [1, 1, 3, 1, 5, 1])); // 3
