// 使用Division Method的優點是快速。
// 缺點：
//     1. 理想情況下，整數 m 必須是距離 2^𝑃 足夠「遠」的數字，其中 P 是正整數。 （因為〖10〗^𝑃能被2^𝑃整除，數論裡講的），就是如果m是選擇2^P的話就會得到collision。例如:m選擇771就離2^9=512與2^10=1024夠遠。
//     2. 如果物件的命名約定相似，那麼就有機會發生很多很多的衝突。

let players = [
  { name: "Mike", id: 11424 },
  { name: "James", id: 6254 },
  { name: "Drake", id: 4171 },
  { name: "Kevin", id: 554 },
];

const hashTableSize = 6;
const divisionMethod = function (m, key) {
  return key % m;
};
const hash = players.map((element) => {
  element.index = divisionMethod(hashTableSize, element.id);
  return element;
});
console.log(hash);
// [
//     { name: 'Mike', id: 11424, index: 0 },
//     { name: 'James', id: 6254, index: 2 },
//     { name: 'Drake', id: 4171, index: 1 },
//     { name: 'Kevin', id: 554, index: 2 }
//   ]
