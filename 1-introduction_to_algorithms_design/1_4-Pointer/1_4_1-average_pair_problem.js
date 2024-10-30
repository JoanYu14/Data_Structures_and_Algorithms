// Pointer就是兩個箭頭，這是在排序好的array才能用的技巧。
// 兩個箭頭分別指向array的最左與最右的位置。

// 寫一個函數，給出一個排序的整數Array和一個數字。
// 尋找Array中是否有任何對具有給定數字的平均值。找到所有的人。可能有多對符合條件。
// averagePair([-11, 0, 1, 2, 3, 9, 14, 17, 21], 1.5)
// The number pair is -11 and 14, 0 and 3, 1 and 2

// 暴力解法 => Big O = O(n^2)
const averagePair = function (arr, num) {
  let ans = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length - i; j++) {
      if ((arr[i] + arr[j]) / 2 == num) {
        ans.push([arr[i], arr[j]]);
      }
    }
  }
  return ans;
};

// averagePairUsePointer 函式的時間複雜度是 O(n)，其中 n 是輸入Array的長度。以下是其時間複雜度的分析過程：
// Pointer移動策略：該函式利用左右Pointer（left 和 right）從Array的兩端向中間靠攏，每次迴圈運行時，兩個Pointer中至少有一個會移動。因此，每個元素最多會被訪問一次。
// 單次掃描：整個Array只需要遍歷一次即可找到所有符合條件的數對，不需要嵌套的迴圈結構。
// 必須是排序好的Array才能這樣做

const averagePairUsePointer = function (arr, num) {
  // 初始化左Pointer指向Array的第一個元素（索引 0）
  let left = 0;
  // 初始化右Pointer指向Array的最後一個元素
  let right = arr.length - 1;
  // 初始化空陣列，用於儲存符合條件的所有數對
  let answer = [];

  // 當右Pointer在左Pointer的右側時，進行迴圈遍歷
  while (right > left) {
    // 計算當前Pointer所指的兩個數的平均值
    const avg = (arr[left] + arr[right]) / 2;

    // 如果平均值大於目標數字，則將右Pointer左移以減少數對的總和
    if (avg > num) {
      right -= 1;
    }
    // 如果平均值小於目標數字，則將左Pointer右移以增加數對的總和
    else if (avg < num) {
      left++;
    }
    // 如果平均值等於目標數字
    else if (avg === num) {
      // 將符合條件的數對（左Pointer和右Pointer指向的數）加入到答案陣列中
      answer.push([arr[left], arr[right]]);
      // 移動左Pointer以查找其他可能的組合
      left++;
    }
  }

  // 返回符合條件的所有數對
  return answer;
};

const answer1 = averagePair([-18, -11, 0, 1, 2, 3, 9, 14, 17, 21], 1.5);
console.log(answer1);

const answer2 = averagePairUsePointer(
  [-18, -11, 0, 1, 2, 3, 9, 14, 17, 21],
  1.5
);
console.log(answer2);
