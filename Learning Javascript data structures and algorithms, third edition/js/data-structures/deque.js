// 双端队列
class Deque {
  constructor() {
    this._count = 0;
    this._lowestCount = 0;
    this._items = {};
  }
  addFront(element) {
    if (this.isEmpty()) {
      // 空的话就等于Push
      this.addBack(element);
    } else if (this._lowestCount > 0) {
      // 已有出队操作, 向对首插队
      this._lowestCount--;
      this._items[this._lowestCount] = element;
    } else {
      // 未曾有出队操作, _lowestCout = 0, 队列全部向后移动一位
      for (let i = this._count; i > 0; i--) {
        this._items[i] = this._items[i - 1];
      }
      this._count++;
      this._items[this._lowestCount] = element;
    }
  }
  addBack(element) {
    this._items[this._count] = element;
    this._count++;
  }
  removeFront() {
    if (this.isEmpty()) return "";
    const result = this._items[this._lowestCount];
    delete this._items[this._lowestCount];
    this._lowestCount++;
    return result;
  }
  removeBack() {
    if (this.isEmpty()) return "";
    this._count--;
    const result = this._items[this._count];
    delete this._items[this._count];
    return result;
  }
  peekFront() {
    if (this.isEmpty()) return "";
    return this._items[this._lowestCount];
  }
  peekBack() {
    if (this.isEmpty()) return "";
    return this._items[this._count - 1];
  }

  size() {
    return this._count - this._lowestCount;
  }
  isEmpty() {
    return this.size() === 0;
  }
  clear() {
    this._count = 0;
    this._lowestCount = 0;
    this._items = {};
  }
  toString() {
    if (this.isEmpty()) return "";
    let str = this.peekFront() + "";
    for (let i = this._lowestCount + 1; i < this._count; i++) {
      str += `,${this._items[i]}`;
    }
    return str;
  }
}

const deque = new Deque();

console.log(deque.isEmpty());
deque.addFront("Tom");
deque.addFront("Mary");
deque.addFront("John");
console.log(deque.size());
console.log(deque.peekFront());
deque.removeFront();
deque.removeBack();
deque.addFront("John");
deque.addBack("Lau");
console.log(deque.toString());
console.log(deque);

// exercise
// 回文检查
function palindromeChecker(aStr) {
  if (!aStr) return false;
  let str = aStr.toLocaleLowerCase().split(" ").join(); // 转成小写 去空格
  const deque = new Deque();
  let isPalindrome = true;
  let firstChar = "",
    lastChar = "";
  for (let i = 0; i < str.length; i++) {
    deque.addBack(str[i]);
  }
  while (deque.size() > 1 && isPalindrome) {
    firstChar = deque.removeFront();
    lastChar = deque.removeBack();
    if (firstChar !== lastChar) isPalindrome = false;
  }
  return isPalindrome;
}

console.log(palindromeChecker("MADam"));
