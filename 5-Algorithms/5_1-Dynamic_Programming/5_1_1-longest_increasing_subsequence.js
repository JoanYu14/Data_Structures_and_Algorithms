// Longest Increasing Subsequence (最長遞增子序列)

const L = function (nums, i, memo) {
  console.log(
    `=============== i:{index:${i}, value:${nums[i]}} ===============`
  );

  if (memo[i]) {
    console.log(
      `i:{index:${i}, value:${nums[i]}}已經找過LIS了，LIS為${memo[i]}`
    );
    return memo[i];
  }

  if (i === nums.length - 1) {
    console.log(
      `i:{index:${i}, value:${nums[i]}}為nums中最後一個element，所以LIS一定為1`
    );
    return 1;
  }
  // 先預設maxLen為1(i的lis至少為1)
  let maxLen = 1;
  // 遍歷i後面的element看是否比i的value還大，該迴圈能找到i的lis
  for (let j = i + 1; j < nums.length; j++) {
    console.log(
      `i:{index:${i}, value:${nums[i]}}，j:{index:${j}, value:${
        nums[j]
      }}， j是否大於i:${nums[j] > nums[i]}`
    );

    if (nums[j] > nums[i]) {
      // 如果nums[j]>nums[i]的話就去看j的LIS為多少然後+1(i本身)，若是比原本的maxLen大則更新
      console.log(`找j:{index:${j}, value:${nums[j]}}的LIS`);
      maxLen = Math.max(maxLen, L(nums, j, memo) + 1);
    }
  }
  console.log(`i:{index:${i}, value:${nums[i]}}的LIS為${maxLen}，${i}加入memo`);
  // 找到i的lis後記錄到memo裡，這樣後面再需要找i的lis的時候就可以直接return
  memo[i] = maxLen;
  console.log();
  return maxLen;
};

const longestIncreasingSubsequence = function (nums) {
  // memo會存nums中index的遞增子序列數量，避免重複計算
  let memo = {};
  // 將nums每個index放到L函數中，L函數會回傳index最長遞增子序列
  let result = nums.map((num, index) => {
    console.log(
      `-------------- 開始找index:${index}, value:${num}的LIS --------------`
    );
    let lis = L(nums, index, memo);
    console.log(
      `-------------- index:${index}, value:${num}的LIS = ${lis} --------------`
    );
    return lis;
  });
  // 看result中lis最大為何
  return Math.max(...result);
};

console.log(longestIncreasingSubsequence([10, 9, 2, 5, 3, 7, 101, 18]));
