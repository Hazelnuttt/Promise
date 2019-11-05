let fs = require('fs')

let event = {
  _arr: [], //发布订阅之间没有关系
  on(cb) {
    this._arr.push(cb) //把这个函数存进数组
  },
  emit() {
    this._arr.forEach(cb => cb())
  }
}
let personalCard = {}
event.on(function() {
  //回调函数,这个函数不会立即执行
  console.log('读取一个')
})
event.on(function() {
  //回调函数,这个函数不会立即执行
  if (Object.keys(personalCard).length === 2) {
    console.log(personalCard)
  }
})
fs.readFile('./name.txt', 'utf8', function(err, data) {
  personalCard.name = data
  event.emit()
})

fs.readFile('./age.txt', 'utf8', function(err, data) {
  personalCard.age = data
  event.emit()
})
