// Heap Sort
// Heap Sort（堆積排序）是一種基於「堆積樹」的排序演算法。它的主要概念是透過使用「最大堆」（Max-Heap）或「最小堆」（Min-Heap）結構來進行排序，達到 O(nlog⁡n)的時間複雜度。堆排序是原地排序（in-place sorting），且不需要額外的儲存空間，具有穩定的效能。
// Heap Sort主要分為兩個步驟：「建堆build heap」和「排序sort」。
// 1. 建堆(Build Heap)
//  將無序陣列調整為最大堆(Max Heap)。
//  從最後一個非葉子節點開始，逐一向上調整，使每個subtree都滿足最大堆(max heap)性質。
//  建堆的時間複雜度為 O(n)。
// 2. 排序（Heapify and Sort）：
//  每次將堆頂元素（最大值root）與堆的最後一個元素交換，使最大元素放到array的最後，然後將heapSize-1(將最後一個元素從Heap中排除)。
//  縮小堆的範圍，排除已排好的元素，並對新的堆頂(root)進行「堆化」（Heapify就是排序build max heap）調整，使其恢復最大堆max heap性質。
//  重複此步驟直至所有元素排序完畢。
//  排序過程的時間複雜度為 O(nlogn)。

// 需要製作3個Function
// 1. buildMaxHeap() => 用來將無序Array變成MAX HEAP，會去呼叫maxHeapify(i)
// 2. maxHeapify(i) => 參數i為subtree的root node index，用來跟child node比較是否要swap，若是swap了還要繼續遞迴執行maxHeapify確認互換後再跟child node比較
// 3. heapSort() => 此function第一件事就是呼叫buildMaxHeap()來將Array變成MAX HEAP，然後將index 0(max heap中最大值(root node))與max heap最後一個element做互換，然後再對新的index0做heapify

// i為目前這個subtree的root node的index
const maxHeapify = function (i) {
  console.log(`目前Subtree的index:${i}, value:${arr[i]}`);
  // parent node的left與right分別會是i*2+1與i*2+2
  let left = i * 2 + 1;
  let right = i * 2 + 2;
  console.log(
    `這個Subtree的left node為{index:${left}, value:${arr[left]}}; right node為{index:${right}, value:${arr[right]}}`
  );
  // largest紀錄這個subtree中max value的index (i or left or right)，目前預設為i
  let largest = i;
  // 若left>heapSize-1的話代表left node並不存在，i並沒有child node(因為在heap sort的過程會先取出right node所以其實沒有left node的話也不會有right node)
  // 若arr[largest] 小於 arr[left]的話largest要變成left這個index
  // heapSize是global variable
  if (left <= heapSize - 1 && arr[largest] < arr[left]) {
    console.log(
      `原本的largest為{index:${largest}, value${arr[largest]}} < left{index:${left}, value:${arr[left]}}，所以largest變成left index`
    );

    largest = left;
  }
  // 若arr[largest] 小於 arr[right]的話largest要變成right這個index，這樣就執行完parent node與left right兩個child node的比較了
  if (right <= heapSize - 1 && arr[largest] < arr[right]) {
    console.log(
      `原本的largest為{index:${largest}, value${arr[largest]}} < right{index:${right}, value:${arr[right]}}，所以largest變成right index`
    );
    largest = right;
  }
  // 如果largest不為i的話代表有child node比parent node大，那就要swap(往下換)
  if (largest != i) {
    console.log(
      `原本的parent node為{index:${i}, value:${arr[i]}}，比child node{index:${largest}, value:${arr[largest]}}小，所以要互換`
    );
    console.log("--------------------------------------");

    let temp = arr[i];
    // parent node這個index的value要換成arr[largest]，largest index有可能是left node OR right node的index
    arr[i] = arr[largest];
    arr[largest] = temp;
    // 此時largest這個index是原本的left or right node的index，因為已經與原本subtree的最大值互換了，所以要再去確認這個value是否有比child node的value大
    // 也就是要再遞迴地去做maxHeapify，直到為subtree的最大值或是已經往下堆到下面沒有child node了
    maxHeapify(largest);
  } else {
    console.log(
      `原本的parent node為{index:${i}, value:${arr[i]}}就是substree中最大的`
    );
    console.log("--------------------------------------");
  }
};

const buildMaxHeap = function () {
  // heapSize為heap的element數量
  // i的初始值為Math.floor(heapSize/2)-1是因為binary tree中最後一個subtree(右下角)的root node剛好會是Math.floor(heapSize/2)-1
  for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
    maxHeapify(i);
  }
  console.log(`Max Heap為:[${arr}]`);
  console.log("=============================");
};

const heapSort = function () {
  // 先把未排序Array(Binary Tree)變成Max Heap
  buildMaxHeap();
  // i的初始值為heapSize-1 => Heap的最後一個index(Max Heap的最右下角)
  // i一直會是Heap的最後一個index因為0與i互換後heapSize會-1(將heap的大小減1(去掉最後一個))
  for (let i = heapSize - 1; i >= 0; i--) {
    let temp = arr[0];
    // 將max heap的root與arr[i](最後一個element)互換
    arr[0] = arr[i];
    arr[i] = temp;
    console.log(`index:${i}為${arr[i]}，為倒數第${arr.length - i}大的value`);
    // 將heapSize減1(去掉最後一個element，因為最後一個是已經排好了，heapify要將這個element排除在外略過)
    heapSize--;
    console.log(`目前的arr為[${arr}]`);
    console.log(`目前的heap為[${arr.slice(0, heapSize)}]`);
    console.log("++++++++++++++++++++ 進行maxHeapify ++++++++++++++++++++++");
    // 因為原本最後一個element與root互換了，所以要再對root index(0)做heapify，往下換到正確的地方
    maxHeapify(0);
    console.log("++++++++++++++++++++ 進行完maxHeapify ++++++++++++++++++++++");
    console.log(`再次進行maxHeapify後為[${arr.slice(0, heapSize)}]`);
  }
  // 最後會得到一個由小~大排序的array
  return arr;
};

let arr = [6, 13, 10, 4, 1, 5, 2, 8, 14, 9, 11, 7, 3, 15, 12];
let heapSize = arr.length;

console.log(heapSort());
