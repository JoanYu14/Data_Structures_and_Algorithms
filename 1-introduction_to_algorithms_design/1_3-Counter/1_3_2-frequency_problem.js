// 編寫一個接受兩個字串的函數並檢查它們是否具有相同的字母。順序並不重要。
// sameFrequency(“abbc”, “aabc”)  false
// sameFrequency(“abba”, “abab”) true
// sameFrequency(“aasdebasdf”, ”adfeebed”) false

// O(n + m)
function sameFrequency(str1, str2) {
  let counter1 = {}; // 用來記錄 str1 中每個字母的出現次數
  let counter2 = {}; // 用來記錄 str2 中每個字母的出現次數

  // 計算 str1 每個字母的出現次數
  // O()n
  for (let i in str1) {
    if (!counter1[str1[i]]) {
      counter1[str1[i]] = 1; // 如果字母第一次出現，設為 1
    } else {
      counter1[str1[i]] += 1; // 如果已經存在，次數加 1
    }
  }

  // 計算 str2 每個字母的出現次數
  // O(m)
  for (let i in str2) {
    if (!counter2[str2[i]]) {
      counter2[str2[i]] = 1; // 如果字母第一次出現，設為 1
    } else {
      counter2[str2[i]] += 1; // 如果已經存在，次數加 1
    }
  }

  // 比較兩個字串的不同字母數量
  if (Object.keys(counter1).length != Object.keys(counter2).length) {
    console.log(`${str1}與${str2}擁有的字母數量不同`);
    return false; // 如果不同字母數量不相同，直接返回 false
  } else {
    // 比較每個字母出現的次數是否相同
    for (let i in counter1) {
      if (counter1[i] != counter2[i]) {
        console.log(`${str1}與${str2}的${i}數量不同`);
        return false; // 如果某個字母出現的次數不同，返回 false
      }
    }
    console.log(`${str1}與${str2}的字母相同`);
    return true; // 如果所有字母出現次數都相同，返回 true
  }
}

sameFrequency("abc", "cba"); // abc與cba的字母相同
sameFrequency("abc", "cbaa"); // abc與cbaa的a數量不同
sameFrequency("dbc", "cba"); // dbc與cba的d數量不同
