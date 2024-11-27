// Deque也稱為「雙端佇列」。
// 它有點像是堆疊和佇列的混合體。您可以在前面或後面新增和刪除元素，但不能在中間新增和刪除元素。

class DequeNode {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class Deque {
  constructor() {
    this.size = 0;
    // 頭部
    this.front = null;
    // 尾部
    this.rear = null;
  }

  // 將element新增到頭部
  pushFront(value) {
    let node = new DequeNode(value);
    if (this.size === 0) {
      this.front = node;
      this.rear = node;
    } else {
      // 將node.next指向Dequeue原本的front
      node.next = this.front;
      // 將原本的front的prev指向node
      this.front.prev = node;
      // 將front改為node
      this.front = node;
    }
    this.size++;
  }

  // 將element新增到尾部
  pushBack(value) {
    let node = new DequeNode(value);
    if (this.size == 0) {
      this.front = node;
      this.rear = node;
    } else {
      // 將node.prev指向Dequeue原本的rear
      node.prev = this.rear;
      // 將Dequeue原本的reqr.next指向node
      this.rear.next = node;
      // 將Dequeue.rear改成node
      this.rear = node;
    }
    this.size++;
  }

  // 將Deque的頭部刪除並傳回元素。
  popFront() {
    let result;
    if (this.size === 0) {
      console.log("popFront警告:Deque中沒有element");
      return;
    } else if (this.size === 1) {
      result = this.front;
      this.front = null;
      this.rear = null;
      this.size--;
    } else {
      result = this.front;
      result.next.prev = null;
      this.front = result.next;
      result.next = null;
      this.size--;
    }
    return result.value;
  }

  // 從Deque的尾部刪除並傳回元素
  popBack() {
    let result;
    if (this.size === 0) {
      console.log("popBack警告:Deque中沒有element");
      return;
    } else if (this.size === 1) {
      result = this.rear;
      this.rear = null;
      this.front = null;
      this.size--;
    } else {
      result = this.rear;
      result.prev.next = null;
      this.rear = result.prev;
      result.prev = null;
      this.size--;
    }
    return result.value;
  }
}
