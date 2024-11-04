// 在實踐中，Insertion Sort(插入排序)比Bubble Sort(冒泡排序)更有效率。理論上，它們具有相同的 Big O 值(O(n^2))。
// 插入排序的原理很簡單。不斷將新值插入已排序的陣列中。將其插入到正確的位置，以便排序後的陣列保持排序狀態
// Worst Case Performance: O(𝑛^2)
// Best Case Performance: O(𝑛)
// Average performance	O(𝑛^2)

const insertionSort = function (nums) {
  // j從1開始的原因是arr的第一項是已經排序好，代表已排序陣列的右邊第一項(現在要進行排序的index)
  for (let j = 1; j <= nums.length - 1; j++) {
    // key記錄了當前要排序index的value，這項在後面比較的時候才不會丟失值
    let key = nums[j];
    // i就是j的前一項，因為key要跟左邊的值做比較(初始為排序好的陣列的最後一項)
    let i = j - 1;
    console.log(`key:{index:${j},value:${key}}, i:${i}`);
    // i>0確保i不會小於nums範圍，key<nums[i]代表key小於左邊的數
    while (i >= 0 && key < nums[i]) {
      console.log(`key:${key} < nums[${i}]:${nums[i]}`);
      // 如果i>=0就代表還不是第一項，代表key還沒跟array的所有值做比較
      // nums[i+1]就是key原本在的位置 => key原本所在的位置被左邊的value取代(nums[i])
      nums[i + 1] = nums[i];
      // i-1，就是key跟左邊的數字比較完了，j越大，要比較的i就越多
      i--;
      console.log(`key:${key}目前要排到${i + 1}`);
    }

    // 到這裡代表while迴圈已經停止了，就是這個i的值沒有比key大了或者i已經被減到變成-1了(代表key比原本array的第一項還小)
    // 因為前一圈while迴圈的arr[i+1]變成i了，所以這一圈的i+1(while迴圈內部最後i有-1)其實是算是空的(原本的直往後移動了)，key就是要插在這個位子
    nums[i + 1] = key;
    console.log(`index:${j}排序好了 => nums:${nums}`);
    console.log();
  }
  console.log();
  return nums;
};
console.log(insertionSort([3, 2, 6, 1, 5]));
// key:{index:1,value:2}, i:0
// key:2 < nums[i]:3
// key:2目前要排到0
// index:1排序好了 => nums:2,3,6,1,5

// key:{index:2,value:6}, i:1
// index:2排序好了 => nums:2,3,6,1,5

// key:{index:3,value:1}, i:2
// key:1 < nums[i]:6
// key:1目前要排到2
// key:1 < nums[i]:3
// key:1目前要排到1
// key:1 < nums[i]:2
// key:1目前要排到0
// index:3排序好了 => nums:1,2,3,6,5

console.log(insertionSort([14, -4, 17, 6, 22, 1, -5]));
