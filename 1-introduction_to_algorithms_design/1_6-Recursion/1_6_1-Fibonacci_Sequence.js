// Fibonacci_Sequence費波那契數列
// 寫一個函數，以整數 N 作為輸入並傳回斐波那契數列中的第 N 個數字。
// 斐波那契數列的定義為：
// F(0) = 0
// F(1) = 1
// F(n) = F(n – 1) + F(n – 2)

const Fibonacci_Sequence = function (n) {
  // 如果參數n=0, return 0
  if (n === 0) {
    return 0;
  } else if (n === 1) {
    // 如果參數n=1, return 1
    return 1;
  } else {
    // n不為0 or 1的話就return 呼叫自身並放入n-1 + 呼叫自身並放入n-1
    return Fibonacci_Sequence(n - 1) + Fibonacci_Sequence(n - 2);
  }
};

console.log(Fibonacci_Sequence(6)); // 印出8
/*
step1. Fibonacci_Sequence(6)放入stack中 => stack:[f(6)]
step2. Fibonacci_Sequence(5)放入stack中 => stack:[f(6),f(5)]
step3. Fibonacci_Sequence(4)放入stack中 => stack:[f(6),f(5),f(4)]
step4. Fibonacci_Sequence(3)放入stack中 => stack:[f(6),f(5),f(4),f(3)] 
step5. Fibonacci_Sequence(2)放入stack中 => stack:[f(6),f(5),f(4),f(3),f(2)] 
step6. Fibonacci_Sequence(2)呼叫Fibonacci_Sequence(1)放入stack中 => stack:[f(6),f(5),f(4),f(3),f(2),f(1)] 
step7. 執行Fibonacci_Sequence(1) return 1 => 從stack中移除 => stack:[f(6),f(5),f(4),f(3),f(2)] 
step8. 回到執行(step5.)Fibonacci_Sequence(2)已知Fibonacci_Sequence(2 - 1) = 1 , 之後會執行Fibonacci_Sequence(n - 2), 所以呼叫Fibonacci_Sequence(0)
    => Fibonacci_Sequence(0)放入stack中 => stack:[f(6),f(5),f(4),f(3),f(2),f(0)] 
step9. 執行Fibonacci_Sequence(0) => return 0 => stack:[f(6),f(5),f(4),f(3),f(2)] 
step10. 回到執行(step5.)Fibonacci_Sequence(2) => 已知Fibonacci_Sequence(2 - 2) = return 0 => Fibonacci_Sequence(2 - 1) + Fibonacci_Sequence(1 - 2)
    => 1+0 = 1 => Fibonacci_Sequence(2) => return 1
    => stack:[f(6),f(5),f(4),f(3)] 

step11. 回到執行(step4)Fibonacci_Sequence(3) => 執行Fibonacci_Sequence(3 - 1) + Fibonacci_Sequence(3 - 2) => Fibonacci_Sequence(2) + Fibonacci_Sequence(1)
    => Fibonacci_Sequence(2) return 1, Fibonacci_Sequence(1) return 1 => 1+1 =2 => Fibonacci_Sequence(3) return 2.
    => stack:[f(6),f(5),f(4)] 

step12. 回到執行(step3)Fibonacci_Sequence(4) => 執行Fibonacci_Sequence(4 - 1) + Fibonacci_Sequence(4 - 2) => Fibonacci_Sequence(3) + Fibonacci_Sequence(2)
    => Fibonacci_Sequence(3) return 2, Fibonacci_Sequence(2) return 1 => 2+1 =3 => Fibonacci_Sequence(4) return 3.
    => stack:[f(6),f(5)] 

step13. 回到執行(step2)Fibonacci_Sequence(5) => 執行Fibonacci_Sequence(5 - 1) + Fibonacci_Sequence(5 - 2) => Fibonacci_Sequence(4) + Fibonacci_Sequence(3)
    => Fibonacci_Sequence(4) return 3, Fibonacci_Sequence(3) return 2 => 3+2 =5 => Fibonacci_Sequence(5) return 5.
    => stack:[f(6)] 

step14. 回到執行(step1)Fibonacci_Sequence(6) => 執行Fibonacci_Sequence(6 - 1) + Fibonacci_Sequence(6 - 2) => Fibonacci_Sequence(5) + Fibonacci_Sequence(4)
    => Fibonacci_Sequence(5) return 5, Fibonacci_Sequence(4) return 3 => 5+3 =8 => Fibonacci_Sequence(6) return 8.
    => stack:[] => stack已清空
*/
