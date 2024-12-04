class TreeNode {
  constructor(val) {
    this.val = val;
    this.children = []; // 用陣列存放多個子節點}
  }
}

let root = new TreeNode(10);
root.children.push(new TreeNode(9));
root.children.push(new TreeNode(7));
root.children[0].children.push(new TreeNode(8));
root.children[0].children.push(new TreeNode(5));
root.children[0].children.push(new TreeNode(11));
root.children[0].children[0].children.push(new TreeNode(6));

root.children[1].children.push(new TreeNode(1));
root.children[1].children.push(new TreeNode(3));
root.children[1].children[0].children.push(new TreeNode(4));
root.children[1].children[0].children.push(new TreeNode(2));

const breadthFirstTreeTraversal = function (root) {
  let result = [];
  let queue = [];
  // 先將root新增到queue中
  queue.push(root);
  // i會為目前在哪個Node
  for (let i = 0; i < queue.length; i++) {
    console.log(`i:${i}，queue.length:${queue.length}`);
    // currentNode會為queue的第i個Node
    let currentNode = queue[i];
    console.log(`currentNode:${currentNode.val}`);
    // j為目前在第currentNode(i)個Node的第j的child，若currentNode沒有children的話該迴圈就不會執行
    for (let j = 0; j < currentNode.children.length; j++) {
      console.log(`currentNode.children[j]:${currentNode.children[j].val}`);
      // 將child push到queue中
      queue.push(currentNode.children[j]);
    }
    console.log();
  }

  while (queue.length > 0) {
    result.push(queue.shift().val);
  }
  return result;
};

let bfttResult = breadthFirstTreeTraversal(root);
console.log(bfttResult); // [ 2, 10, 5, 11, 6, 7,  4, 9,  5, 2]
