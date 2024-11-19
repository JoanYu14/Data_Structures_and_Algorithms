// Counting Sort 計數排序
// Counting Sort 的核心思想是建立一個計數數組 `count[]`，該數組用來記錄待排序數列中每個元素的出現次數。
// 然後，利用這些計數，將每個元素依照它們的次數重新排列到結果數組中。

// 1. 找出範圍：確定待排序數列中的最小值和最大值。
// 2. 創建計數數組：建立一個大小為最大值和最小值之間範圍的數組，並對數列中的每個元素進行計數。
// 3. 累積計數：對計數數組進行累積，這樣計數數組中的每一個元素會表示小於或等於該索引的元素個數。
// 4. 排序：根據累積計數數組的信息，將元素放回原數列中，並保持元素的穩定性（即相等元素的相對位置不變）。

// 時間複雜度：
// 計數數組的建設需要遍歷一次原數列，這是 O(n) 的操作。
// 累積計數的過程需要遍歷計數數組，這是 O(k)（其中 k 是數列中元素的範圍）。
// 最終將元素放回原數列需要 O(n) 的時間。
// 因此，總的時間複雜度為 O(n + k)，其中 n 是數列的長度，k 是數列中元素的範圍（即最大值減最小值）。

// 空間複雜度：
// 需要額外的 O(k) 空間來存儲計數數組，並且可能需要額外的 O(n) 空間來存儲結果數組。
// 因此，空間複雜度為 O(n + k)。

const countingSort = function (nums, min, max) {
  // size就是max-min+1 (ex:min=1, max=3, 3-1+1=3, => [0,0,0] => index0紀錄1出現的次數(min),index1紀錄2出現的次數(min+1),index3紀錄3出現的次數(min+2(max)))
  const size = max - min + 1;
  // 創建count Array
  let count = new Array(size).fill(0);
  // 遍歷nums
  for (let i = 0; i < nums.length; i++) {
    // ansIndex就是count中哪個index是紀錄這個數字出現的次數的
    // nums[i] - min就是ansIndex
    let ansIndex = nums[i] - min;
    count[ansIndex]++;
  }

  // itemIndex記錄了目前nums要替換到哪個index
  let itemIndex = 0;
  // 遍歷count
  for (let j = 0; j < count.length; j++) {
    // count會由小到大紀錄nums的數字出現的次數，index為由小到大紀錄，value就是出現次數
    // value為目前count所記錄的是哪個整數的出現次屬
    let value = min + j;
    console.log(`目前value為:${value}，出現${count[j]}次`);
    while (count[j] > 0) {
      // changeIndex為nums要被替換為value的index = j+count[j]
      console.log(`nums要被替換的index為[${itemIndex}], value為:${value}`);
      nums[itemIndex] = value;
      count[j]--;
      itemIndex++;
      console.log(`替換後的nums為[${nums}]`);
    }
    console.log(`value:${value}已替換完成，nums=[${nums}]`);
    console.log();
  }
  return nums;
  //   console.log(count);
};

console.log(countingSort([9, 2, 3, 5, 1, 2, 3, -2, -3], -3, 9));
