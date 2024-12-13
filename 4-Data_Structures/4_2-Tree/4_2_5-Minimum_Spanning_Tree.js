// Minimum Spanning Tree 最小生成樹
// 如果你有一個圖，然後選擇性地刪除邊（不刪除節點），使其形成一棵樹，剩下的就是生成樹
// 然而，最小生成樹是一種邊(edges)的總權重(weight)最小的樹。 （這假設一個加權圖(weighted graph)；即每個邊都有一個「權重」或與之相關的成本的圖。）

// 普林演算法（英語：Prim's algorithm）是圖論中的一種貪婪演算法，可在一個加權連通圖中找到其最小生成樹。意即由此演算法搜索到的邊子集所構成的樹中，不但包括了連通圖裡的所有頂點，且其所有邊的權值之和亦為最小。
// 從任何我們想要的Node開始
// 追蹤哪些節點已被存取。
// 保留edges清單。 （這些是我們在建構 MST 時使用的邊。）
// 對於已存取節點但不在 MST 邊列表中的所有邊，找到不建立環的最小加權邊，並將該邊新增至 MST 邊列表。 （記住，MST是一棵樹，它應該是非循環的。）（如果最小權值圖連接到MST數組中的兩個節點，那麼邊將創建一個循環）
// 繼續這樣做，直到我們遇到最小加權邊將 100% 創建循環的情況。 （這意味著該圖中的所有節點都在 MST 數組中）如果我們到達這一點，則停止。
class Node {
  constructor(val) {
    this.val = val;
    // 該屬性儲存有沒有拜訪過(MST Edge)
    this.visited = false;
    // 每個Node都會連接到多個edges
    this.edges = [];
  }

  addNeighbor(edge) {
    this.edges.push(edge);
  }
}

// 製作Edge Class
class Edge {
  constructor(node1, node2, weight) {
    this.node1 = node1;
    this.node2 = node2;
    this.weight = weight;
  }
}

// ======================== 第1次:自己實作的的Prim's Alogrithm Minimum Spanning Tree起始 ========================
const getBestEdge = function (mstEdgeList) {
  // 使用該變數儲存當前mstEdgeList中所含的nodes
  let visitedNodes = [];
  // 先看mstEdgeList中已訪問過哪些node
  mstEdgeList.forEach((edge) => {
    if (!visitedNodes.includes(edge.node1)) {
      visitedNodes.push(edge.node1);
    }
    if (!visitedNodes.includes(edge.node2)) {
      visitedNodes.push(edge.node2);
    }
  });
  console.log("已拜訪過的Node:");
  console.log(visitedNodes);

  // 先預設bestEdge為null
  let bestEdge = null;
  for (
    let currentNodeIndex = 0;
    currentNodeIndex < visitedNodes.length;
    currentNodeIndex++
  ) {
    for (let i = 0; i < visitedNodes[currentNodeIndex].edges.length; i++) {
      if (
        !bestEdge &&
        (!visitedNodes[currentNodeIndex].edges[i].node1.visited ||
          !visitedNodes[currentNodeIndex].edges[i].node2.visited)
      ) {
        // 如果bestEdge目前還為null且當前遍歷到的edge其中一個node還沒拜訪過的話就將該edge設為bestEdge
        bestEdge = visitedNodes[currentNodeIndex].edges[i];
      } else if (
        (!visitedNodes[currentNodeIndex].edges[i].node1.visited ||
          !visitedNodes[currentNodeIndex].edges[i].node2.visited) &&
        visitedNodes[currentNodeIndex].edges[i].weight < bestEdge.weight
      ) {
        // 如果bestEdge已不為null
        // 且當前遍歷到的edge其中一個node還沒拜訪過且weight小於bestEdge.weight的話就將該edge設為bestEdge
        bestEdge = visitedNodes[currentNodeIndex].edges[i];
      }
    }
  }

  // 回傳bestEdge
  return bestEdge;
};

