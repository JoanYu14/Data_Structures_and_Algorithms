// Merge Sort(合併排序法) :
// 合併排序的原理非常簡單。利用指標(Pointer)技巧，組合兩個排序數組的時間複雜度為 O(n)。
// 這種排序演算法是「分治法divide and conquer」的典型例子。
// Big O : O(nlogn)
// Worse Case Performance: O(𝑛 log⁡𝑛)
// Best Case Performance: O(𝑛 log⁡𝑛)
// Average Performance: O(𝑛 log⁡𝑛)

// step1: 將1個length為n的Array拆分成n個length為1的Arrays，這樣每個array都是排序好的
// step2: 將每個length為1的array倆倆合併，利用pointer的概念，i, j分別指向兩個array的index0，
//   如果arr1[i]<arr2[j]的話result.push(arr[i])，i++，反之就是將i改成j，直到i或j大於arr1或arr2的length-1
//   因為arr1 or arr2都是已經排序好的，所以就將另一個array剩餘的element全部push到result array就完成合併了
// step3: 直到兩兩合併出一個length為n的Array

let step = 0;

// 製作兩個小array倆倆合併用的funcion
const merge = function (arr1, arr2) {
  console.log(`[${arr1}], [${arr2}]執行merge函數`);
  // i pointer指向arr1的element
  let i = 0;
  // j pointer指向arr2的element
  let j = 0;
  // result儲存合併的結果
  let result = [];
  // 計算花的步數
  let step = 0;
  // 如果i沒有超出arr1的範圍且j也沒有超過arr2的範圍則while迴圈繼續
  while (i <= arr1.length - 1 && j <= arr2.length - 1) {
    step++;
    // 哪個較小就push到result array中並向右移動
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }

  while (i <= arr1.length - 1) {
    console.log(
      `arr2全部push到result中了，i目前為:${i}(${arr1[i]})，result為:[${result}]`
    );
    result.push(arr1[i]);
    i++;
    step++;
  }

  while (j <= arr2.length - 1) {
    console.log(
      `arr1全部push到result中了，j目前為:${j}(${arr2[j]})，result為:[${result}]`
    );
    result.push(arr2[j]);
    j++;
    step++;
  }

  console.log(`合併後的result為:[${result}]`);
  console.log("=======================================================");
  return result;
};
// console.log(merge([1, 15, 38, 42], [5, 7, 9, 16]));

const mergeSort = function (arr) {
  console.log(`Array:[${arr}]執行mergeSort函數`);
  step++; // 分割的步數
  // 如果arr的長度為1代表這個arr一定是排序好的
  if (arr.length === 1) {
    console.log(`arr:${arr}長度為1`);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    return arr;
  } else {
    // 如果mergeSort的參數arr一直>1的話就會一直執行else，遞迴切割arr直到length===1執行if條件
    // return排序好的length為1的arr才會繼續下一步

    // 找到middle(arr的中間index)
    let middle = Math.floor(arr.length / 2);
    // 將arr分割成left與right兩個array
    let left = arr.slice(0, middle);
    let right = arr.slice(middle, arr.length);
    console.log(`middle:${middle}, left:[${left}], right:[${right}]`);
    console.log("---------------------");
    return merge(mergeSort(left), mergeSort(right));
  }
};
// console.log(mergeSort([1, 15, 38, 42, 5, 7, 9, 16]));
console.log(mergeSort([1, 15, 38, 42, 5, 7, -100, 9, 16, 2]));
console.log(`總共花了${step}步`);
