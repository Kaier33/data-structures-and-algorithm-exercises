// 仅当列表是有序的时候, 二分查找才管用
// 大O 表示:  O(log n)

function binary_search(list, item) {
  let low = 0,
    high = list.length - 1,
    mid = (low + high) / 2;
    
}

const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(binary_search(list, 9));
