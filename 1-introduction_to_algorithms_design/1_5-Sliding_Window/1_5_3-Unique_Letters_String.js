// 寫一個名為 uniqueLetterString 的函數，它接受一個字串並傳回包含所有不同字元的最長子字串的長度。
// Example: uniqueLetterString(“thisishowwedoit”) // 6
const uniqueLetterString = function (s) {
  // 右pointer指向要加入window的index
  let right = 0;
  // 左pointer指向目前window的起始位置
  let left = 0;
  // 紀錄最大無重複字母的字串長度
  let ans = 0;
  // 紀錄window內存在的字母
  let counter = {};

  while (right < s.length) {
    // step1 : 檢查s[right]在counter中是否已存在
    if (!counter[s[right]]) {
      // 不存在的話(0也是falsy value)，就將s[right]加入window，並且在counter中記錄
      counter[s[right]] = 1;
      // 如果當前window內element數量>ans的話就更新ans
      if (right - left + 1 > ans) {
        ans = right - left + 1;
      }
      // right++，下一圈繼續往右檢查看是否不重複
      right++;
    } else {
      // truthy代表目前window中存在s[right]這個字母
      // => 將window縮小，先將counter[s[left]]-=1，然後left往右
      counter[s[left]] -= 1;
      left++;
    }
  }
  return ans;
};

console.log(uniqueLetterString("thisishowwedoit")); // 6
