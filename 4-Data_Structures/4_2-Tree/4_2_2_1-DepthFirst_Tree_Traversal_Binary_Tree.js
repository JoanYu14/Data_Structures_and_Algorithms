// 深度優先樹遍歷(Depth-First Tree Traversal)
// 定義：透過處理root，然後遞迴處理所有子樹來處理樹的所有節點。也稱為前綴遍歷(preflix traversal)。

//TreeNode定義
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// Pre-Order是root, left, right的遍歷順序
const depthFirstTreeTraversalPreorder = function (root) {
  let result = [];

  // traversal function用來遍歷tree，一開始放入的為0(root)
  const traversal = function (rootNode) {
    console.log(`rootNode:${rootNode.val}`);
    // 將rootNode放入result中
    result.push(rootNode.val);
    // 如果rootNode有left child node，那就呼叫traversal函數並將left node傳入，去遍歷這個subtree
    if (rootNode.left) {
      traversal(rootNode.left);
    }

    // 如果rootNode有right child node，那就呼叫traversal函數並將right node傳入，去遍歷這個subtree
    if (rootNode.right) {
      traversal(rootNode.right);
    }
  };
  traversal(root);
  return result;
};

// In-Order是left, root, right的遍歷順序
const depthFirstTreeTraversalInorder = function (root) {
  let result = [];
  // traversal function用來遍歷tree，一開始放入的為0(root)
  const traversal = function (rootNode) {
    // 如果rootNode有left child node，那就呼叫traversal函數並將left node傳入，去遍歷這個subtree
    if (rootNode.left) {
      traversal(rootNode.left);
    }

    // 將rootNode放入result中
    result.push(rootNode.val);

    // 如果rootNode有right child node，那就呼叫traversal函數並將right node傳入，去遍歷這個subtree
    if (rootNode.right) {
      traversal(rootNode.right);
    }
  };
  traversal(root);
  return result;
};

// Post-Order是left, right, root的遍歷順序
const depthFirstTreeTraversalPostorder = function (root) {
  let result = [];
  // traversal function用來遍歷tree，一開始放入的為0(root)
  const traversal = function (rootNode) {
    // 如果rootNode有left child node，那就呼叫traversal函數並將left node傳入，去遍歷這個subtree
    if (rootNode.left) {
      traversal(rootNode.left);
    }

    // 如果rootNode有right child node，那就呼叫traversal函數並將right node傳入，去遍歷這個subtree
    if (rootNode.right) {
      traversal(rootNode.right);
    }

    // 將rootNode放入result中
    result.push(rootNode.val);
  };

  traversal(root);
  return result;
};

// 範例樹結構
let newRoot = new TreeNode(2);
newRoot.left = new TreeNode(7);
newRoot.left.left = new TreeNode(2);
newRoot.left.right = new TreeNode(6);
newRoot.left.right.left = new TreeNode(5);
newRoot.left.right.right = new TreeNode(11);
newRoot.right = new TreeNode(5);
newRoot.right.left = new TreeNode(9);
newRoot.right.left.left = new TreeNode(4);
// 調用 BFS 層級遍歷函數
let preOrderResult = depthFirstTreeTraversalPreorder(newRoot);
console.log(preOrderResult); // [2, 7, 2, 6, 5, 11, 5, 9, 4]
let inOrderResult = depthFirstTreeTraversalInorder(newRoot);
console.log(inOrderResult); // [ 2, 7, 5, 6, 11, 2, 4, 9, 5]
let postOrderResult = depthFirstTreeTraversalPostorder(newRoot);
console.log(postOrderResult); // [2, 5, 11, 6, 7, 4, 9,  5, 2]
