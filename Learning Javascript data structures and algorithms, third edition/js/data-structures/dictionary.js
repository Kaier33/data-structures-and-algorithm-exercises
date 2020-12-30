// 字典
const Util = require('../util')

class ValuePair {
  constructor(key, value) {
    this.key = key
    this.value = value
  }
  toString() {
    return `[${this.key}: ${this.value}]`
  } 
}

class Dictionary {
  constructor(toStrFn = Util.defaultToString) {
    this.toStrFn = toStrFn // 为了确保传进来的键是字符串
    this.table = {}
  }
  hasKey(key) {
    return this.table[this.toStrFn(key)] != null
  }
  set(key, value) {
    if (key != null && value != null) {
      const tableKey = this.toStrFn(key)
      this.table[tableKey] = new ValuePair(key, value)
      return true
    }
    return false
  }
  get(key) {
    const valuePair = this.table[this.toStrFn(key)]
    return valuePair != null ? valuePair.value : undefined
  }
  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)]
      return true
    }
    return false
  }
  keyValue() { // 获取所有 valuePair
    return Object.values(this.table)
  }
  keys() { // 获取所有的 key
    return this.keyValue.map((valuePair) => valuePair.key)
  }
  values() { // 获取所有的 value 
    return this.keyValue.map((valuePair) => valuePair.value)
  }
  forEach(callBack) { // 迭代字典中的每个键值对
    const valuePair = this.keyValue()
    for (let i = 0; i < valuePair.length; i++) {
      const result = callBack(valuePair[i].key, valuePair[i].value)
      if (result === false) { // 如果回调函数返回false, 则中断循环
        break
      }
    }
  }
  size() {
    return this.keyValue.length
  }
  isEmpty() {
    return this.size() === 0
  }
  clear() {
    this.table = {}
  }
  toString() {
    if (this.isEmpty()) return ''
    const valuePair = this.keyValue()
    let resultStr = `${valuePair[0].toString()}`
    for (let i = 1; i < valuePair.length; i++) {
      resultStr = `${resultStr},${valuePair[i].toString()}`
    }
    return resultStr
  }
}

const dictionary = new Dictionary()
dictionary.set('Tim', 'timcook@email.com')
dictionary.set('John', 'johnsnow@email.com')
dictionary.set('Jam', 'jam@email.com')
dictionary.remove('Jam')

dictionary.forEach((k ,v) => {
  console.log('forEach:', `key: ${k}, value: ${v}`)
})
