let numbers = [
  9, 12, 15, 18, 19, 20, 22, 25, 26, 26, 33, 37, 38, 41, 47, 47, 50, 55, 57, 60,
  68, 80, 87, 90, 98, 100, 103, 108, 109, 109, 116, 120, 120, 124, 127, 128,
  131, 135, 135, 139, 143, 145, 151, 155, 156, 158, 163, 164, 165, 169, 169,
  173, 174, 176, 177, 178, 181, 182, 182, 183, 184, 189, 192, 195, 200, 201,
  203, 204, 207, 213, 217, 222, 222, 222, 227, 228, 233, 235, 237, 239, 239,
  243, 248, 251, 252, 257, 260, 260, 263, 268, 270, 271, 271, 276, 281, 284,
  285, 295, 297, 298,
];

// 二分搜尋的時間複雜度為 O(log n)。這是因為每次迴圈都將搜尋範圍減半。
// 如果陣列的長度為 n，則最多需要執行log2n次比較。
// 時間複雜度 => O(logn)
function binarySearch(arr, n) {
  let min = 0; // 初始min就是arr的第一個index
  let max = arr.length - 1; // 初始max就是arr的最後一個index
  let step = 0; // 搜尋範圍的最大索引

  // 當搜尋範圍縮小到無法再進行比較時（即 max < min），就結束迴圈。
  while (min <= max) {
    step++;
    let middle = Math.floor((max + min) / 2); // middle(中間索引)就是(max+min)/2的那個index
    //  n 大於 arr[middle] = >目標值只可能在右側子陣列中。
    if (n > arr[middle]) {
      min = middle + 1; // 如果n大於arr的middle那個index的值，那min就要移到middle+1的位置，繼續搜尋右側子arr
    }
    //  n 小於 arr[middle] = >目標值只可能在左側子陣列中。
    else if (n < arr[middle]) {
      max = middle - 1; // 如果n小於arr的middle那個index的值，那max就要移到middle-1的位置，繼續搜尋左側子arr
    } else if (n === arr[middle]) {
      // 如果n等於切半的那個middle index的值，那就找到了
      console.log(`找到${n}了，在index為${middle}的位置`);
      console.log(`總共花了${step}步`);
      return middle;
    }
  }
  console.log(`找不到${n}，所以回傳-1`);
  return -1;
}

binarySearch(numbers, 298);
