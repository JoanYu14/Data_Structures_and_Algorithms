// intersection problem(集合問題)
// 寫一個函數，以兩個數組作為參數，然後傳回一個數組，該數組是這兩個數組的交集。
// 例如，Intersection([1, 2, 3], [5, 16, 1, 3]) 應傳回 [1, 3]。

// O(num1.length*num2.length) = O(n平方)，不是一個好的演算法
function intersection(num1, num2) {
  let result = [];
  for (let i = 0; i < num1.length; i++) {
    for (let j = 0; j < num2.length; j++) {
      if (num1[i] === num2[j]) {
        result.push(num1[i]);
      }
    }
  }
  return result;
}

// ===============================================

// 利用Counter技巧，counter就像是計數板
// O(num1.length+num2.length) = O(n+m)
function intersectionUseCounter(num1, num2) {
  let result = [];
  // 把num1與num2串在一起
  let num3 = num1.concat(num2); // O(n + m)
  let counter = {};

  for (let i = 0; i < num3.length; i++) {
    // O(n + m)
    if (!counter[num3[i]]) {
      // 如果counter物件中沒有num3[i]
      // 另counter物件的num3[i]屬性的值等於1
      counter[num3[i]] = 1; // O(1)
    } else {
      // 如果counter物件中已經有num3[i]這個屬性的話，此屬性的值+1
      counter[num3[i]]++; // O(1)
    }
  }

  for (let property in counter) {
    // O(n + m)
    if (counter[property] > 1) {
      result.push(property); // O(1)
    }
  }

  return result;
}

// ===============================================

function intersectionUseCounter2(arr1, arr2) {
  let counter = {};
  let ansArr = [];

  for (let i in arr1) {
    // O(n)
    if (!counter[arr1[i]]) {
      counter[arr1[i]] = 1; // O(1)
    } else {
      counter[arr1[i]] += 1; // O(1)
    }
  }

  for (let i in arr2) {
    // O(m)
    if (!counter[arr2[i]]) {
      counter[arr2[i]] = 1; // O(1)
    } else {
      counter[arr2[i]] += 1; // O(1)
    }
  }

  for (let i in counter) {
    // O(n + m)
    if (counter[i] > 1) {
      ansArr.push(i); // O(1)
    }
  }

  console.log(`兩個Array的交集為:${ansArr}`);

  return ansArr;
}

intersectionUseCounter2([1, 2, 3], [5, 16, 1, 3]); // 兩個Array的交集為:1,3
intersectionUseCounter2([1, 2], [3, 4]); // 兩個Array的交集為:
