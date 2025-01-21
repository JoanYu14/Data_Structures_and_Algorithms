const lcsFunction = function (text1, text2) {
  if (text1.length === 0 || text2.length === 0) {
    return 0;
  }
  // left, right pointer分別指向text1與text2的最後一個字
  let left = text1.length - 1;
  let right = text2.length - 1;
  let max = 0;
  while (left >= 0 && right >= 0 && text1[left] && text2[right]) {
    if (text1 === "" || !text2 === "") {
      console.log(`text1 or text2 is empty string`);
      return 0;
    }
    console.log(
      `text1[${left}]:${text1[left]} ; text2[${right}]:${text2[right]}`
    );
    // 如果指向的字不一樣的話就看left往前與right往前哪個能得到的result較大
    if (text1[left] !== text2[right]) {
      if (left === 1 || right === 1) {
        break;
      }
      let result = Math.max(
        lcsFunction(text1.substring(0, left), text2.substring(0, right + 1)),
        lcsFunction(text1.substring(0, left + 1), text2.substring(0, right))
      );

      //   return (
      //     max +
      //     Math.max(
      //       lcsFunction(text1.substring(0, left), text2.substring(0, right + 1)),
      //       lcsFunction(text1.substring(0, left + 1), text2.substring(0, right))
      //     )
      //   );
    } else {
      max++;
      left--;
      right--;
    }
  }
  console.log(`max:${max}`);
  return max;
};
