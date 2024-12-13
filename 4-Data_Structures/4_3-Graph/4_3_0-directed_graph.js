class WeightedDirectedGraphMatrix {
  constructor() {
    // 初始化頂點集合和鄰接矩陣
    this.vertices = []; // 儲存所有頂點的名稱
    this.matrix = []; // 鄰接矩陣，儲存權重
  }

  /**
   * 新增一個頂點
   * @param {string} vertex - 頂點名稱
   */
  addVertex(vertex) {
    if (!this.vertices.includes(vertex)) {
      // 將頂點新增到頂點列表中
      this.vertices.push(vertex);

      // 更新矩陣的行與列，初始化為 Infinity（表示無邊）
      this.matrix.forEach((row) => row.push(Infinity));
      this.matrix.push(new Array(this.vertices.length).fill(Infinity));

      // 自己到自己的距離設為 0
      const idx = this.vertices.length - 1;
      this.matrix[idx][idx] = 0;
    }
  }

  /**
   * 新增一條有向邊，並設定權重
   * @param {string} fromVertex - 起點頂點名稱
   * @param {string} toVertex - 終點頂點名稱
   * @param {number} weight - 權重（可正或負）
   */
  addEdge(fromVertex, toVertex, weight) {
    const fromIndex = this.vertices.indexOf(fromVertex);
    const toIndex = this.vertices.indexOf(toVertex);

    if (fromIndex === -1 || toIndex === -1) {
      throw new Error("起點或終點不存在！請先新增頂點。");
    }

    // 在矩陣中設定權重
    this.matrix[fromIndex][toIndex] = weight;
  }

  /**
   * 移除一條有向邊
   * @param {string} fromVertex - 起點頂點名稱
   * @param {string} toVertex - 終點頂點名稱
   */
  removeEdge(fromVertex, toVertex) {
    const fromIndex = this.vertices.indexOf(fromVertex);
    const toIndex = this.vertices.indexOf(toVertex);

    if (fromIndex === -1 || toIndex === -1) {
      throw new Error("起點或終點不存在！");
    }

    // 移除邊，設為 Infinity 表示無邊
    this.matrix[fromIndex][toIndex] = Infinity;
  }

  /**
   * 移除一個頂點及所有相關的邊
   * @param {string} vertex - 要移除的頂點名稱
   */
  removeVertex(vertex) {
    const index = this.vertices.indexOf(vertex);

    if (index === -1) {
      throw new Error("該頂點不存在！");
    }

    // 移除該頂點
    this.vertices.splice(index, 1);

    // 移除矩陣中的對應行與列
    this.matrix.splice(index, 1);
    this.matrix.forEach((row) => row.splice(index, 1));
  }

  /**
   * 列印鄰接矩陣，便於檢視
   */
  printMatrix() {
    console.log("   ", this.vertices.join(" "));
    this.matrix.forEach((row, i) => {
      console.log(
        this.vertices[i],
        row.map((value) => (value === Infinity ? "∞" : value)).join(" ")
      );
    });
  }
}

// 定義一個加權有向圖的類別
class WeightedDirectedGraphList {
  constructor() {
    // 使用一個物件來表示鄰接列表，每個頂點的鍵對應一個陣列，該陣列包含此頂點連接的邊
    this.adjacencyList = {};
  }

