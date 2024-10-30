// 字串的子序列是在不影響剩餘字元相對位置的情況下刪除原始字串中的一些（可以沒有）字元而形成的新字串。
// 寫一個函數來檢查一個字串是否是另一個字串的子序列。
// isSubsequence("hello", "hello Dear"); true
// isSubsequence(“book", “brooklyn"); true
// isSubsequence("abc", "bac"); false (order matters)

// 時間複雜度: O(n+m)
// right 指針遍歷 str2，而 left 指針遍歷 str1。
// 在最壞情況下，right 會遍歷整個 str2，而 left 會遍歷整個 str1，因此總時間複雜度取決於 str1 和 str2 的長度之和，即 O(n+m)。
const isSubsequence = function (str1, str2) {
  // pointer1與pointer2分別紀錄str1與str2的index
  let pointer1 = 0;
  let pointer2 = 0;

  // 如果pointer1小於str1.length的話就繼續迴圈
  while (pointer1 < str1.length) {
    // 如果pointer2大於等於str2.length的話代表直到str2都遍歷完了，str1卻還沒遍歷結束
    // 代表當前str1[pointer1]的字在str2中沒有，或者順序不對，就直接return false結束函數
    if (pointer2 >= str2.length) {
      return false;
    } else if (str2[pointer2] === str1[pointer1]) {
      // 如果(str2[pointer2] === str1[pointer1]的話就pointer1與pointer2都+1
      pointer1++;
      pointer2++;
    } else if (str2[pointer2] != str1[pointer1]) {
      // 如果str2[pointer2] != str1[pointer1]，pointer2+1，繼續往str[2]的下一個字檢查是否相同
      pointer2++;
    }
  }
  // 若迴圈結束代表str1已經遍歷完，並且str1是str2的子序列。
  return true;
};
console.log(isSubsequence("hello", "hello Dear")); // true
console.log(isSubsequence("book", "brooklyn")); // true
console.log(isSubsequence("abc", "bac")); // false
console.log(isSubsequence("", "bac")); // true
