// 选择排序是一种灵巧的算法, 但其速度不是很快.
// O(n²)

// 书上的Python栗子
const arr = [5, 3, 6, 2, 10];
function findSmallest(arr) {
  let smallest = arr[0],
    smallest_index = 0;
  for (let i = 1; i < arr.length; i++) {
    if (smallest > arr[i]) {
      smallest = arr[i];
      smallest_index = i;
    }
  }
  return smallest_index;
}

function selectionSort(arr) {
  const newArr = [];
  const len = arr.length;
  let smallest_index = null;
  for (let i = 0; i < len; i++) {
    smallest_index = findSmallest(arr); // 每次都去找最小
    newArr.push(arr.splice(smallest_index, 1)[0]); // 找到最小之后要从源数组中删掉
  }
  return newArr;
}

console.log(selectionSort(arr));

// 常见一点的排序
const arr1 = [5, 3, 6, 2, 10];
for (let i = 0; i < arr1.length - 1; i++) {
  for (let j = i + 1; j < arr1.length; j++) {
    if (arr1[i] > arr1[j]) {
      let temp = arr1[i];
      arr1[i] = arr1[j];
      arr1[j] = temp;
    }
  }
}
console.log(arr1);
