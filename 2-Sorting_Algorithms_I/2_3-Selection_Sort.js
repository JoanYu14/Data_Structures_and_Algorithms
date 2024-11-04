// Selection Sort(選擇排序法) => O(n^2)
// 選擇排序的原理是－選擇未排序數組中最小的值，然後與該未排序數組中最左邊的值交換。
// Worst Case Performance: O(𝑛^2)
// Best Case Performance: O(𝑛^2) => 因為要確認未排序Array中最小的element還是要循環n
// Average performance	O(𝑛^2)

// 定義selectMinElement來找到為排序Array中最小的element
// index參數是放入selectionSort目前要排序的index
const selectMinElement = function (arr, index) {
  // 預設最小的element為index(electionSort目前要排序的index =>為排序array中最左邊的index)，因為arr中index往右的都是排序好的了
  let min = index;
  // i為index+1(要排序的index的右邊第一個)開始~<=arr.length-1
  for (let i = index + 1; i <= arr.length - 1; i++) {
    // 若arr[i] < arr[min]，則min就設定為arr[i]
    if (arr[i] < arr[min]) {
      min = i;
    }
  }
  return min;
};

const selectionSort = function (nums) {
  // i紀錄要排序的index(未排序Array的最左邊的index)，因為每次都會找到為排序的array中最小的index，所以最後nums.length-1一定是最大的，因此到length-2就好了
  for (let i = 0; i <= nums.length - 2; i++) {
    // 先找到minIndex
    let minIndex = selectMinElement(nums, i);
    // temp存入minIndex的value
    let temp = nums[minIndex];
    // 最小的element與i的value互換
    nums[minIndex] = nums[i];
    nums[i] = temp;
  }
  return nums;
};

// 把selectMinElement函數寫在裡面
const selectSortFinal = function (nums) {
  // i為未排序array的最左index，就是現在要進行排序的index
  for (let i = 0; i < nums.length - 2; i++) {
    console.log(`目前未排序Array最左的Index為${i}`);
    // 先預設minIndex為未排序array的最左index
    let minIndex = i;
    // 令j初始為i+1(未排序Array的最左邊+1項，因為<i的是已排序好的或小於範圍的)，然後比大小
    for (let j = i + 1; j <= nums.length - 1; j++) {
      if (nums[j] < nums[minIndex]) {
        // 如果nums[j]小於nums[minIndex]的話，代表未排序Array中目前最小的value的Index為j
        minIndex = j;
      }
    }
    console.log(
      `未排序Array中最小的index:${minIndex}, value:${nums[minIndex]}`
    );
    // temp存入minIndex的value
    let temp = nums[minIndex];
    // 最小的element與i的value互換
    nums[minIndex] = nums[i];
    nums[i] = temp;
    console.log(`index:${i}已排序好，目前nums為:${nums}`);
    console.log();
  }
  return nums;
};

console.log(selectionSort([14, -4, 17, 6, 22, 1, -5]));
console.log(selectSortFinal([14, -4, 17, 6, 22, 1, -5]));
