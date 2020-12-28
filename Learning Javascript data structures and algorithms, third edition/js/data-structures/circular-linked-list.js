// 链表

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

class CircularLinkedList extends LinkedList {
  constructor(equalsFn = Util.defaultEquals) {
    super(equalsFn)
  }
  push(element) {
    const node = new Node(element)
    if (!this.head) {
      this.head = node
    } else {
      let current = this.getElementAt(this.size() - 1) // 获取最后一个
      current.next = node
    }
    node.next = this.head
    this.count++
  }
  instert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element)
      if (index === 0) {
        let current = this.head
        if (this.size() === 0) {
          this.head = node
          node.next = this.head
        } else {
          node.next = current
          current = this.getElementAt(this.size()) // 获取最后一个元素, 让其next指向head
          this.head = node
          current.next = this.head
        }
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
  removeAt(index) {
    if (index >= 0 && index <= this.count) {
      let current = this.head
      if (index === 0) {
        if (this.size === 1) {
          this.head = undefined
        } else {
          const remove = this.head
          current = this.getElementAt(this.size()) // 获取最后一个
          this.head = this.head.next
          current.next = this.head
          current = remove // 用于在最后返回出去被删掉的元素
        }
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
}

const circularLinkedList = new CircularLinkedList()

circularLinkedList.push(2)
// circularLinkedList.push(3)
circularLinkedList.instert(1, 0)
circularLinkedList.instert(3, 2)
console.log(circularLinkedList.toString())
console.log('size:', circularLinkedList.size())
console.log(circularLinkedList)