  /**
   * 新增一個頂點到圖中
   * @param {string} vertex - 新增的頂點名稱
   */
  addVertex(vertex) {
    // 如果該頂點不存在於鄰接列表中，則將其初始化為一個空陣列
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  /**
   * 新增一條有向邊，並指定權重
   * @param {string} fromVertex - 起點頂點名稱
   * @param {string} toVertex - 終點頂點名稱
   * @param {number} weight - 該邊的權重（可以是正數或負數）
   */
  addEdge(fromVertex, toVertex, weight) {
    // 如果起點或終點不存在，則自動新增它們
    if (!this.adjacencyList[fromVertex]) this.addVertex(fromVertex);
    if (!this.adjacencyList[toVertex]) this.addVertex(toVertex);

    // 將有向邊（終點和權重）加入到起點的鄰接列表中
    this.adjacencyList[fromVertex].push({ to: toVertex, weight });
  }

  /**
   * 移除一條有向邊
   * @param {string} fromVertex - 起點頂點名稱
   * @param {string} toVertex - 終點頂點名稱
   */
  removeEdge(fromVertex, toVertex) {
    // 從起點的鄰接列表中移除所有指向終點的邊
    this.adjacencyList[fromVertex] = this.adjacencyList[fromVertex].filter(
      (edge) => edge.to !== toVertex // 過濾掉目標頂點的邊
    );
  }

  /**
   * 移除一個頂點以及所有與該頂點相關的邊
   * @param {string} vertex - 要移除的頂點名稱
   */
  removeVertex(vertex) {
    // 刪除該頂點及其鄰接列表
    delete this.adjacencyList[vertex];

    // 遍歷所有頂點的鄰接列表，移除與該頂點相關的邊
    for (let key in this.adjacencyList) {
      this.adjacencyList[key] = this.adjacencyList[key].filter(
        (edge) => edge.to !== vertex // 移除指向該頂點的邊
      );
    }
  }
}

// // 建立一個加權有向圖
// const graph = new WeightedDirectedGraph();

// // 新增頂點
// graph.addVertex("A");
// graph.addVertex("B");
// graph.addVertex("C");
// graph.addVertex("D");

// // 新增有向邊及其權重
// graph.addEdge("A", "B", 3); // A -> B 權重 3
// graph.addEdge("A", "C", -2); // A -> C 權重 -2
// graph.addEdge("B", "C", 2); // B -> C 權重 2
// graph.addEdge("B", "D", 4); // B -> D 權重 4
// graph.addEdge("C", "D", 1); // C -> D 權重 1

// // 查看圖的鄰接列表
// console.log(graph.adjacencyList);
// // 輸出:
// // {
// //   A: [ { to: 'B', weight: 3 }, { to: 'C', weight: -2 } ],
// //   B: [ { to: 'C', weight: 2 }, { to: 'D', weight: 4 } ],
// //   C: [ { to: 'D', weight: 1 } ],
// //   D: []
// // }

// // 移除邊
// graph.removeEdge("A", "C"); // 移除 A -> C 的邊
// console.log(graph.adjacencyList);
// // 輸出:
// // {
// //   A: [ { to: 'B', weight: 3 } ],
// //   B: [ { to: 'C', weight: 2 }, { to: 'D', weight: 4 } ],
// //   C: [ { to: 'D', weight: 1 } ],
// //   D: []
// // }

// // 移除頂點
// graph.removeVertex("B"); // 移除頂點 B
// console.log(graph.adjacencyList);
// 輸出:
// {
//   A: [],
//   C: [ { to: 'D', weight: 1 } ],
//   D: []
// }

// // 建立一個圖
// const graph = new WeightedDirectedGraphMatrix();

// // 新增頂點
// graph.addVertex("A");
// graph.addVertex("B");
// graph.addVertex("C");
// graph.addVertex("D");

// // 新增有向邊及其權重
// graph.addEdge("A", "B", 3); // A -> B 權重 3
// graph.addEdge("A", "C", -2); // A -> C 權重 -2
// graph.addEdge("B", "C", 2); // B -> C 權重 2
// graph.addEdge("B", "D", 4); // B -> D 權重 4
// graph.addEdge("C", "D", 1); // C -> D 權重 1

// // 列印鄰接矩陣
// console.log("初始鄰接矩陣：");
// graph.printMatrix();

// // 移除一條邊
// graph.removeEdge("A", "C");
// console.log("移除 A -> C 後的鄰接矩陣：");
// graph.printMatrix();

// // 移除一個頂點
// graph.removeVertex("B");
// console.log("移除頂點 B 後的鄰接矩陣：");
// graph.printMatrix();

module.exports = { WeightedDirectedGraphList, WeightedDirectedGraphMatrix };
