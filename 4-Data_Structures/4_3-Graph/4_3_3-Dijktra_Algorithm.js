// Dijkstra 演算法是一種用來尋找圖中節點之間最短路徑的演算法。它由電腦科學家 Edsger W. Dijkstra 於 1956 年構思，並於三年後發布。
// 擁有一個接受一個輸入（起始Node）的函數。
// 將最短表中除起始節點以外的所有值設為無窮大。
// 將前一個物件的屬性設為空。
// 只要有我們需要訪問的東西，就計算A到當前節點的距離+當前節點到鄰居的距離，如果小於最短路徑，則更新最短路徑表以及previous表(記錄到某個點最短路徑到最終點的前一個點是哪個)和訪問列表(visited list)。

class Node {
  constructor(value) {
    this.value = value;
    this.visited = false;
    this.edges = [];
    // Node與StartNode的距離
    this.distanceFromStartNode = Infinity;
    // 從StartNode到該Node的前一個Node是甚麼
    this.previous = null;
  }

  addEdges(edge) {
    this.edges.push(edge);
  }
}

class Edge {
  constructor(node, weight) {
    this.node = node;
    this.weight = weight;
  }
}

let A = new Node("A");
let B = new Node("B");
let C = new Node("C");
let D = new Node("D");
let E = new Node("E");
let F = new Node("F");

A.addEdges(new Edge(B, 2));
A.addEdges(new Edge(C, 2));
B.addEdges(new Edge(A, 2));
B.addEdges(new Edge(D, 1));
B.addEdges(new Edge(E, 4));
C.addEdges(new Edge(A, 2));
C.addEdges(new Edge(D, 1));
C.addEdges(new Edge(F, 2));
D.addEdges(new Edge(B, 1));
D.addEdges(new Edge(C, 1));
D.addEdges(new Edge(E, 2));
D.addEdges(new Edge(F, 3));
E.addEdges(new Edge(B, 4));
E.addEdges(new Edge(D, 2));
E.addEdges(new Edge(F, 1));
F.addEdges(new Edge(C, 2));
F.addEdges(new Edge(D, 3));
F.addEdges(new Edge(E, 1));

class MinHeap {
  constructor() {
    this.values = [];
  }

  enqueue(node) {
    // check if the priority queue is empty
    if (this.values.length === 0) {
      this.values.push(node);
      return true;
    }

    this.values.push(node);
    let newIndex = this.values.length - 1;
    let parentIndex = Math.floor((newIndex - 1) / 2);
    while (
      parentIndex >= 0 &&
      this.values[newIndex].distanceFromStartNode <
        this.values[parentIndex].distanceFromStartNode
    ) {
      // swap parent and child
      let result = this.values[parentIndex];
      this.values[parentIndex] = this.values[newIndex];
      this.values[newIndex] = result;
      // update index number
      newIndex = parentIndex;
      parentIndex = Math.floor((newIndex - 1) / 2);
    }
  }

  dequeue() {
    if (this.values.length === 0) {
      return null;
    }
    if (this.values.length === 1) {
      let removedNode = this.values.pop();
      return removedNode;
    }

    // swap two nodes
    let temp = this.values.pop();
    this.values.push(this.values[0]);
    this.values[0] = temp;
    let removedNode = this.values.pop();

    this.minHeapify(0);

    return removedNode;
  }

  minHeapify(i) {
    let smallest;
    let l = i * 2 + 1;
    let r = i * 2 + 2;
    if (
      l <= this.values.length - 1 &&
      this.values[l].distanceFromStartNode <
        this.values[i].distanceFromStartNode
    ) {
      smallest = l;
    } else {
      smallest = i;
    }
    if (
      r <= this.values.length - 1 &&
      this.values[r].distanceFromStartNode <
        this.values[smallest].distanceFromStartNode
    ) {
      smallest = r;
    }

    if (smallest != i) {
      // swap
      let temp = this.values[i];
      this.values[i] = this.values[smallest];
      this.values[smallest] = temp;
      this.minHeapify(smallest);
    }
  }

  // 這個函數是如果node的distanceFromStartNode改變的話，也要改變在minHeap的位置
  decrease_priority(node) {
    // 找到node目前在minHeap的哪個位置
    let newIndex = this.values.indexOf(node);
    let parentIndex = Math.floor((newIndex - 1) / 2);
    // 然後向上做heapify將node移動到minHeap中應在的位置
    while (
      parentIndex >= 0 &&
      this.values[newIndex].distanceFromStartNode <
        this.values[parentIndex].distanceFromStartNode
    ) {
      // swap node and its parent node
      let result = this.values[parentIndex];
      this.values[parentIndex] = this.values[newIndex];
      this.values[newIndex] = result;
      // update index number
      newIndex = parentIndex;
      parentIndex = Math.floor((newIndex - 1) / 2);
    }
  }
}

