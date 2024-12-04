// 廣度優先搜尋演算法（英語：Breadth-first search，縮寫：BFS）
//又譯作寬度優先搜尋，或橫向優先搜尋，是一種圖形搜尋演算法。簡單的說，BFS是從根節點開始，沿著樹的寬度遍歷樹的節點。如果所有節點均被訪問，則演算法中止。

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

const breadthFirstTreeTraversal = function (root) {
  if (root === null) {
    return [];
  }
  // result是要return的結果
  let result = [];
  // queue是要儲存要遍歷到的Node，最後queue會清空
  let queue = [];
  // 先把root push到queue中，因為第一個看child的是root
  queue.push(root);

  // queue.length>0的話就繼續loop
  while (queue.length > 0) {
    console.log(`queue的length為${queue.length}`);

    // currentNode為queue.shift() => 就是queue中的第一個Node，這樣queue.length會-1
    // 此次迴圈就會去看curretnNode的children
    let currentNode = queue.shift();
    console.log(`currentNode為${currentNode.val}`);

    // 如果currentNode有left child的話就push到queue，這樣while迴圈就會去找這個childNode的children
    if (currentNode.left) {
      console.log(`currentNode.left為${currentNode.left.val}`);
      queue.push(currentNode.left);
    }

    // 如果currentNode有right child的話就push到queue，這樣while迴圈就會去找這個childNode的children
    if (currentNode.right) {
      console.log(`currentNode.right為${currentNode.right.val}`);
      queue.push(currentNode.right);
    }
    // 最後將當前currentNode push到result中
    result.push(currentNode.val);
    console.log();
  }
  return result;
};
// 範例樹結構
let root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.right = new TreeNode(6);
console.log(root);
// 調用 BFS 層級遍歷函數
let result = breadthFirstTreeTraversal(root);
console.log(result); // 輸出: [[1], [2, 3], [4, 5, 6]]
