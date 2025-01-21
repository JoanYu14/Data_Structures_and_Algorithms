// 先把具有權重的有向圖import進來
const { WeightedDirectedGraphMatrix } = require("./4_3_0-directed_graph");

const floydWarshallAlgorithm = function (graph) {
  // 紀錄最短路徑距離，預設為初始的martrix
  let distance = graph.matrix;
  // 紀錄Vertex[i]~Vertex[j]的最短路徑中Vertex[j]的前一個Vertex
  let predecessor = [];
  // 先製作初始predecessor，用初始的distance，就是graph中vertax[i]與vertex[j]有沒有直連
  // graph中有幾個vertex就會有幾個row，就是矩陣中左邊那排
  graph.matrix.forEach((row, rowIndex) => {
    // 若rowIndex為0代表是第一個vertex(A)
    let vertex = graph.vertices[rowIndex];
    // predecessor新增一個空陣列，就是要儲存vertex A到其他所有vertex的最短路徑
    predecessor.push([]);
    // columnIndex就是vertex[j]，矩陣中上面那排
    row.forEach((value, columnIndex) => {
      // 如果value=Infinity代表沒有vertex[rowIndex]~vertex[columnIndex]間沒有直連的edge
      // 如果value=0代表沒有vertex[rowIndex]===vertex[columnIndex]，就是自己到自己
      if (value === Infinity || value === 0) {
        predecessor[rowIndex][columnIndex] = -1;
      } else {
        predecessor[rowIndex][columnIndex] = vertex;
      }
    });
  });

  // graph.vertices[intermediateVertexIndex]就是中繼點，pseudoCode裡的k
  for (
    let intermediateVertexIndex = 0;
    intermediateVertexIndex < graph.vertices.length;
    intermediateVertexIndex++
  ) {
    console.log(`中繼點:${graph.vertices[intermediateVertexIndex]}`);
    // graph.vertices[startVertexIndex]就是起點，pseudoCode裡的i
    for (
      let startVertexIndex = 0;
      startVertexIndex < graph.vertices.length;
      startVertexIndex++
    ) {
      console.log(
        `------------------- 開始點:${graph.vertices[startVertexIndex]}~中繼點:${graph.vertices[intermediateVertexIndex]}開始 -------------------`
      );
      // graph.vertices[startVertexIndex]是終點
      for (
        let endVertexIndex = 0;
        endVertexIndex < graph.vertices.length;
        endVertexIndex++
      ) {
        console.log(
          `從起點:${graph.vertices[startVertexIndex]}經過中繼點:${
            graph.vertices[intermediateVertexIndex]
          }再到終點:${graph.vertices[endVertexIndex]}
          => 起點:${graph.vertices[startVertexIndex]}~中繼點:${
            graph.vertices[intermediateVertexIndex]
          }的距離=${distance[startVertexIndex][intermediateVertexIndex]}
             中繼點:${graph.vertices[intermediateVertexIndex]}~終點:${
            graph.vertices[endVertexIndex]
          }的距離=${distance[intermediateVertexIndex][endVertexIndex]}
             總距離:${
               distance[startVertexIndex][intermediateVertexIndex] +
               distance[intermediateVertexIndex][endVertexIndex]
             }
             原本的最小距離:${distance[startVertexIndex][endVertexIndex]}
             是否要更新:${
               distance[startVertexIndex][endVertexIndex] >
               distance[startVertexIndex][intermediateVertexIndex] +
                 distance[intermediateVertexIndex][endVertexIndex]
             }`
        );

        if (
          distance[startVertexIndex][endVertexIndex] >
          distance[startVertexIndex][intermediateVertexIndex] +
            distance[intermediateVertexIndex][endVertexIndex]
        ) {
          // distance[vertex][endVertexIndex] => distance中從startVertex到endVertex的距離(最短路徑)
          // distance[startVertexIndex][intermediateVertexIndex] + distance[intermediateVertexIndex][endVertexIndex]
          // => distance中從startVertex到intermediateVertex的距離 + distance中從intermediateVertex到endVertex的距離
          // 如果原本的比較大就代表經過intermediateVertex(中繼點)再到endVertax(終點)的距離比原本distance的小，那就更新最短路徑
          distance[startVertexIndex][endVertexIndex] =
            distance[startVertexIndex][intermediateVertexIndex] +
            distance[intermediateVertexIndex][endVertexIndex];

          // predecessor也要更新，因為只記錄startVertex到endVertex路徑中endVertex的前一個Vertex
          // 所以就是去看intermediateVertex到endVertex的前一個vertex就對了
          predecessor[startVertexIndex][endVertexIndex] =
            predecessor[intermediateVertexIndex][endVertexIndex];
        }
      }
      console.log(
        `------------------- 開始點:${graph.vertices[startVertexIndex]}~中繼點:${graph.vertices[intermediateVertexIndex]}結束 -------------------`
      );
    }
    console.log(
      `==================== 中繼點:${graph.vertices[intermediateVertexIndex]}結束 ====================`
    );
    console.log();
  }
  // 最後回傳最短路徑的距離與最短路徑
  return { distance, predecessor };
};

// 建立一個加權有向圖
const graph = new WeightedDirectedGraphMatrix();

// 新增Node
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");

// 新增有向邊及其權重
graph.addEdge("A", "B", 2);
graph.addEdge("A", "D", 8);
graph.addEdge("A", "C", 6);
graph.addEdge("B", "C", -2);
graph.addEdge("B", "D", 3);
graph.addEdge("C", "A", 4);
graph.addEdge("C", "D", 1);

// 取得最短路徑
const getTheShortestPath = function (graph, startVertex, endVertex) {
  // 將graph作為參數呼叫floydWarshallAlgorithm函數取得 distance, predecessor
  const { distance, predecessor } = floydWarshallAlgorithm(graph);

  // 先找到startVertex與endVertex在graph.vertices中的index，這樣才可以去distance, predecessor找到對應的value
  const startVertexIndex = graph.vertices.indexOf(startVertex);
  const endVertexIndex = graph.vertices.indexOf(endVertex);
  if (startVertexIndex === -1 || endVertexIndex === -1) {
    console.log(`vertex不在graph內`);
    return;
  }
  console.log(
    `從${startVertex}~${endVertex}的最短距離為:${distance[startVertexIndex][endVertexIndex]}`
  );
  if (distance[startVertexIndex][endVertexIndex] === Infinity) {
    console.log(`無法從${startVertex}到達${endVertex}`);
    return;
  }
  // 先讓path為endVertex
  let path = endVertex;
  // findIndex是要記錄路徑的index，會一直往最短路徑中到終點的前一個vertexIndex直到等於起點的index
  let findIndex = endVertexIndex;

  while (findIndex !== startVertexIndex) {
    path = predecessor[startVertexIndex][findIndex] + " -> " + path;
    findIndex = graph.vertices.indexOf(
      predecessor[startVertexIndex][findIndex]
    );
  }
  //   for (let i = 0; i < graph.vertices.length; i++) {
  //     path = predecessor[startVertexIndex][findIndex] + " -> " + path;
  //     if (predecessor[startVertexIndex][findIndex] == startVertex) {
  //       break;
  //     } else {
  //       findIndex = graph.vertices.indexOf(
  //         predecessor[startVertexIndex][findIndex]
  //       );
  //     }
  //   }
  console.log(`路徑為:${path}`);
};
// console.log(graph.matrix);
// console.log(graph.vertices);
// graph.printMatrix();
getTheShortestPath(graph, "B", "A");
// console.log(graph.matrix[1][2]);
