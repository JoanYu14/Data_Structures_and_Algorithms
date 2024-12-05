// Priority Queue(優先佇列)
// 在電腦科學中，優先佇列(Priority Queue)是一種類似於常規佇列(Regular Queue)的抽象資料類型，其中每個元素還具有與其關聯的「優先權priority」屬性。
// 具有較高優先順序的元素先於具有較低優先順序的元素被服務。 （就像醫院的急診室一樣）。
// 既然優先佇列(Priority Queue)是一個概念，我們通常會用Max Heap來實作，Max Heap是一棵二元樹，其父節點(parent)始終大於右子節點(right node)和左子節點(left node)。
// 使用Max Heap的Priority Queue列的Enqueue和Dequeue的Big O。
//     Enqueue：O(logn)
//     Dequeue：O(logn)
// 使用Array或LinkedList進行Priority Queue的Enqueue和Dequeue的Big O。
//     Enqueue：O(n)（對接近排序好的陣列使用insertion sort）
//     Dequeue：O(1) 或 O(n)（LinkedList 或 Array）

class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.nodes = [];
  }

  // heapfyDown:下移操作，讓dequeue後的heap維持max heap，這個操作就像在heap sort做的
  dequeueMaxHeapify(parentNodeIndex) {
    // 找到childNodes
    let left = parentNodeIndex * 2 + 1;
    let right = parentNodeIndex * 2 + 2;
    let largest = parentNodeIndex;

    // 去比較parentNode的priority與children的priority
    if (
      left < this.nodes.length &&
      this.nodes[largest].priority < this.nodes[left].priority
    ) {
      console.log(
        `largest[${largest}]:${this.nodes[largest].val}的pariority:${this.nodes[largest].priority} 小於 leftChild:${this.nodes[left].val}的pariority:${this.nodes[left].priority}`
      );
      largest = left;
    }
    if (
      right < this.nodes.length &&
      this.nodes[largest].priority < this.nodes[right].priority
    ) {
      console.log(
        `largest[${largest}]:${this.nodes[largest].val}的pariority:${this.nodes[largest].priority} 小於 rightChild:${this.nodes[right].val}的pariority:${this.nodes[right].priority}`
      );
      largest = right;
    }
    if (largest !== parentNodeIndex) {
      let temp = this.nodes[largest];
      this.nodes[largest] = this.nodes[parentNodeIndex];
      this.nodes[parentNodeIndex] = temp;
      console.log(`由於交換了，所以要再對index:${largest}做maxHeapify`);
      this.dequeueMaxHeapify(largest);
    }
    console.log();
  }

  // heapfyUp:上移操作，讓equeue的Node符合 Max Heap 性質
  enqueueMaxHeapify(childNodeIndex) {
    // 先找到parentNode的index
    let parentNodeIndex = Math.floor((childNodeIndex - 1) / 2);
    if (
      this.nodes[parentNodeIndex].priority < this.nodes[childNodeIndex].priority
    ) {
      // 如果parentNode的priority比childNode的priority小的話就互換
      let temp = this.nodes[childNodeIndex];
      this.nodes[childNodeIndex] = this.nodes[parentNodeIndex];
      this.nodes[parentNodeIndex] = temp;
      if (parentNodeIndex != 0) {
        // 如果parentNodeIndex不為0的話就代表swap後還要繼續往上做maxHeapify，直到換到最上方或者往上一個parentNode的priority比enqueue的priority大
        this.enqueueMaxHeapify(parentNodeIndex);
      }
    }
  }

  // 在priorityQueue中新增一個Node
  enqueue(value, priority) {
    const node = new Node(value, priority);
    // 先將node新增到nodes的最後面
    this.nodes.push(node);
    if (this.nodes.length === 1) {
      // 如果insert的是第一個Node的話就不用做maxHeapify了
      console.log("insert: 這是priorityQueue中的第一個node");
      return;
    }
    // 找到新增的node是在甚麼index
    let insertIndex = this.nodes.length - 1;

    // 向上做maxHeapify
    this.enqueueMaxHeapify(insertIndex);
  }

  // 從Priority Queue中取出第一個Node
  dequeue() {
    if (this.nodes.length === 0) {
      console.log("Priority Queue中沒有Node，無法dequeue");
      return false;
    } else if (this.nodes.length === 1) {
      console.log(`dequeue後Priority Queue中沒有Node了，不需要做maxHeapify`);
      return this.nodes.pop();
    } else {
      // 將root與最後一個node交換
      let temp = this.nodes[0];
      this.nodes[0] = this.nodes[this.nodes.length - 1];
      this.nodes[this.nodes.length - 1] = temp;
      // 將最後一個node取出
      let result = this.nodes.pop();
      // 交換後root就不是最大的了，所以要對root再做maxHeapify
      this.dequeueMaxHeapify(0);
      return result;
    }
  }
}

const newPriorityQueue = new PriorityQueue();
newPriorityQueue.enqueue("A", 7);
newPriorityQueue.enqueue("B", 10);
newPriorityQueue.enqueue("C", -3);
newPriorityQueue.enqueue("D", 16);
newPriorityQueue.enqueue("E", 12);
console.log(newPriorityQueue.nodes);
// [
//     Node { val: 'D', priority: 16 },
//     Node { val: 'E', priority: 12 },
//     Node { val: 'C', priority: -3 },
//     Node { val: 'A', priority: 7 },
//     Node { val: 'B', priority: 10 }
//   ]
console.log(newPriorityQueue.dequeue());
console.log(newPriorityQueue.nodes);
// [
//     Node { val: 'E', priority: 12 },
//     Node { val: 'B', priority: 10 },
//     Node { val: 'C', priority: -3 },
//     Node { val: 'A', priority: 7 }
//   ]
