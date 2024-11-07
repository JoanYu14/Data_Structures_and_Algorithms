// Quick Sort(快速排序法)
// Quick Sort 是一種基於分治法(Divide and conquer)的高效排序演算法，通常被認為是 平均表現最快 的排序演算法之一。
// 其基本思想是通過不斷將數組做Partition分割成兩部分，使每次分割後的數組元素更接近最終的排序順序。

// Partition(分區)
// Partition(分區)演算法的想法是將陣列分成兩部分。 兩部分都不是排序Array，但中間的元素是排序的（我們找到了它在整個Array中正確的最終位置）

// 參數doPartArrStr,doPartArrEnd分別帶入做partition的array的起始index與結尾index
const partition = function (doPartArrStr, doPartArrEnd) {
  // i變數目前與for loop內為儲存小於pivot的part的最右邊index，目前沒有小於pivot的part所以為doPartArrStr-1
  // ex: doPartArrStr=0的話目前i就是-1
  // i變數在partition函數最後會記錄有多少element小於pivot(這個數字也會是pivot最後要換過去的位置(pivot在整個原始array中最後排序好的index))
  let i = doPartArrStr - 1;
  // 定義pivot為doPartArrEnd，因為將要做partition的Array的最後一個index做為pivot(基準)
  let pivotIndex = doPartArrEnd;
  console.log(
    `doPartArrStr:${doPartArrStr}, doPartArrEnd:${doPartArrEnd}, i:${i}, pivotIndex:${pivotIndex}`
  );
  console.log(
    `做partition的Array:[${nums.slice(doPartArrStr, doPartArrEnd + 1)}]`
  );

  // j的起始值為doPartArrStr，每次迴圈+1，直到<=doPartArrEnd-1(~做partition的arr的結尾index(pivotIndex)前一個index)
  for (let j = doPartArrStr; j <= pivotIndex - 1; j++) {
    console.log("-------------------------------------------");
    console.log(
      `j:{index:${j} value:${nums[j]}}, pivotIndex:{index:${pivotIndex} value:${nums[pivotIndex]}}`
    );
    // 此if就是在製作小於pivot的part
    if (nums[j] < nums[pivotIndex]) {
      console.log(
        `j:${j} value:${nums[j]}小於pivotIndex:${pivotIndex} value:${nums[pivotIndex]}`
      );
      // 如果nums[j]小於pivot的話
      // i+1 => 代表小於pivot的part範圍+1 => 小於pivot的part的最右邊index+1，nums[j]就要換到這個位置
      // ex: ori_i = -1(還未有小於pivot的part), if條件成立 => i+1=0, 此時小於pivot的part結尾index就是0(此時小於pivot的part的length為1=> nums[j]為第一個小於pivot的value)
      i += 1;
      console.log(
        `小於pivot的part的最右邊加1 {index:${i}, value:${nums[i]}}; 目前nums:[${nums}]`
      );
      // 將nums[j]與nums[i]做swap，小於pivot的part長度就+1了
      let temp = nums[i];
      nums[i] = nums[j];
      nums[j] = temp;
      console.log(`交換後nums:[${nums}]`);
    }
  }
  console.log("===============================");
  // 迴圈結束partition的最後一步就是將pivot移動到兩個part的中間
  // i+1 => 這個i原本為小於pivot的part的last index，i+1就是pivot應該在的位置(也等於小於pivot的part的length)，i+1後面的index的value都大於pivot(大於pivot的part)
  i += 1;
  console.log(
    `pivot: {index:${doPartArrEnd} value:${nums[doPartArrEnd]}}排序好的index在:${i}`
  );
  let temp = nums[i];
  nums[i] = nums[pivotIndex];
  nums[pivotIndex] = temp;
  console.log(`pivot:${nums[i]}排序好了，此時nums:[${nums}]`);
  // return排序好的index
  return i;
};

// 第一次呼叫的時候就是放入0與nums.length-1
const quickSort = function (arrStr, arrEnd) {
  console.log(`執行quickSort(${arrStr},${arrEnd})`);
  let ori_arr = nums.slice(arrStr, arrEnd + 1);
  // 如果arrStr<arrEnd的話代表還沒做完所有partition
  if (arrStr < arrEnd) {
    // 呼叫partition取得nums[arrStr: arrEnd+1]做partition得到的sortedIndex
    let sorted_index = partition(arrStr, arrEnd);
    console.log(
      `nums[${arrStr}:${arrEnd}]=[${ori_arr}]做partition得到排序好的index為:${sorted_index}, value為:${nums[sorted_index]}`
    );
    console.log();
    // 將小於sorted_index的part做quickSort
    quickSort(arrStr, sorted_index - 1);
    // 將大於sorted_index的part做quickSort
    quickSort(sorted_index + 1, arrEnd);
  }

  return nums;
};

let nums = [6, 13, 10, 4, 1, 5, 2, 8, 14, 9, 11, 7, 3, 15, 12];
console.log(quickSort(0, nums.length - 1));