const mstPrim = function (startNode) {
  // 定義mstEdgeList為空陣列
  let mstEdgeList = [];
  // 定義firstEdge為null
  let firstEdge = null;
  // 先找到startNode的bestEdge為何(first best edge)
  for (let i = 0; i < startNode.edges.length; i++) {
    if (!firstEdge) {
      firstEdge = startNode.edges[i];
    } else if (startNode.edges[i].weight < firstEdge.weight) {
      firstEdge = startNode.edges[i];
    }
  }
  if (firstEdge) {
    console.log("第一個mstEdge");
    console.log(firstEdge);
    firstEdge.node1.visited = true;
    firstEdge.node2.visited = true;
    mstEdgeList.push(firstEdge);
  } else {
    // 如果firstEdge為null的話代表沒有任何邊
    return "沒有任何edge";
  }
  // 先預設finish為false
  let finish = false;
  // 如果finish為false代表還沒有全部Node都遍歷則繼續whileLoop
  while (!finish) {
    let bestEdge = getBestEdge(mstEdgeList);
    console.log(`bestEdge:`);
    console.log(bestEdge);
    if (!bestEdge) {
      // 如果bestEdge為null的話代表所有Nodes都訪問過了，已找到minimum spanning tree
      finish = true;
    } else {
      // 否則將找到的bestEdge添加到mstEdgeList中
      mstEdgeList.push(bestEdge);
      if (!bestEdge.node1.visited) {
        bestEdge.node1.visited = true;
      } else {
        bestEdge.node2.visited = true;
      }
      // 會繼續whileLoop
    }
    console.log(`當前mstEdgeList:[${mstEdgeList}]`);
    console.log("======================================");
  }
  // whileLoop結束後return mstEdgeList
  return mstEdgeList;
};
// ======================== 第1次:自己第2次實作的的Prim's Alogrithm Minimum Spanning Tree結束 ========================

// ======================== 第2次:自己第2次實作的的Prim's Alogrithm Minimum Spanning Tree起始 ========================
// 使用minHeap製作priority Queue來儲存edge，讓選擇bestEdge的效率提高
class PriorityQueueEdges {
  constructor() {
    this.edges = [];
  }

  minHeapify(parentNodeIndex) {
    let left = parentNodeIndex * 2 + 1;
    let right = parentNodeIndex * 2 + 2;
    let smallest = parentNodeIndex;
    if (
      left < this.edges.length &&
      this.edges[smallest].weight > this.edges[left].weight
    ) {
      smallest = left;
    }

    if (
      right < this.edges.length &&
      this.edges[smallest].weight > this.edges[right].weight
    ) {
      smallest = right;
    }

    if (smallest !== parentNodeIndex) {
      let temp = this.edges[parentNodeIndex];
      this.edges[parentNodeIndex] = this.edges[smallest];
      this.edges[smallest] = temp;
      this.minHeapify(smallest);
    }
  }

  dequeue() {
    if (this.edges.length === 0) {
      console.log("priorityQueue中已經沒有edge了");
      // 如果return null的話代表所有node都訪問過了
      return null;
    } else if (this.edges.length === 1) {
      return this.edges.pop();
    } else {
      // 將rootNode與最後一個Node交換，然後將NodePop出來再對root做minHeapify
      let temp = this.edges[this.edges.length - 1];
      this.edges[this.edges.length - 1] = this.edges[0];
      this.edges[0] = temp;
      let smallestEdge = this.edges.pop();
      this.minHeapify(0);
      return smallestEdge;
    }
  }

  enqueue(edge) {
    if (this.edges.length === 0) {
      this.edges.push(edge);
      return;
    }

    // 先將edge新增到最後面
    this.edges.push(edge);
    // 找到新edge的index
    let enqueueIndex = this.edges.length - 1;
    // 找到該edge的parentIndex
    let parentIndex = Math.floor((enqueueIndex - 1) / 2);

    while (
      parentIndex >= 0 &&
      this.edges[parentIndex].weight > this.edges[enqueueIndex].weight
    ) {
      let temp = this.edges[enqueueIndex];
      this.edges[enqueueIndex] = this.edges[parentIndex];
      this.edges[parentIndex] = temp;
      // 更新enqueueIndex與parentIndex
      enqueueIndex = parentIndex;
      parentIndex = Math.floor((enqueueIndex - 1) / 2);
    }
  }
}

