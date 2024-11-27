// Linked List (鏈結串列)
/*
在電腦科學中，Linked List(鏈結串列)是資料元素的線性集合，其順序並非由它們在記憶體中的物理位置給出。相反，每個元素都指向下一個元素。 Array
僅包含頭和長度屬性的資料結構。
Linked List(鏈結串列)由節點組成，每個節點都有一個值（數字、字串、陣列或任何東西）和一個指向另一個節點或空的指標。
各節點的資料型態不必一定相同
每個點放在【不同】記憶體位置，不會按線性的順序儲存資料
記憶體非連續，不需事先知道整體資料大小
每一個節點裡存有到下一個節點記憶體位置的 pointer
可以有單向或是雙向的 linked list
能夠被直接存取的節點只有最前面的第一個節點
訪問元素(Accessing Elements) => O(n)
從頭開始插入和刪除(Insert and Remove from the Beginning) => O(1)
從末尾插入和刪除(Insert and Remove from the End) => O(n)
從中間插入和刪除(Insert and Remove from the Middle) => O(n)
*/
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // 添加一個Node到LinkedList的開頭
  unshift(value) {
    let node = new Node(value);

    if (this.length == 0) {
      // 若LinedList的length為0代表這個Node將會是第一個element
      // 那LinkedList的head與tail都會是該Node
      this.head = node;
      this.tail = node;
    } else {
      // 若LinkedList中本來就已有Nodes
      // 先將要添加進來的Node的next指向LinkedList中原本的head
      node.next = this.head;
      // 然後再將LinkedList的head改為該Node
      this.head = node;
    }
    this.length++;
    return;
  }

  // 刪除LinkedList中的第一個Node
  shift() {
    if (this.length == 0) {
      console.log("shift警告: LinkedList中本來就沒有Node");
      return;
    } else {
      let nowHead = this.head;
      // 找到head的nextNode
      let newHead = nowHead.next;
      // 將當前headNode的next設為null
      nowHead.next = null;
      // 將LinkedList的head改為newHead
      this.head = newHead;
      // LinkedList的長度-1
      this.length--;
      // 若shift後length為0那this.tail要改成null
      if (this.length == 0) {
        this.tail = null;
      }
      return nowHead.value;
    }
  }

  // 添加一個Node到LinkedList的最後面
  push(value) {
    let node = new Node(value);
    if (this.length == 0) {
      // 若LinedList的length為0代表這個Node將會是第一個element
      // 那LinkedList的head與tail都會是該Node
      this.head = node;
      this.tail = node;
    } else {
      // 若LinkedList的length不為0
      // 先找到當前LinkedList的tailNode並將目前的tailNode.next指向要添加進來的Node
      this.tail.next = node;
      // 然後將Linked的tail改成添加進來的Node
      this.tail = node;
    }
    this.length++;
    return;
  }

  // 取得LinkedList中特定index的value
  get(index) {
    if (index < 0 || index >= this.length) {
      console.log(`get警告:index${index}不在LinkedList的範圍`);
    } else {
      // 先將currentNode定義為LinkedList的headNode(index=0)
      let currentNode = this.head;
      // i從1開始~index+1結束，每次回圈會將currentNode改為next Node
      // 如果index為0的話該迴圈就不會執行，所以下面會return headNode
      for (let i = 1; i <= index; i++) {
        currentNode = currentNode.next;
      }
      // 迴圈結束後回傳currentNode
      return currentNode.value;
    }
  }

  // 取得LinkedList中特定index的value(此method會return整個Node是讓我用來在其他method中要找特定位置用的，所以定義為private method讓instance不能直接呼叫)
  // #是ES2022 (ECMAScript 2022) 才開始支援的語法，私有字段 (#field), 私有方法 (#method), 私有存取器 (get 和 set 搭配 #field)
  #privateGet(index) {
    if (index < 0 || index >= this.length) {
      console.log(`get警告:index${index}不在LinkedList的範圍`);
    } else {
      // 先將currentNode定義為LinkedList的headNode(index=0)
      let currentNode = this.head;
      // i從1開始~index+1結束，每次回圈會將currentNode改為next Node
      // 如果index為0的話該迴圈就不會執行，所以下面會return headNode
      for (let i = 1; i <= index; i++) {
        currentNode = currentNode.next;
      }
      // 迴圈結束後回傳currentNode
      return currentNode;
    }
  }

  // 更新指定index的value
  set(index, value) {
    if (index < 0 || index >= this.length) {
      console.log(`set警告:index${index}不在LinkedList的範圍`);
    } else {
      let wantUpdateNode;
      // 如果index為LinkedList的length-1代表是tail
      if (index == this.length - 1) {
        wantUpdateNode = this.tail;
      } else {
        // 如果不是的話就用privateGet找到index的Node
        wantUpdateNode = this.#privateGet(index);
        // 將Node的value更新
        wantUpdateNode.value = value;
      }
    }
  }

  // 刪除LinkedList中的最後一個Node
  pop() {
    let result = null;
    if (this.length == 0) {
      console.log("pop警告: LinkedList中本來就沒有Node");
      return result;
    } else if (this.length == 1) {
      result = this.tail;
      // 如果LinkedList中目前只有一個Node的話

      // 將LinkedList的tail與head改成null
      this.tail = null;
      this.head = null;
    } else {
      // 如果LinkedList的length>=2的話
      // 先找到LinkedList中倒數第2個Node
      let lastButOneNode = this.#privateGet(this.length - 2);

      result = lastButOneNode.next;
      // 將倒數第2個Node.next改為null就將最後一個Node從LinkedList中移除了
      lastButOneNode.next = null;
      // 將LinkedList的tail改為倒數第2個Node
      this.tail = lastButOneNode;
    }
    this.length--;
    return result.value;
  }

  // 將Node insert到LinkedList中的指定位置
  insertAt(index, value) {
    let node = new Node(value);
    // index不可以小於0也不可以大於LinkedList的length(ex: length=0, insertAt不能在1)
    if (index < 0 || index > this.length) {
      console.log(
        `insertAt警告:不能insert到index${index}，不在LinkedList的範圍`
      );
      return;
    } else if (index == 0) {
      // 若是要insert到index0那其實就是unshift
      this.unshift(value);
    } else if (index == this.length) {
      // 若是要insert到this.legnth那其實就是push
      this.push(value);
    } else {
      // 先找到LinkedList中要insert到的index的前一個Node
      let exNowIndexNode = this.#privateGet(index - 1);

      // 將要添加進來的Node.next指向LinkedList中index當前Node(前一個Node(exNowIndexNode).next)
      node.next = exNowIndexNode.next;
      // 將insert到的index的前一個Node.next指向要添加進來的node
      exNowIndexNode.next = node;
      this.length++;
    }
  }

  // 將LinkedList中指定index的Node刪除
  removeAt(index) {
    if (index < 0 || index > this.length) {
      console.log(`removeAt警告:index${index}不在LinkedList的範圍`);
      return;
    } else {
      let result;
      if (index == 0) {
        result = this.shift();
      } else if (index == this.length - 1) {
        result = this.pop();
      } else {
        // 先找到要刪除的前一個Node
        let exWantRemoveNode = this.#privateGet(index - 1);
        // 找到要刪除的Node
        let wantRemoveNode = exWantRemoveNode.next;
        // 將要刪除的前一個Node.next改成要刪除的下一個node
        exWantRemoveNode.next = wantRemoveNode.next;
        // 要刪除的Node.next改成null，這樣就將該Node從LinkedList中去除了
        wantRemoveNode.next = null;
        result = wantRemoveNode;
        this.length--;
      }
      return result.value;
    }
  }

  // return LinkedList的length
  size() {
    return this.length;
  }

  // 檢查LinkedList是否為空的
  isEmpty() {
    if (this.length == 0) {
      return true;
    } else {
      return false;
    }
  }

  // 將LinkedList轉為Array
  toArray() {
    const resultArray = [];
    // 定義currentNode為LinkedList的head
    let currentNode = this.head;

    // 如果currentNode為truthy的話就繼續迴圈
    while (currentNode) {
      resultArray.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return resultArray;
  }

  reverse() {
    let prev = null;
    let current = this.head;

    // 修改每個Node，使Node.next指向前一個Node
    while (current) {
      let next = current.next; // 暫存下一個Node
      current.next = prev; // 將當前Node.next指向前一個

      prev = current; // 更新前一個Node為current Node
      current = next; // 移動到下一個Node
    }

    [this.head, this.tail] = [this.tail, this.head]; // 交換 head 和 tail
    return this;
  }

  printAll() {
    let currentNode = this.head;
    console.log(currentNode.value);
    for (let i = 1; i < this.length; i++) {
      currentNode = currentNode.next;
      console.log(currentNode.value);
    }
  }
}
const linkedList = new LinkedList();

const linkedList1 = new LinkedList();
console.log(linkedList1.get(0));
console.log(linkedList1.get(1));

// console.log(linkedList1);
let node1 = new Node("James");
let node2 = new Node("Joan");
console.log("----------- 1.unshift James ----------------------");
linkedList1.unshift(node1);
console.log(linkedList1);
console.log("----------- 2.unshift Joan ----------------------");
linkedList1.unshift(node2);
console.log(linkedList1);
linkedList1.printAll();
console.log("----------- 3.push Kevin ----------------------");
let node3 = new Node("Kevin");
linkedList1.push(node3);
console.log(linkedList1);
console.log(linkedList1.get(1));
console.log("----------- 4.pop ----------------------");
linkedList1.pop();
console.log(linkedList1);
console.log("----------- 5.insertAt(Node,1) ----------------------");
let node4 = new Node("Jessica");
linkedList1.insertAt(node4, 1);
console.log(linkedList1);
// console.log(linkedList1.get(1));
// console.log("----------- 3.shift ----------------------");
// linkedList1.shift();
// console.log(linkedList1);
