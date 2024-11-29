// Hash Function II - Multiple Method
// Index = [m(keyA % 1)]
// m = hashtable size
// A = (√5-1) / 2，A是無理數(小數點後有無限多位，並且不會循環，ex: pi)
// key為element的id
// []為高斯符號Math.floor

let players = [
  { name: "Mike", id: 11424 },
  { name: "James", id: 6254 },
  { name: "Drake", id: 4171 },
  { name: "Kevin", id: 554 },
];

const hashTableSize = 6;
const mutipleMethod = function (m, key) {
  const A = (Math.sqrt(5) - 1) / 2;

  const index = Math.floor(m * ((key * A) % 1));
  return index;
};
const hash = players.map((element) => {
  element.index = mutipleMethod(hashTableSize, element.id);
  return element;
});
console.log(hash);
// [
//     { name: 'Mike', id: 11424, index: 2 },
//     { name: 'James', id: 6254, index: 1 },
//     { name: 'Drake', id: 4171, index: 4 },
//     { name: 'Kevin', id: 554, index: 2 }
//   ]

//
