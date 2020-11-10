// 分而治之(divide and conquer, D&C) - 一种著名的递归式问题解决方法
/**
 D&C解决问题的过程包括两个步骤
 (1) 找出基线条件, 这种条件必须尽可能简单
 (2) 不断将问题分解(或者说每次递归都要缩小规模), 直到符合基线条件
*/

// 练习4.1 递归去算 数组内的数字相加
const arr = [1, 2, 3, 4, 5];
function recu(arr) {
  if (arr.length === 1) {
    return arr[0];
  } else {
    return arr[0] + recu(arr.slice(1));
  }
}
console.log(recu(arr));

// 练习4.2 利用递归函数计算列表包含的元素数
const arr1 = [1, 2, 3, 4, 5, 6, 7];
function sum(list) {
  if (list.length === 1) {
    return 1;
  } else {
    return 1 + sum(list.slice(1));
  }
}
console.log(sum(arr1));

// 练习4.3 找出列表中最大的数字. 思路: 两两比较, 只保留最大值, 数组长度-1
const arr2 = [1, 23, 5, 96, 7, 48];
function findMax(list) {
  if (list.length === 2) {
    return list[0] > list[1] ? list[0] : list[1];
  } else {
    let sub_max = findMax(list.slice(1));
    return list[0] > sub_max ? list[0] : sub_max;
  }
}
console.log(findMax(arr2));

// 快速排序是一种常见的排序算法,比选择排序快得多, 也使用了D&C
// 思路: 找准基, 分左右数组, 小于基准的在左, 大于反之. 最后 3个数组相加
const arr3 = [10, 15, 1, 8, 3];
function quicksort(arr) {
  if (arr.length < 2) {
    return arr;
  } else {
    let pivot = arr[0];
    let less = [],
      greater = [];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] <= pivot) {
        less.push(arr[i]);
      } else {
        greater.push(arr[i]);
      }
    }
    return quicksort(less).concat(pivot).concat(quicksort(greater));
  }
}
console.log(quicksort(arr3));
