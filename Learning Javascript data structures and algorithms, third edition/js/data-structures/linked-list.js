// 链表 (由 head + nodes 组成的数据结构)

const Util = require("../util")
class Node {
  constructor(element) {
    this.element = element
    this.next = undefined
  }
}

class LinkedList {
  constructor(equalsFn = Util.defaultEquals) {
    this.count = 0
    this.head = undefined
    this.equalsFn = equalsFn // 要么用默认的, 要么自己传进来一个比较函数
  }
  push(element) {
    if (!element) return undefined

    const node = new Node(element)
    if (!this.head) {
      this.head = node
    } else {
      let current = this.head
      while (current.next) { // 找到链表的最后一项
        current = current.next
      }
      current.next = node
    }
    this.count++
  }
  instert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element)
      if (index === 0) {
        const current = this.head
        node.next = current
        this.head = node
      } else {
        const prev = this.getElementAt(index - 1)
        const current = prev.next
        prev.next = node
        node.next = current
      }
      this.count++
      return true
    }
    return false
  }
  remove(element) {
    const index = this.indexOf(element)
    return this.removeAt(index)
  }
  indexOf(element) {
    if (!element) return -1
    let current = this.head
    for (let i = 0; i < this.count; i++) {
      if (this.equalsFn(current.element, element)) {
        return i
      }
      current = current.next
    }
    return -1
  }
  removeAt(index) {
    if (index >= 0 && index <= this.count) {
      let current = this.head
      if (index === 0) {
        this.head = current.next
      } else {
        let prev = this.getElementAt(index - 1)
        current = prev.next
        prev.next = current.next
      }
      this.count--
      return current.element
    }
    return undefined
  }
  getElementAt(index) {
    if (index >= 0 && index <= this.count) {
      let node = this.head
      for (let i = 0; i < index && node; i++) {
        node = node.next
      }
      return node
    }
    return undefined
  }
  getHead() { return this.head }
  isEmpty() { return this.size() === 0 }
  size() { return this.count }
  toString() {
    if (this.isEmpty()) return ''
    let str = this.head.element
    let current = this.head
    for (let i = 0; i < this.count - 1; i++) {
      current = current.next
      str += ',' + current.element
    }
    return str
  }
}

const list = new LinkedList()
list.push(1)
list.push(2)
list.push(3)
list.push(5)
list.instert(4, 3)
list.instert(6, 5)
list.instert(0, 0)
list.instert(7, 7)
console.log('size:', list.size())
console.log(list.toString())
console.log(list.indexOf(7))