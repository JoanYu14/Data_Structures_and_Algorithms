// 在實踐中，Insertion Sort(插入排序)比Bubble Sort(冒泡排序)更有效。理論上，它們具有相同的 Big O 值。
// 插入排序的原理很簡單。不斷將新值插入已排序的陣列中。將其插入到正確的位置，以便排序後的陣列保持排序狀態
function insertionSort(arr) {
  // j從1開始的原因是arr的第一項是已經排序好，並且自己就是一個array

  for (let j = 1; j < arr.length; j++) {
    let key = arr[j]; // key就是要被插入到array的
    i = j - 1; // i就是j的前一項，因為key要跟左邊的值做比較
    while (i >= 0 && arr[i] > key) {
      // 如果i>=0就代表還不是第一項，代表key還沒跟array的所有值做比較
      // 如果arr[i]比key大的話
      arr[i + 1] = arr[i]; // arr[i+1]就要變成arr[i]，也就是a[i]往右移動一格
      i--; // i-1，就是key跟左邊的數字比較完了，j越大，要比較的i就越多
    }
    // 比較到i的時候，代表while迴圈已經停止了，就是這個i的值沒有比key大了或者i已經被減到變成-1了(代表key比原本array的第一項還小)
    // 因為前一圈while迴圈的arr[i+1]變成i了，所以這一圈的i+1其實是算是空的(原本的直往後移動了)，key就是要插在這個位子
    arr[i + 1] = key;
  }
  return arr;
}

console.log(insertionSort([14, -4, 17, 6, 22, 1, -5]));
