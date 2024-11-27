// Stack(堆疊)
// Stack為抽象的資料類型
// 如果想將某些內容新增至stack中，請將其新增至頂部。
// 如果想從stack中刪除某些內容，請刪除頂部的項目。
// 理解Stack的原則是「LIFO」（後進先出）
// 元素沒有索引。
// 只能新增到頂部和從頂部刪除。
// Stack只有pop與push兩個method

// 使用LinkedList製作Stack
class StackNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.size = 0;
  }

  push(value) {
    let node = new StackNode(value);
    if (this.size === 0) {
      this.top = node;
    } else {
      node.next = this.top;
      this.top = node;
    }
    this.size++;
  }

  pop() {
    let result;
    if (this.size === 0) {
      console.log("pop警告:Stack中沒有任何element");
      return result;
    } else if (this.size === 1) {
      result = this.top;
      this.top = null;
      this.size--;
      return result.value;
    } else {
      result = this.top;
      this.top = this.top.next;
      result.next = null;
      this.size--;
      return result.value;
    }
  }
}

let stack = new Stack();
stack.push("flour");
stack.push("milk");
stack.push("eggs");
console.log(stack.pop()); // eggs
stack.push("leavening");
stack.push("sugar");
console.log(stack.pop()); // sugar
console.log(stack.pop()); // leavening
// console.log(stack.size);
