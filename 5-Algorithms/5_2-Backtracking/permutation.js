let words = ["A", "B", "C", "D"];
let perm = function (words) {
  let result = [];
  for (let i = 0; i < words.length; i++) {
    console.log(`i:${i}`);
    let word = words[i];
    for (let j = 0; j < words.length; j++) {
      console.log(`j:${j}`);
      // Backtracking
      if (j === i) {
        continue;
      }
      for (let k = 0; k < words.length; k++) {
        console.log(`k:${k}`);
        // Backtracking
        if (k === i || k === j) {
          continue;
        }
        for (let f = 0; f < words.length; f++) {
          console.log(`f:${f}`);
          // Backtracking
          if (f === i || f === j || f === k) {
            continue;
          } else {
            word = words[i] + words[j] + words[k] + words[f];
            result.push(word);
          }
        }
      }
    }
  }
  return result;
};

let nums = ["A", "B", "C", "D"];
let resultArr = [];
// 可以根據Array數量動態排列的permutation function
const permutation = function (arr, start) {
  console.log("---------------------------------------------");
  console.log(`arr:[${arr}], start:${start}`);
  if (start >= arr.length) {
    console.log(`start>=arr.length所以將arr push到resultArr`);
    resultArr.push([...arr]);
    console.log(resultArr);
  } else {
    console.log(`start<arr.length`);
    for (let i = start; i < arr.length; i++) {
      console.log(`start:${start}與i:${i}互換`);
      swap(arr, start, i);
      console.log(
        `swap後arr:[${arr}]，將start+1:${start + 1}作為參數呼叫permutation`
      );
      permutation(arr, start + 1);
      console.log(
        `permutation後arr:[${arr}]，將start:${start}與i:${i}互換回來`
      );
      swap(arr, start, i);
      console.log("==================================");
    }
  }
};

const swap = function (arr, n1, n2) {
  let temp = arr[n2];
  arr[n2] = arr[n1];
  arr[n1] = temp;
};
permutation(nums, 0);
console.log(resultArr);
console.log(resultArr.length);
