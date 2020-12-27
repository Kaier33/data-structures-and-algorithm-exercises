// 链表 (由 head + nodes 组成的数据结构)

const Util = require('../util')
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
      while (current.next) {
        // 找到链表的最后一项
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
  getHead() {
    return this.head
  }
  isEmpty() {
    return this.size() === 0
  }
  size() {
    return this.count
  }
  clear() {
    this.head = undefined
    this.count = 0
  }
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

class DoublyNode extends Node {
  constructor(element) {
    super(element)
    this.prev = undefined
  }
}

class DoublyLinkedList extends LinkedList {
  constructor(equalsFn = Util.defaultEquals) {
    super(equalsFn)
    this.tail = undefined
  }
  push(element) {
    const node = new DoublyNode(element)
    if (!this.head) {
      this.head = node
      this.tail = node
    } else {
      this.tail.next = node
      node.prev = this.tail
      this.tail = node
    }
    this.count++
  }
  instert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new DoublyNode(element)
      let current = this.head
      if (index === 0) {
        // 在head处插入
        if (this.count === 0) {
          this.head = node
          this.tail = node
        } else {
          current.prev = node
          node.next = current
          this.head = node
        }
      } else if (index === this.count) {
        // 在tail处插入
        current = this.tail
        current.next = node
        node.prev = current
        this.tail = node
      } else {
        // 中间任意位置插入
        let prev = this.getElementAt(index - 1)
        current = prev.next
        current.prev = node
        prev.next = node
        node.next = current
        node.prev = prev
      }
      this.count++
      return true
    }
    return false
  }
  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head
      // 考虑事项: 删头, 删尾, 中间任意位置
      if (index === 0) {
        if (this.count === 1) {
          this.head = undefined
          this.tail = undefined
        } else {
          this.head = current.next
          this.head.prev = undefined
        }
      } else if (index === this.count - 1) {
        current = this.tail
        this.tail = current.prev
        this.tail.next = undefined
      } else {
        current = this.getElementAt(index)
        let next = current.next
        next.prev = current.prev
        current.prev.next = next
      }
      this.count--
      return current.element
    }
    return undefined
  }
  getTail() {
    return this.tail
  }
  clear() {
    super.clear()
    this.tail = undefined
  }
}

const doublyLinkedList = new DoublyLinkedList()
doublyLinkedList.push(1)
doublyLinkedList.push(3)
doublyLinkedList.instert(2, 1)
doublyLinkedList.push(4)
doublyLinkedList.removeAt(3)
// console.log(doublyLinkedList)
console.log(doublyLinkedList.toString())
console.log('length::', doublyLinkedList.size())
