// 要介紹複雜度前要先引入一個概念，叫做「Operation」
// 一般來說執行程式碼時，任何一次使用加、減、乘、除、大於等於之比較都可以稱為「Operation」。

// 1+2+3+...+n
// 時間複雜度: O(n)
function fun1(n) {
  let sum = 0;
  // 每次迴圈 1. i<=n 2. i++ 3. sum+=i，所以每執行一次for loop就要執行3個operation
  // 因此fun1的f(n) = 3n
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// 等差級數公式解 : (首項+末項)*末項 / 2
// 時間複雜度: O(1)
function fun2(n) {
  // 1. (1+n) 2. *n 3. /2
  // 不管n為多少，fun2的f(n)都是3
  return ((1 + n) * n) / 2;
}

let time1 = Date.now();
fun1(1000000);
let time2 = Date.now();
console.log(time2 - time1); // 5

let time3 = Date.now();
fun1(1000000);
let time4 = Date.now();
console.log(time4 - time3); // 1
