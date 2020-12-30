// 散列表

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

class ValuePair {
  constructor(key, value) {
    this.key = key
    this.value = value
  }
  toString() {
    return `[${this.key}: ${this.value}]`
  }
}

class HashTable {
  constructor(toStrFn = Util.defaultToString) {
    this.toStrFn = toStrFn
    this.table = {}
  }
  djb2HashCode(key) {
    // 最受社区推崇的散列函数之一, 极大减少了key冲突的概率
    const tableKey = this.toStrFn(key)
    let hash = 5381
    for (let i = 0; i < tableKey.length; i++) {
      hash = hash * 33 + tableKey.charCodeAt(i)
    }
    return hash % 1013
  }
  loseloseHashCode(key) {
    // 一个简单的散列函数 (容易发生key冲突, 为了方便演示, 所有用这个)
    if (typeof key === 'number') {
      return key
    }
    const tableKey = this.toStrFn(key)
    let hash = 0
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i)
    }
    return hash % 37
  }
  hashCode(key) {
    // 获取哈希值
    return this.loseloseHashCode(key)
  }

  put(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key)
      if (this.table[position] == null) {
        this.table[position] = new LinkedList()
      }
      this.table[position].push(new ValuePair(key, value))
      return true
    }
    return false
  }

  get(key) {
    const position = this.hashCode(key)
    const linkedList = this.table[position]
    if (linkedList != null && !linkedList.isEmpty()) {
      let current = linkedList.getHead()
      while (current != null) {
        if (current.element.key === key) {
          return current.element.value
        }
        current = current.next
      }
    }
    return undefined
  }

  remove(key) {
    const position = this.hashCode(key)
    const linkedList = this.table[position]
    if (linkedList != null && !linkedList.isEmpty()) {
      let current = linkedList.getHead()
      while (current != null) {
        if (current.element.key === key) {
          linkedList.remove(current.element)
          if (linkedList.isEmpty()) {
            delete this.table[position]
          }
          return true
        }
        current = current.next
      }
    }
    return false
  }

  getTable() {
    return this.table
  }

  isEmpty() {
    return this.size() === 0
  }

  size() {
    return Object.keys(this.table).length
  }

  clear() {
    this.table = {}
  }

  toString() {
    if (this.isEmpty()) {
      return ''
    }
    const keys = Object.keys(this.table)
    let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`
    for (let i = 1; i < keys.length; i++) {
      objString = `${objString},{${keys[i]} => ${this.table[
        keys[i]
      ].toString()}}`
    }
    return objString
  }
}

const hash = new HashTable()
hash.put('Ygritte', '123@email.com')
hash.put('Jonathan', '123@email.com')
hash.put('Jamie', '123@email.com')
hash.put('Jack', '123@email.com')
hash.put('Jasmine', '123@email.com')
hash.put('Jake', '123@email.com')
hash.put('Nathan', '123@email.com')
hash.put('Athelstan', '123@email.com')
hash.put('Sue', '123@email.com')
hash.put('Aethelwulf', '123@email.com')
hash.put('Sargeras', '123@email.com')

console.log(hash.toString())
