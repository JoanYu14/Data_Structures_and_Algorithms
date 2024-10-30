// 這是一種按順序檢查list中每個元素直到找到匹配項或搜尋整個list的演算法。
let numbers = [
  33, 99, 97, 28, 87, 72, 48, 72, 18, 89, 18, 45, 85, 13, 70, 80, 10, 88, 92,
  65, 23, 73, 88, 55, 1, 79, 95, 69, 30, 31, 88, 13, 32, 86, 15, 51, 69, 29, 11,
  26, 62, 0, 45, 32, 21, 4, 73, 10, 88, 23, 93, 34, 91, 68, 8, 36, 66, 19, 45,
  12, 15, 29, 68, 59, 53, 76, 42, 81, 27, 30, 69, 15, 18, 0, 12, 2, 28, 79, 49,
  15, 70, 4, 34, 48, 40, 28, 55, 73, 18, 37, 10, 65, 95, 11, 49, 7, 22, 24, 19,
  33,
];

// linearSearch的Big O計算是O(n)+O(1) = O(n)
// 最糟糕的情況 : 我們要找的n在array的最後一項，那for loop就要跑n次。
// 最好的情況 : 我們要找的n在array的第一項。
// 平均情況 : n/2。
function linearSearch(arr, number) {
  //   O(n)
  for (let i = 0; i < arr.length; i++) {
    // if (arr[i] == number)：這個操作是 O(1)
    if (arr[i] == number) {
      console.log(`${number}在numbers中第一個找到的index:${i}`);
      return i;
    }
  }
  console.log(`${number}在numbers找不到`);
  return -1;
}

linearSearch(numbers, 100); // 100在numbers找不到
linearSearch(numbers, 2); // 2在numbers中第一個找到的index:75
