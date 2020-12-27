class Stack {
  constructor() {
    this._count = 0
    this._items = {}
  }
  push(element) {
    this._items[this._count] = element
    this._count++
  }
  pop() {
    if (this.isEmpty()) {
      return undefined
    }
    this._count--
    const result = this._items[this._count]
    delete this._items[this._count]
    return result
  }
  peek() {
    if (this.isEmpty()) {
      return undefined
    }
    return this._items[this._count - 1]
  }
  isEmpty() {
    return this._count === 0
  }
  clear() {
    this._count = 0
    this._items = {}
  }
  size() {
    return this._count
  }
  toString() {
    if (this.isEmpty()) {
      return ''
    }
    let str = this._items[0]
    for (let i = 1; i < this._count; i++) {
      str += `,${this._items[i]}`
    }
    return str
  }
}

const stack = new Stack()
console.log(stack.isEmpty())
stack.push('one')
stack.push('two')
stack.push('three')
console.log(stack.pop())
console.log(stack.peek())
console.log(stack.size())
stack.clear()
console.log(stack.isEmpty())
stack.push('four')
stack.push('five')
stack.push('six')
console.log(stack.toString())
console.log(stack)

module.exports = Stack

// exercise
// 10进制转2
function decimalTobinary(number) {
  if (isNaN(number)) return ''
  const remainderStack = new Stack()
  let str = ''
  let num = number
  while (num > 0) {
    remainderStack.push(Math.floor(num % 2))
    num = Math.floor(num / 2)
  }
  while (!remainderStack.isEmpty()) {
    str += remainderStack.pop()
  }
  return str
}
console.log(decimalTobinary(42))

// 10进制 转 其他进制
function baseConverter(decNumber, base) {
  if (isNaN(decNumber)) return ''
  if (!(base >= 2 && base <= 36)) return ''
  const remainderStack = new Stack()
  let str = ''
  let num = decNumber
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  while (num > 0) {
    remainderStack.push(Math.floor(num % base))
    num = Math.floor(num / base)
  }
  while (!remainderStack.isEmpty()) {
    str += digits[remainderStack.pop()]
  }
  return str
}
console.log(baseConverter(42, 16))