const betterMstPrim = function (startNode) {
  let edgesPriorityQueue = new PriorityQueueEdges();
  let mstEdgesList = [];
  // 先將起始Node的所有edge enqueue到priorityQueue中
  startNode.edges.forEach((edge) => {
    edgesPriorityQueue.enqueue(edge);
  });
  while (edgesPriorityQueue.edges.length > 0) {
    // 先找到目前priorityQueue中第一個edge(weight最小的)
    let nowBestEdge = edgesPriorityQueue.dequeue();
    if (!nowBestEdge.node1.visited || !nowBestEdge.node2.visited) {
      // 如果nowBestEdge的node1或node2還沒訪問過那代表這就是mstEdges之一
      mstEdgesList.push(nowBestEdge);
      // 將edge連接的Node.visited都改成true，然後將新的Node的edges中不在priorityQueue與mstEdgesList中的enqueue進去
      if (!nowBestEdge.node1.visited) {
        nowBestEdge.node1.visited = true;
        nowBestEdge.node1.edges.forEach((edge) => {
          if (
            !edgesPriorityQueue.edges.includes(edge) &&
            !mstEdgesList.includes(edge)
          ) {
            edgesPriorityQueue.enqueue(edge);
          }
        });
      }
      if (!nowBestEdge.node2.visited) {
        nowBestEdge.node2.visited = true;
        nowBestEdge.node2.edges.forEach((edge) => {
          if (
            !edgesPriorityQueue.edges.includes(edge) &&
            !mstEdgesList.includes(edge)
          ) {
            edgesPriorityQueue.enqueue(edge);
          }
        });
      }
      console.log("找到的bestEdge:");
      console.log(nowBestEdge);
      console.log("=====================");
    }
  }

  return mstEdgesList;
};
// ======================== 第2次:自己第2次實作的的Prim's Alogrithm Minimum Spanning Tree結束 ========================

// 先製作Node
let A = new Node("A");
let B = new Node("B");
let C = new Node("C");
let D = new Node("D");
let E = new Node("E");
let F = new Node("F");

// 製作edge1並連接AB Node
let edge1 = new Edge(A, B, 10);
A.addNeighbor(edge1);
B.addNeighbor(edge1);

let edge2 = new Edge(B, D, 6);
B.addNeighbor(edge2);
D.addNeighbor(edge2);

let edge3 = new Edge(B, E, 7);
B.addNeighbor(edge3);
E.addNeighbor(edge3);

let edge4 = new Edge(D, E, 4);
D.addNeighbor(edge4);
E.addNeighbor(edge4);

let edge5 = new Edge(E, F, 1);
E.addNeighbor(edge5);
F.addNeighbor(edge5);

let edge6 = new Edge(D, F, 3);
D.addNeighbor(edge6);
F.addNeighbor(edge6);

let edge7 = new Edge(F, C, 8);
F.addNeighbor(edge7);
C.addNeighbor(edge7);

let edge8 = new Edge(D, C, 5);
D.addNeighbor(edge8);
C.addNeighbor(edge8);

let edge9 = new Edge(A, C, 8);
A.addNeighbor(edge9);
C.addNeighbor(edge9);

// let result = mstPrim(A);
// console.log(result);
// [
//   Edge {
//     node1: Node { val: 'A', visited: true, edges: [Array] },
//     node2: Node { val: 'C', visited: true, edges: [Array] },
//     weight: 8
//   },
//   Edge {
//     node1: Node { val: 'D', visited: true, edges: [Array] },
//     node2: Node { val: 'C', visited: true, edges: [Array] },
//     weight: 5
//   },
//   Edge {
//     node1: Node { val: 'D', visited: true, edges: [Array] },
//     node2: Node { val: 'F', visited: true, edges: [Array] },
//     weight: 3
//   },
//   Edge {
//     node1: Node { val: 'E', visited: true, edges: [Array] },
//     node2: Node { val: 'F', visited: true, edges: [Array] },
//     weight: 1
//   },
//   Edge {
//     node1: Node { val: 'B', visited: true, edges: [Array] },
//     node2: Node { val: 'D', visited: true, edges: [Array] },
//     weight: 6
//   }
// ]

let result2 = betterMstPrim(A);
console.log(result2);

// let ans = true;

// for (let i = 0; i < result.length && i < result2.length; i++) {
//   if (result[i] !== result2[i]) {
//     ans = false;
//   }
// }

// console.log(ans);
