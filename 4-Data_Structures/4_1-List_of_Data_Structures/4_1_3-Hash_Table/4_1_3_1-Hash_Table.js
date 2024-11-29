class HashTable {
  constructor(size) {
    this.size = size;
    this.table = [];
    for (let i = 0; i < this.size; i++) {
      this.table.push([]);
    }
  }

  // 將string轉成integer => 將字串中所有字元的所有 ASCII 值相加
  parse(key) {
    let result = 0;
    for (let i = 0; i < key.length; i++) {
      result += key[i].charCodeAt();
    }
    return result;
  }

  // hashFunction1-division method
  hashFn1DivisionMethod(key) {
    let parsedKey;
    if (typeof key !== "number") {
      parsedKey = this.parse(key);
    } else {
      parsedKey = key;
    }
    return parsedKey % this.size;
  }

  // hashFunction2-multiple method
  hashFn2MultipleMethod(key) {
    let parsedKey;
    if (typeof key !== "number") {
      parsedKey = this.parse(key);
    } else {
      parsedKey = key;
    }
    let A = (Math.sqrt(5) - 1) / 2;
    return Math.floor(this.size * ((parsedKey * A) % 1));
  }

  // 將一個元素加入hashTable中
  set(key, value) {
    // 先使用key去做HashFunction取得index(要放在hashTable的位置)
    let index = this.hashFn2MultipleMethod(key);
    this.table[index].push({ key, value });
  }

  // 根據key找到存在hashTable的value
  get(key) {
    // 找到存在hashTable的哪個index
    let index = this.hashFn2MultipleMethod(key);
    // 因為假如有發生collision的話index內會有不只一個element，所以要用loop去找
    for (let i = 0; i < this.table[index].length; i++) {
      if (this.table[index][i].key === key) {
        return this.table[index][i];
      }
    }
    return null;
  }

  printAll() {
    console.log(this.table);
  }
}

let myHashTable = new HashTable(6);
myHashTable.set(11424, "Mike");
myHashTable.set(6254, "James");
myHashTable.set(4171, "Drake");
myHashTable.set(554, "Kevin");
myHashTable.printAll();
// [
//     [],
//     [ { key: 6254, value: 'James' } ],
//     [ { key: 11424, value: 'Mike' }, { key: 554, value: 'Kevin' } ],
//     [],
//     [ { key: 4171, value: 'Drake' } ],
//     []
//   ]
// index2有發生collision
console.log(myHashTable.get(6254)); // { key: 6254, value: 'James' }
console.log(myHashTable.get(500)); // null

console.log();
let cssHashTable = new HashTable(6);
cssHashTable.set("white", "#FFFFFF");
cssHashTable.set("red", "#FF0000");
cssHashTable.set("magenta", "#FF00FF");
console.log(cssHashTable.get("magenta")); // { key: 'magenta', value: '#FF00FF' }
cssHashTable.printAll();
