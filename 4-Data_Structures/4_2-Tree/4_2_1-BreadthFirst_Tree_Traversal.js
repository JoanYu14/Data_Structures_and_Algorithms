// 廣度優先搜尋演算法（英語：Breadth-first search，縮寫：BFS）
//又譯作寬度優先搜尋，或橫向優先搜尋，是一種圖形搜尋演算法。簡單的說，BFS是從根節點開始，沿著樹的寬度遍歷樹的節點。如果所有節點均被訪問，則演算法中止。

//TreeNode定義
function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

// BFS 層級遍歷函數
function levelOrder(root) {
  if (!root) return []; // 如果樹是空的，返回空數組

  let result = []; // 用來保存每一層的節點值
  let queue = [root]; // 初始化隊列，將根節點加入隊列

  while (queue.length > 0) {
    let levelSize = queue.length; // 當前層的節點數量
    let currentLevel = []; // 當前層的節點值

    // 遍歷當前層的所有節點
    for (let i = 0; i < levelSize; i++) {
      let node = queue.shift(); // 取出隊列中的節點
      currentLevel.push(node.val); // 記錄該節點的值

      // 如果該節點有左子節點，加入隊列
      if (node.left) {
        queue.push(node.left);
      }

      // 如果該節點有右子節點，加入隊列
      if (node.right) {
        queue.push(node.right);
      }
    }

    // 將當前層的結果加入結果數組
    result.push(currentLevel);
  }

  return result; // 返回層級遍歷結果
}

// 範例樹結構
let root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.right = new TreeNode(6);

// 調用 BFS 層級遍歷函數
let result = levelOrder(root);
console.log(result); // 輸出: [[1], [2, 3], [4, 5, 6]]
