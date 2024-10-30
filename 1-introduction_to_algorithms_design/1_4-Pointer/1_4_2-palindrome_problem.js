// 寫一個函數來檢查輸入字串是否為回文。回文是一個可以正反讀的單字。
// isPalindrome('awesome') false
// isPalindrome('foobar') false
// isPalindrome('tacocat') true
// isPalindrome('amanaplanacanalpanama') true

// 間複雜度是 O(n)
const isPalindrome = function (str) {
  let left = 0;
  let right = str.length - 1;

  // 如果right>left就繼續迴圈(中間那個字會left==right)所以不會繼續迴圈
  while (right > left) {
    console.log(
      `目前left:{index=${left};word:${str[left]}},目前right:{index=${right};word:${str[right]}}`
    );
    // 若str[right] == str[left]的話right與left往內移動1index
    if (str[right] == str[left]) {
      right--;
      left++;
    } else {
      // 若str[right] != str[left]的話就代表不可能是回文了，直接return false
      return false;
    }
  }
  // 迴圈結束都沒return false代表是回文
  return true;
};

console.log(isPalindrome("awesome"));
console.log(isPalindrome("foobar"));
console.log(isPalindrome("tacocat"));
console.log(isPalindrome("amanaplanacanalpanama"));
