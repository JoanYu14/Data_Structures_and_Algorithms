class TreeNode {
  constructor(val) {
    this.val = val;
    this.children = []; // 用陣列存放多個子節點}
  }
}

let root = new TreeNode(2);
root.children.push(new TreeNode(7));
root.children.push(new TreeNode(5));
root.children[0].children.push(new TreeNode(2));
root.children[0].children.push(new TreeNode(10));
root.children[0].children.push(new TreeNode(6));
root.children[0].children[2].children.push(new TreeNode(5));
root.children[0].children[2].children.push(new TreeNode(11));

root.children[1].children.push(new TreeNode(9));
root.children[1].children[0].children.push(new TreeNode(4));

// root, left, right
const depthFirstTreeTraversalPreorder = function (root) {
  // result存入最後要return的answer
  let result = [];

  // traversal函數用來遍歷subtree
  const traversal = function (rootNode) {
    // 一開始先把rootNode存入result
    result.push(rootNode.val);
    console.log(
      `rootNode:${rootNode.val}，有${rootNode.children.length}個child`
    );

    // 遍歷rootNode的childs
    for (let i = 0; i < rootNode.children.length; i++) {
      console.log(
        `對rootNode為${rootNode.val}的第${i + 1}個child進行traversal`
      );
      // 對每個child做traversal函數
      traversal(rootNode.children[i]);
      console.log();
    }
  };

  traversal(root);
  return result;
};

// left,root,right
const depthFirstTreeTraversalInorder = function (root) {
  // result存入最後要return的answer
  let result = [];

  // traversal函數用來遍歷subtree
  const traversal = function (rootNode) {
    // 如果rootNode有children[0](leftNode)的話就將leftNode(index0)先傳入traversal
    if (rootNode.children.length > 0) {
      traversal(rootNode.children[0]);
    }
    // 先遍歷left後在將root push到result中
    result.push(rootNode.val);

    // 遍歷rootNode的childs，因為left已經遍歷過了，所以從index1開始
    for (let i = 1; i < rootNode.children.length; i++) {
      console.log(
        `對rootNode為${rootNode.val}的第${i + 1}個child進行traversal`
      );
      // 對每個child做traversal函數
      traversal(rootNode.children[i]);
      console.log();
    }
  };

  traversal(root);
  return result;
};

// left, right, root
const depthFirstTreeTraversalPostOrder = function (root) {
  // result存入最後要return的answer
  let result = [];

  // traversal函數用來遍歷subtree
  const traversal = function (rootNode) {
    // 如果rootNode有children[0](leftNode)的話就將leftNode(index0)先傳入traversal
    if (rootNode.children.length > 0) {
      traversal(rootNode.children[0]);
    }

    // 遍歷rootNode的childs，因為left已經遍歷過了，所以從index1開始
    for (let i = 1; i < rootNode.children.length; i++) {
      console.log(
        `對rootNode為${rootNode.val}的第${i + 1}個child進行traversal`
      );
      // 對每個child做traversal函數
      traversal(rootNode.children[i]);
      console.log();
    }

    // 先遍歷left與right後再將root push到result中
    result.push(rootNode.val);
  };

  traversal(root);
  return result;
};
console.log("=============== Pre-Order ===============");
let preOrderResult = depthFirstTreeTraversalPreorder(root);
console.log(preOrderResult); // [ 2,  7, 2, 10, 6, 5, 11, 5,  9, 4]
console.log("=============== In-Order ===============");
let inOrderResult = depthFirstTreeTraversalInorder(root);
console.log(inOrderResult); // [ 2, 7, 10, 5, 6, 11, 2,  4, 9, 5]
console.log("=============== Post-Order ===============");
let postOrderResult = depthFirstTreeTraversalPostOrder(root);
console.log(postOrderResult); // [ 2, 10, 5, 11, 6, 7,  4, 9,  5, 2]
