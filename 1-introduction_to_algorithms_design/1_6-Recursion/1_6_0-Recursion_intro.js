// 一個呼叫自身的函數。
// 遞歸使用稱為“stack”的數據結構，stack是後進先出。 當我們在另一個函數中調用一個函數時，我們就位於調用call stack上。
// 遞歸也是序列中的數學關係。
function rs(n) {
  if (n == 1) {
    return 10;
  } else {
    return rs(n - 1) + 15;
  }
}
console.log(rs(3));

/*
  1. rs(3)被呼叫，rs(3)被放入call stack中，rs(3)會呼叫rs(2)
  2. rs(2)被呼叫，rs(2)被放入call stack中，rs(2)會呼叫rs(1)
  3. rs(1)被呼叫，rs(1)被放入call stack中，rs(1)會return 10，return後rs(1)從call stack中取出
  4. 繼續執行rs(2)，rs(1)已知是10，所以10+15=25，rs(2) return 25，rs(2)從call stack取出
  5. 繼續執行rs(3)，rs(2)已知是25，所以25+15=40，rs(3) return 25，rs(3)從call stack取出，call stack被清空
  */
