class Stack {
  constructor() {
    this._items = [];
  }
  push(element) {
    this._items.push(element);
  }
  pop() {
    return this._items.pop();
  }
  peek() {
    return this._items[this._items.length - 1];
  }
  isEmpty() {
    return this._items.length === 0;
  }
  clear() {
    this._items.length = 0;
  }
  size() {
    return this._items.length;
  }
  toString() {
    return this._items.toString();
  }
}

const stack = new Stack();
console.log(stack.isEmpty());
stack.push("one");
stack.push("two");
stack.push("three");
console.log(stack.pop());
console.log(stack.peek());
console.log(stack.toString());
console.log(stack.isEmpty());
console.log(stack.size());
stack.clear();
console.log(stack.isEmpty());
console.log(stack);

module.exports = Stack;
