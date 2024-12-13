class Node {
  constructor(val) {
    this.val = val;
    this.neighbors = [];
    this.visited = false;
  }

  addNeighbor(node) {
    this.neighbors.push(node);
  }
}

// 這是一個Recursion
const DFT = function (node, result = []) {
  // 將當前node push到result中
  result.push(node.val);
  // 將當前node的visited改為true
  node.visited = true;
  // 遍歷當前node的neighbor
  node.neighbors.forEach((neighbor, index) => {
    console.log("==============================");
    console.log(
      `當前node:${node.val}，node的第${index}的neighbor:${neighbor.val}`
    );
    // 如果當前這個neighbor.visited為false，就對他做DFT
    // 就是它會往深處繼續前進，直到沒有未拜訪過的再退回來，往另一個neighbor前進
    if (!neighbor.visited) {
      console.log(
        `當前node:${node.val}，node的第${index}的neighbor:${neighbor.val}未拜訪過`
      );
      DFT(neighbor, result);
    } else {
      console.log(
        `當前node:${node.val}，node的第${index}的neighbor:${neighbor.val}已拜訪過了`
      );
    }
  });

  return result;
};

const BFT = function (starter) {
  let queue = [];
  let result = [];
  // 將starter push到queue中
  queue.push(starter);
  starter.visited = true;
  console.log(`起始Node為:${starter.val}`);
  while (queue.length > 0) {
    console.log("============================");
    // 取出queue的第一個Node
    let firstNode = queue.shift();
    console.log(`當前node:${firstNode.val}`);
    // 將該node push到reuslt中
    result.push(firstNode.val);
    // 遍歷該node的neighbor
    firstNode.neighbors.forEach((node, index) => {
      if (!node.visited) {
        console.log(
          `node:${firstNode.val}的第${index}個neighbor:${node.val}並未拜訪過`
        );
        queue.push(node);
        node.visited = true;
      } else {
        console.log(
          `node:${firstNode.val}的第${index}個neighbor:${node.val}已經拜訪過了`
        );
      }
    });
  }
  return result;
};

let A = new Node("A");
let B = new Node("B");
let C = new Node("C");
let D = new Node("D");
let E = new Node("E");
let F = new Node("F");
let G = new Node("G");
let H = new Node("H");
let I = new Node("I");
let J = new Node("J");
let K = new Node("K");
let L = new Node("L");
let M = new Node("M");

A.addNeighbor(E);
A.addNeighbor(F);
B.addNeighbor(D);
C.addNeighbor(D);
D.addNeighbor(B);
D.addNeighbor(C);
D.addNeighbor(E);
D.addNeighbor(I);
E.addNeighbor(A);
E.addNeighbor(D);
E.addNeighbor(F);
E.addNeighbor(I);
F.addNeighbor(A);
F.addNeighbor(E);
F.addNeighbor(I);
G.addNeighbor(H);
G.addNeighbor(I);
H.addNeighbor(G);
H.addNeighbor(I);
H.addNeighbor(L);
I.addNeighbor(D);
I.addNeighbor(E);
I.addNeighbor(F);
I.addNeighbor(G);
I.addNeighbor(H);
I.addNeighbor(J);
I.addNeighbor(K);
I.addNeighbor(M);
J.addNeighbor(I);
J.addNeighbor(M);
K.addNeighbor(I);
K.addNeighbor(L);
K.addNeighbor(M);
L.addNeighbor(H);
L.addNeighbor(K);
M.addNeighbor(I);
M.addNeighbor(J);
M.addNeighbor(K);

// console.log(DFT(A));
// [
//     'A', 'E', 'D', 'B',
//     'C', 'I', 'F', 'G',
//     'H', 'L', 'K', 'M',
//     'J'
//   ]
console.log(BFT(D));
