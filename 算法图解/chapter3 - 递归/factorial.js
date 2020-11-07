// 递归只是让解决方案更清晰,并没有性能上的优势. 实际上, 在有些情况下,使用循环性能更好.
// 每个递归函数都有两个部分: 基线条件(即终止条件) 和 递归条件

function factorial(n) {
  if (n == 1) {
    return 1
  } else {
    return n * factorial(n - 1)
  }
}

console.log(factorial(5))