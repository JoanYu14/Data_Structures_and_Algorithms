// Queue(佇列)
// 理解Queue的原則是「先進先出」（先進先出）
// 元素沒有索引。
// 只能新增到後面並從前面刪除。
// enqueue意味著將某些內容新增到Queue中，dequeue意味著從佇列中刪除某些內容。

// 使用LinkedList製作Queue
class QueueNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.size = 0;
    this.head = null;
    this.tail = null;
  }

  // 新增到最後面
  enqueue(value) {
    let node = new QueueNode(value);
    if (this.size === 0) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.size++;
  }

  // 從最前面取出
  dequeue() {
    let result;
    if (this.size === 0) {
      console.log("dequeue警告: Queue中沒有element");
    } else {
      result = this.head;
      if (this.size === 1) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head.next;
      }
      this.size--;
      return result.value;
    }
  }
}

let queue = new Queue();
queue.enqueue("pencil");
queue.enqueue("pen");
queue.enqueue("stapler");
queue.enqueue("phone");
console.log(queue.dequeue());
console.log(queue.dequeue());
queue.enqueue("tablet");
queue.enqueue("notes");
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());

// pencil
// pen
// stapler
// phone
// tablet
// notes
// dequeue警告: Queue中沒有element
// undefined
