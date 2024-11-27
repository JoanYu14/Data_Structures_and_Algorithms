// Doubly-Linked List（雙向鏈結串列）在結構上和 Singly-Linked List 相似，但每個Node有兩個Pointer：一個指向下一個Node（next），另一個指向前一個Node（prev）。
// 優點:
// 1.雙向連結：每個節點有 prev 和 next 指標，允許從任意節點向前或向後遍歷，操作更靈活。
// 2.刪除節點更高效：在知道節點的參考時，可以直接透過 prev 和 next 更新連結，而不需要從頭開始遍歷。
// 3.從尾部操作更高效：由於有 tail，可以快速從尾端插入或刪除節點，而不需要遍歷整個鏈結串列。
// 缺點:
// 1.額外的記憶體需求：每個節點多了一個 prev 指標，增加了記憶體使用量。
// 2.操作複雜性增加：插入、刪除時需要處理兩個指標（prev 和 next），增加了程式的複雜性與出錯風險。
// 3.初始化成本較高：需要額外的程式碼與邏輯來維護 prev 和 next。
// 各種操作的時間複雜度
// 1. 插入 (insert)
// 頭部/尾部插入：O(1)
// 利用 head 或 tail，可以快速進行插入操作。
// 中間插入：O(n)
// 必須先遍歷到指定位置，找到要插入的節點或位置，然後進行插入。
// 2. 刪除 (delete)
// 刪除頭部/尾部節點：O(1)
// 如果刪除的是 head 或 tail，只需要調整 prev 或 next。
// 刪除中間節點：O(n)
// 需要先找到該節點，然後更新其前後節點的指標。
// 3. 查找值的位置 (find):O(n)
// 必須遍歷鏈結串列的每個節點，直到找到匹配的值。
// 4. 查看某位置的值 (peek):O(n)
// 如果位置接近 head 或 tail，可以從兩端開始遍歷減少步數，但平均仍需 O(n)。
// 5. 確認值是否存在 (check exist): O(n)
class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  // 將node添加到DoublyLinkdList的最後
  push(value) {
    let node = new Node(value);
    // length為0代表原本是個emptyDoublyLinkedList，那新增的這個Node既是head也是tail
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      // 將原本的tail.next指向node
      this.tail.next = node;
      // 將該node.prev指向原本的tail
      node.prev = this.tail;
      // 將tail改成該node
      this.tail = node;
    }
    // length+1
    this.length++;
  }

  // 將最後一個node刪除並return
  pop() {
    let popNode;
    if (this.length == 0) {
      // throw new Error("pop警告:DoublyLinkList內沒有Node")
      console.log("pop警告:DoublyLinkList內沒有Node");
      return;
    } else if (this.length == 1) {
      popNode = this.tail;
      // 若length=1代表刪除最後一項的話就變成emptyDoublyLinkedList了
      this.tail = null;
      this.head = null;
    } else {
      // 找到要刪除的popNode(tailNode)
      popNode = this.tail;
      this.tail = popNode.prev;
      // 將倒數第2個Node(popNode.prev)的next改為null
      popNode.prev.next = null;
      // 將popNode.prev改為null
      popNode.prev = null;
    }
    this.length--;
    return popNode.value;
  }

  // 在DoublyLinkedList的head添加一個Node。
  unshift(value) {
    let node = new Node(value);
    if (this.length == 0) {
      this.head = node;
      this.tail = node;
    } else {
      // 將原本headNode.prev指向node
      this.head.prev = node;
      // 將node.next指向原本的headNode
      node.next = this.head;
      // 將head改為指向node
      this.head = node;
    }
    this.length++;
  }

  // 移除並return DoublyLinkedList的headNode。
  shift() {
    let shiftNode;
    if (this.length == 0) {
      // throw new Error("pop警告:DoublyLinkList內沒有Node")
      console.log("shift警告:DoublyLinkList內沒有Node");
      return;
    } else if (this.length == 1) {
      shiftNode = this.head;
      this.head = null;
      this.tail = null;
    } else {
      // shiftNode為原本的head
      shiftNode = this.head;
      // 將head改為shiftNode.next
      this.head = shiftNode.next;
      // 將shiftNode的下一個Node的prev改為null
      shiftNode.next.prev = null;
      // 將shiftNode.next改成null
      shiftNode.next = null;
    }
    this.length--;
    return shiftNode.value;
  }

  // 根據索引取得指定位置的節點
  get(index) {
    let step = 0;
    if (index < 0 || index > this.length - 1) {
      console.log(`get警告:index:${index}不在DoublyLinkList範圍`);
      return;
    } else {
      if (index == 0) {
        return this.head.value;
      } else if (index == this.length - 1) {
        return this.tail.value;
      } else {
        let middle = Math.floor((this.length - 1) / 2);
        // 如果index>middle的話從tail往前找會比較快
        if (index > middle) {
          // stepsFromTail儲存從tail開始的話需要往前幾個才能取得index的值
          let stepsFromTail = this.length - 1 - index;
          // currentNode先定義為this.tail
          let currentNode = this.tail;
          while (stepsFromTail > 0) {
            step++;
            // 每次回圈currentNode都會改為前一個Node
            currentNode = currentNode.prev;
            // stepsFromTail-1
            stepsFromTail--;
          }
          console.log(`index大於middle，花了${step}步`);
          return currentNode.value;
        } else {
          let stepsFromHead = 0 + index;
          let currentNode = this.head;
          while (stepsFromHead > 0) {
            step++;
            currentNode = currentNode.next;
            stepsFromHead--;
          }
          console.log(`index小於middle，花了${step}步`);
          return currentNode.value;
        }
      }
    }
  }

  #privateGet(index) {
    if (index < 0 || index > this.length - 1) {
      console.log(`get警告:index:${index}不在DoublyLinkList範圍`);
      return;
    } else {
      if (index == 0) {
        return this.head;
      } else if (index == this.length - 1) {
        return this.tail;
      } else {
        let middle = Math.floor((this.length - 1) / 2);
        // 如果index>middle的話從tail往前找會比較快
        if (index > middle) {
          // stepsFromTail儲存從tail開始的話需要往前幾個才能取得index的值
          let stepsFromTail = this.length - 1 - index;
          // currentNode先定義為this.tail
          let currentNode = this.tail;
          while (stepsFromTail > 0) {
            // 每次回圈currentNode都會改為前一個Node
            currentNode = currentNode.prev;
            // stepsFromTail-1
            stepsFromTail--;
          }
          return currentNode;
        } else {
          let stepsFromHead = 0 + index;
          let currentNode = this.head;
          while (stepsFromHead > 0) {
            currentNode = currentNode.next;
            stepsFromHead--;
          }
          return currentNode;
        }
      }
    }
  }

  // 修改指定index的nodeValue。
  set(index, value) {
    if (index < 0 || index > this.length - 1) {
      console.log(`set警告:index:${index}不在DoublyLinkList範圍`);
      return;
    } else {
      let wantUpdateNode = this.#privateGet(index);
      wantUpdateNode.value = value;
      return;
    }
  }

  // 在指定index插入一個Node
  insertAt(index, value) {
    if (index < 0 || index > this.length) {
      console.log(`insertAt警告:index:${index}不在DoublyLinkList範圍`);
      return;
    } else {
      if (index == 0) {
        this.unshift(value);
      } else if (index == this.length) {
        this.push(value);
      } else {
        let insertNode = new Node(value);
        // 找到要insert的index原本的Node
        let exInsertIndexNode = this.#privateGet(index - 1);
        // 將要新增的node的prev指向要insert的index原本的Node
        insertNode.prev = exInsertIndexNode;
        // 將要新增的node的next指向要insert的index原本的Node的下一個Node
        insertNode.next = exInsertIndexNode.next;
        // 將要insert的index原本的Node的下一個Node的prev指向新增的Node
        exInsertIndexNode.next.prev = insertNode;
        // 將要insert的index原本的Node的next指向新增的Node
        exInsertIndexNode.next = insertNode;
        this.length++;
      }
    }
  }

  // 移除指定index的Node
  removeAt(index) {
    if (index < 0 || index > this.length - 1) {
      console.log(`removeAt警告:index:${index}不在DoublyLinkList範圍`);
      return;
    } else {
      if (index == 0) {
        this.shift();
      } else if (index == this.length - 1) {
        this.pop();
      } else {
        // 找到要remove的Node
        let wantRemoveNode = this.#privateGet(index);
        // 將要remove的Node的前一個Node的next指向要remove的Node的下一個Node
        wantRemoveNode.prev.next = wantRemoveNode.next;
        // 將要remove的Node的下一個Node的prev指向要remove的Node的上一個Node
        wantRemoveNode.next.prev = wantRemoveNode.prev;
        // 將要remove的Node的next與prev都改為null
        wantRemoveNode.next = null;
        wantRemoveNode.prev = null;
        this.length--;
        return;
      }
    }
  }
}

let list = new DoublyLinkedList();

// 測試 push 和 get
list.push(10);
list.push(20);
list.push(30);
console.log(list.get(0)); // 10
console.log(list.get(2)); // 30

// 測試 pop
console.log(list.pop()); // 30
console.log(list);
console.log(list.get(1)); // 20

// 測試 unshift 和 shift
list.unshift(5);
console.log(list.get(0)); // 5
console.log(list.shift()); // 5
console.log(list.get(0)); // 10

// 測試 insertAt 和 removeAt
list.insertAt(1, 15);
console.log(list.get(1)); // 15
list.removeAt(1);
console.log(list.get(1)); // 20

// 測試 set
list.set(0, 50);
console.log(list.get(0)); // 50

// console.log(list.get(6));