function Dijkstra(node) {
  let MH = new MinHeap();
  // 將起點node的distanceFromStartNode設為0，visited設為true
  node.distanceFromStartNode = 0;
  node.visited = true;
  MH.enqueue(A);
  MH.enqueue(B);
  MH.enqueue(C);
  MH.enqueue(D);
  MH.enqueue(E);
  MH.enqueue(F);
  // 會從minHeap中取出最小的 => 就是起點node
  // 因為目前除了起點Node外的Node.distanceFromStartNode都是infinity
  let currentNode = MH.dequeue();
  console.log(`初始currentNode: ${currentNode.value}`);

  // 當minHeap中還有node的話就繼續while loop
  while (MH.values.length > 0) {
    console.log(
      `-------------------------------- 當前currentNode為${currentNode.value} --------------------------------`
    );
    // 1. min heap最小值的node => currentNode
    // 2. node鄰居中，沒有拜訪過的node => neighborNode
    // 3. neighborNode.distance > currentNode.distance + weight
    // 4. neighborNode.distance = currentNode.distance + weight
    // neighborNode.previous = currentNode, MH decrease neighborNode's priority

    // 遍歷與currentNode連接的edge
    currentNode.edges.forEach((edge) => {
      // edge.node就是edge所連接的另一個node => neighborNode
      let neighborNode = edge.node;
      console.log(
        `==================================== 與currentNode:${currentNode.value}相鄰的neighborNode:${neighborNode.value} ====================================`
      );
      // 如果neighborNode的visited為false的話
      if (!neighborNode.visited) {
        // 定義d1為neighborNode的distanceFromStartNode，就是目前startNode到neighborNode的最短距離
        let d1 = neighborNode.distanceFromStartNode;
        // d2為currentNode的distanceFromStartNode，就是startNode到curretnNode的距離
        let d2 = currentNode.distanceFromStartNode;
        // d3為edge.weight，就是currentNode到neighborNode的距離
        let d3 = edge.weight;

        // 這邊定義previousNode只是為了讓我console出相關訊息而已
        let previousNode = neighborNode.previous
          ? neighborNode.previous.value
          : null;

        console.log(
          `neighborNode:${neighborNode.value}還未訪問過，目前從startNode:${node.value}的最短路徑為{距離:${d1}, 到neighborNode:${neighborNode.value}的前一個node為${previousNode}}`
        );

        if (d1 > d2 + d3) {
          console.log(
            `startNode到neighborNode:${
              neighborNode.value
            }目前的最短路徑:${d1} > (startNode:${node.value}到currentNode:${
              neighborNode.value
            }的距離 + currentNode:${currentNode.value}到neighborNode:${
              neighborNode.value
            }的距離 = ${d2}+${d3} = ${d2 + d3});
            所以將更新neighborNode的distanceFromStartNode與previous`
          );
          // 如果d1大於d2+d3
          // => 原本startNode到neighborNode的最短距離 > startNode到curretnNode的距離 + currentNode到neighborNode的距離
          // => 更新neightborNode的distanceFromStartNode => 更新startNode到neighborNode的最短距離
          neighborNode.distanceFromStartNode = d2 + d3;
          // neighborNode.previous更新為currentNode，previous就是紀錄到終點(neighbor)前的最後一個node(currentNode)
          neighborNode.previous = currentNode;
          // 移動neighborNode到minHeap的新位置
          MH.decrease_priority(neighborNode);
        } else {
          console.log(
            `startNode到neighborNode:${
              neighborNode.value
            }目前的最短路徑:${d1} < (startNode:${node.value}到currentNode:${
              neighborNode.value
            }的距離 + currentNode:${currentNode.value}到neighborNode:${
              neighborNode.value
            }的距離 = ${d2}+${d3} = ${d2 + d3}); 不做更新`
          );
        }
      }
    });

    console.log(`currentNode:${currentNode.value}的neighborNode已遍歷完`);
    // currentNode更新為minHeap中目前最小的node(distanceFromStartNode最小的)
    currentNode = MH.dequeue();
    // 將currentNode.visited改為true
    currentNode.visited = true;
    console.log();
  }
}

Dijkstra(A);
console.log("A's information");
console.log(A.distanceFromStartNode);
console.log(A.previous);
console.log("B's Info");
console.log(B.distanceFromStartNode);
console.log(B.previous.value);
console.log("C's Info");
console.log(C.distanceFromStartNode);
console.log(C.previous.value);
console.log("D's Info");
console.log(D.distanceFromStartNode);
console.log(D.previous.value);
console.log("E's Info");
console.log(E.distanceFromStartNode);
console.log(E.previous.value);
console.log("F's Info");
console.log(F.distanceFromStartNode);
console.log(F.previous.value);
