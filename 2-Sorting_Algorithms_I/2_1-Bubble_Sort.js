// Bubble Sort(泡泡排序法or冒泡排序法)
// 冒泡排序比較相鄰元素，如果順序錯誤則交換它們。
// 這種簡單的演算法在現實世界中表現不佳，主要用作教育工具。
// Python 和 Java 等流行程式語言中內建的排序庫使用更有效率的演算法，例如Quick Sort快速排序或Merge Sort合併排序。
// Worst Case Performance: O(𝑛^2)
// Best Case Performance: O(𝑛)
// Average performance	O(𝑛^2)

function bubbleSort(arr) {
  let step = 0;
  // i就是第index為i的被排序好的項目，因為arr的最後一項(index為長度-1)不用做排序，所以到arr的倒數第2項就好了
  // 因為j會到length-1，而這個j會跟length-2做排序，所以i只要到length-2就好了
  for (let i = 0; i < arr.length - 2; i++) {
    let swapping = false; // 優化 : 判斷arr是否已經排序好，在每次i迴圈都會定義swapping為false
    // j就是要與前一項做比較的那個，所以是從arr的最後一項到i+1項，是i+1是因為j要與j-1做比較，j-1最後一次就是第i項。
    for (let j = arr.length - 1; j >= i + 1; j--) {
      step++;
      console.log(`j-1:${j - 1}=${arr[j - 1]} ; j:${j}=${arr[j]}`);
      if (arr[j - 1] > arr[j]) {
        console.log(`${arr[j - 1]} > ${arr[j]}`);
        console.log(`交換前: ${arr}`);
        let temp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = temp;
        swapping = true; // 如果這次i迴圈的內圈有做交換，那swapping就變成true
        console.log(`交換後: ${arr}`);
      }
    }
    if (swapping == false) {
      // 如果有i迴圈執行完j迴圈，swapping都為false的話，代表這個arr已經被排序完成了，那就停止i迴圈
      break;
    }
    console.log();
  }
  return { arr, step };
}

function bubbleSortDontUseSwapping(arr) {
  let step = 0;

  // i就是第index為i的被排序好的項目，因為arr的最後一項(index為長度-1)不用做排序，所以到arr的倒數第2項就好了
  // 因為j會到length-1，而這個j會跟length-2做排序，所以i只要到length-2就好了
  for (let i = 0; i < arr.length - 2; i++) {
    // j就是要與前一項做比較的那個，所以是從arr的最後一項到i+1項，是i+1是因為j要與j-1做比較，j-1最後一次就是第i項。
    for (let j = arr.length - 1; j >= i + 1; j--) {
      step++;
      console.log(`j-1:${j - 1}=${arr[j - 1]} ; j:${j}=${arr[j]}`);
      if (arr[j - 1] > arr[j]) {
        console.log(`${arr[j - 1]} > ${arr[j]}`);
        console.log(`交換前: ${arr}`);
        let temp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = temp;
        console.log(`交換後: ${arr}`);
      }
    }

    console.log();
  }
  return { arr, step };
}

const bubbleSortResult1 = bubbleSort([3, 2, 6, 1, 5]);
const bubbleSortResult2 = bubbleSort([1, 2, 3, 4, 5]);
const bubbleSortDontUseSwappingResult1 = bubbleSortDontUseSwapping([
  3, 2, 6, 1, 5,
]);
const bubbleSortDontUseSwappingResult2 = bubbleSortDontUseSwapping([
  1, 2, 3, 4, 5,
]);

console.log(
  `bubbleSortReulst1總共花了${bubbleSortResult1.step},結果:${bubbleSortResult1.arr}`
); // bubbleSortReulst1總共花了9,結果:1,2,3,5,6

console.log(
  `bubbleSortDontUseSwappinResult1總共花了${bubbleSortDontUseSwappingResult1.step},結果:${bubbleSortDontUseSwappingResult1.arr}`
); // bubbleSortDontUseSwappinResult1總共花了9,結果:1,2,3,5,6
console.log(
  `bubbleSortReulst2總共花了${bubbleSortResult2.step},結果:${bubbleSortResult2.arr}`
); // bubbleSortReulst2總共花了4,結果:1,2,3,4,5
console.log(
  `bubbleSortDontUseSwappinResult2總共花了${bubbleSortDontUseSwappingResult2.step},結果:${bubbleSortDontUseSwappingResult2.arr}`
); // bubbleSortDontUseSwappinResult2總共花了9,結果:1,2,3,4,5
