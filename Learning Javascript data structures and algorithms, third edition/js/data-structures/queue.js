// 考虑到队列经常进行 入队出队 操作, 这里用对象去模拟;  如果是数组的话, 其增删为O(n), 效率较低
class Queue {
  constructor() {
    this._items = {};
    this._count = 0; // 总量 (注意, 出队不减少该量)
    this._lowestCount = 0; // 对首
  }
  enqueue(element) {
    this._items[this._count] = element;
    this._count++;
  }
  dequeue() {
    if (this.isEmpty()) return;
    const result = this._items[this._lowestCount];
    delete this._items[this._lowestCount];
    this._lowestCount++;
    return result;
  }
  peek() {
    if (this.isEmpty()) return;
    return this._items[this._lowestCount];
  }
  isEmpty() {
    return this.size() === 0;
  }
  size() {
    return this._count - this._lowestCount; // 总量 - 对首 之差
  }
  clear() {
    this._items = {};
    this._count = 0;
    this._lowestCount = 0;
  }
  toString() {
    if (this.isEmpty()) return "";
    let str = this.peek() + "";
    for (let i = this._lowestCount + 1; i < this._count; i++) {
      str += `,${this._items[i]}`;
    }
    return str;
  }
}

const queue = new Queue();

console.log(queue.isEmpty());
queue.enqueue("Tom");
queue.enqueue("Mary");
queue.enqueue("John");
console.log(queue.size());
console.log(queue.peek());
queue.dequeue();
console.log(queue.size());
console.log(queue.toString());

// exercise
// 击鼓传花游戏
function hotPotato(list, num) {
  const queue = new Queue();
  const result = {
    winner: "",
    outList: [],
  };
  list.forEach((ele) => {
    queue.enqueue(ele);
  });
  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue());
    }
    result.outList.push(`${queue.dequeue()}被淘汰了`);
  }
  result.winner = `本轮胜者为${queue.dequeue()}`;
  return result;
}
const personList = ["John", "Jack", "Camila", "Ingrid", "Carl"];

console.log(hotPotato(personList, 7));
