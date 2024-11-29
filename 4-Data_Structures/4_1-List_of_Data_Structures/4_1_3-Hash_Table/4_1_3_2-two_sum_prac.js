// 給定一個整數數組 nums 和一個整數 target，傳回兩個數字的索引，使它們相加等於 target。
// 您可以假設每個輸入都有一個解決方案，並且您不能兩次使用相同的元素。
// 您可以按任意順序返回答案。

// Example 1:
// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

// Example 2:
// Input: nums = [3,2,4], target = 6
// Output: [1,2]

// Example 3:
// Input: nums = [3,3], target = 6
// Output: [0,1]

// Hash Table
// key為integerValue, value為index
var twoSum = function (nums, target) {
  let hashTalbe = new HashTable(nums.length);
  for (let i = 0; i < nums.length; i++) {
    let shouldFindNum = target - nums[i];
    console.log(
      `nums[${i}]為${nums[i]}，需要找到${shouldFindNum}才能=${target}`
    );
    let result = hashTalbe.get(shouldFindNum);
    console.log(result);
    if (result != null) {
      return [i, result];
    } else {
      console.log(`${shouldFindNum}找不到`);
      hashTalbe.set(nums[i], i);
    }
    console.log(`=================================`);
  }
};

class HashTable {
  constructor(size) {
    this.size = size;
    this.table = [];
    for (let i = 0; i < this.size; i++) {
      this.table.push([]);
    }
  }

  hash(key) {
    if (key < 0) {
      key = Math.abs(key);
    }
    let A = (Math.sqrt(5) - 1) / 2;
    return Math.floor(this.size * ((key * A) % 1));
  }

  set(key, value) {
    let index = this.hash(key);
    console.log(`${key}在hashTable的index為${index}，value為:${value}`);
    this.table[index].push({ key, value });
  }

  get(key) {
    let index = this.hash(key);
    console.log(index);
    console.log(
      `get:${key}的hashedIndex為${index}，長度:${this.table[index].length}`
    );
    for (let i = 0; i < this.table[index].length; i++) {
      if (this.table[index][i].key === key) {
        return this.table[index][i].value;
      }
    }
    return null;
  }
}

console.log(twoSum((nums = [3, 2, 4]), (target = 6)));
console.log(twoSum((nums = [3, 3]), (target = 6)));
console.log(twoSum((nums = [2, 7, 11, 15]), (target = 9)));
console.log(twoSum([0, 4, 3, 0], 0));
