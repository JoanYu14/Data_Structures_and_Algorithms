// Binary Search Tree (二元搜尋樹BST)
// Binary Search Tree 二元搜尋樹 : 是一棵二元樹，但left child總是小於root(left<root)，right child總是大於root(right>root)。right>root<left
// 在 BST 中，每個節點的左子樹包含比該節點小的值，而右子樹包含比該節點大的值。這種結構使得在查找某個元素時，可以比線性搜尋更快速。
// 對於一顆平衡的二叉搜尋樹，搜尋的時間複雜度是 O(log n)，其中 n 是樹中的節點數。這比起線性搜尋（O(n)）要快得多，尤其是當數據量較大時。

// Binary Search Tree做search的時間複雜度
// Worst Case O(n): 就是這個樹是線性的，那其實我們就是在做sequential search線性查詢
// Best Case O(1): 就是要找的值剛好是rootNode
// Average Case O(logn): Binary Tree是balanced的

//TreeNode定義
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.length = 0;
    this.root = null;
  }

  insert(value) {
    let node = new TreeNode(value);
    // 定義lastComparedNode為null，該變數會儲存著最後比較到哪個Node
    let lastComparedNode = null;
    // 定義nodeToCompare為root，該變數會用做while loop是否繼續的依據，在loop最後會更新為目前Node的left or right代表下次迴圈要比較哪個Node，在迴圈結束時一定會為null
    let nodeToCompare = this.root;
    // 如果nodeToCompare一開始就=null的話代表該Tree中沒有Node
    while (nodeToCompare !== null) {
      // lastComparedNode要存入nodeToCompare(當前比較到哪個Node)
      lastComparedNode = nodeToCompare;
      // 用要insert的Node去跟目前比較到的Node做比較
      // 若大於的話下次就要跟目前node的right child比較(x=x.right)
      // 否則下次就要跟目前node的left child比較(x=x.left)
      if (node.val > nodeToCompare.val) {
        nodeToCompare = nodeToCompare.right;
      } else {
        nodeToCompare = nodeToCompare.left;
      }
    }

    // 此時比較完了，x一定為null了
    // lastComparedNode此時為最後比較到的Node如果lastComparedNode=null的話代表while loop根本沒有執行，因為Tree中根本沒有Node
    if (lastComparedNode === null) {
      console.log("BinaryTree中原本完全沒有Node");
      this.root = node;
    } else if (node.val > lastComparedNode.val) {
      console.log(`${node.val}要insert到${lastComparedNode.val}的right`);
      lastComparedNode.right = node;
    } else {
      console.log(`${node.val}要insert到${lastComparedNode.val}的left`);
      lastComparedNode.left = node;
    }

    this.length++;
  }

  // 廣度優先樹遍歷
  bftt(root = this.root) {
    if (root === null) {
      return [];
    }
    let result = [];
    let queue = [];
    // 先把root push到queue中
    queue.push(root);
    while (queue.length > 0) {
      let currentNode = queue.shift();
      //   console.log(`currentNode為${currentNode.val}`);
      if (currentNode.left) {
        // console.log(`currentNode.left為${currentNode.left.val}`);
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        // console.log(`currentNode.right為${currentNode.right.val}`);
        queue.push(currentNode.right);
      }
      result.push(currentNode.val);
    }
    return result;
  }
  preOrder = (root = this.root) => {
    let result = [];
    const traversal = function (rootNode) {
      result.push(rootNode.val);
      if (rootNode.left) {
        traversal(rootNode.left);
      }
      if (rootNode.right) {
        traversal(rootNode.right);
      }
    };
    traversal(root);
    return result;
  };
  inOrder = (root = this.root) => {
    let result = [];
    const traversal = function (rootNode) {
      if (rootNode.left) {
        traversal(rootNode.left);
      }
      result.push(rootNode.val);
      if (rootNode.right) {
        traversal(rootNode.right);
      }
    };
    traversal(root);
    return result;
  };
  postOrder = (root = this.root) => {
    let result = [];
    const traversal = function (rootNode) {
      if (rootNode.left) {
        traversal(rootNode.left);
      }
      if (rootNode.right) {
        traversal(rootNode.right);
      }
      result.push(rootNode.val);
    };
    traversal(root);
    return result;
  };

  searchRecusively = function (searchValue, searchNode = this.root) {
    // 如果searchNode==null代表沒有更深的Node或binaryTree中本來就沒有Node
    if (searchNode === null || searchNode.val === searchValue) {
      return searchNode;
    }
    if (searchValue < searchNode.val) {
      return this.searchRecusively(searchValue, searchNode.left);
    } else {
      return this.searchRecusively(searchValue, searchNode.right);
    }
  };

  searchIteratively = function (searchValue, searchNode = this.root) {
    // 如果searchNode==null代表沒有更深的Node或binaryTree中本來就沒有Node
    while (searchNode !== null && searchNode.val != searchValue) {
      if (searchValue < searchNode.val) {
        // 如果searchValue小於searchNode.val代表searchValue只有可能在searchNode的left children
        searchNode = searchNode.left;
      } else {
        searchNode = searchNode.right;
      }
    }
    return searchNode;
  };
}

let newTree = new BinarySearchTree();
newTree.insert(15);
newTree.insert(6);
newTree.insert(5);
newTree.insert(1);
newTree.insert(13);
newTree.insert(-7);
newTree.insert(3);

console.log(newTree.bftt()); // [15, 6, 5, 13, 1, -7, 3];
console.log(newTree.preOrder()); // [15, 6, 5, 1, -7, 3, 13];
console.log(newTree.inOrder()); // [-7, 1, 3, 5, 6, 13, 15];
console.log(newTree.postOrder()); // [-7, 3, 1, 5, 13, 6, 15];
console.log(newTree.searchRecusively(1));
// TreeNode {
//     val: 1,
//     left: TreeNode { val: -7, left: null, right: null },
//     right: TreeNode { val: 3, left: null, right: null }
//   }
console.log(newTree.searchRecusively(-7));
// TreeNode { val: -7, left: null, right: null }
console.log(newTree.searchRecusively(2)); // null
console.log("================ searchRecusively ================");
console.log(newTree.searchIteratively(1));
// TreeNode {
//     val: 1,
//     left: TreeNode { val: -7, left: null, right: null },
//     right: TreeNode { val: 3, left: null, right: null }
//   }
console.log(newTree.searchIteratively(-7));
// TreeNode { val: -7, left: null, right: null }
console.log(newTree.searchIteratively(2)); // null
