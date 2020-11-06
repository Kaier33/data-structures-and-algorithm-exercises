// 仅当列表是有序的时候, 二分查找才管用
// 大O 表示:  O(log n)

function binary_search(list, item) {
  let mid = 0,
    low = 0,
    high = list.length - 1;
  while (low <= high) {
    mid = Math.floor((low + high) / 2);
    if (list[mid] === item) {
      return mid;
    } else if (list[mid] > item) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return -1;
}

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(binary_search(list, 9));
