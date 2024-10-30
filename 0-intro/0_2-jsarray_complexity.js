// push是在最尾端加入一個元素，時間複雜度是O(1)
// unshift是在頭的地方加入一個元素，所以後面的元素都要全部往後移動一格，所以Big O是n。
// shift是在頭的地方刪除一個元素，所以後面的元素都要全部往前移動一格，所以Big O是n。
// 我們要存取Array中的第幾個元素其實是直接找RAM中指向的位子，所以Big O是1而已。

let n = 10;
let arr = [1, 2, 3, 4, 5];

// 這個for loop是O(n) * O(1) = O(n)
// 所以整個for Loop包含裡面的程式，執行的Big O是O(n)
for (let i = 0; i < n; i++) {
  arr.push(10); // unshift的Big O為O(1)
}

// 這個for loop是O(n) * O(n) = O(n^2)
// 所以整個for Loop包含裡面的程式，執行的Big O是O(n^2)
for (let i = 0; i < n; i++) {
  arr.unshift(10); // unshift的Big O為O(n)
}
