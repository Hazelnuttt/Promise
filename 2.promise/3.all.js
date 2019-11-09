let Promise = require('./promise')
let fs = require('fs')
// function a() {
let a = new Promise((resolve, reject) => {
  fs.readFile('./name.txt', 'utf8', function(err, data) {
    resolve(data)
  })
})

// }

function b() {
  return new Promise((resolve, reject) => {
    fs.readFile('./age.txt', 'utf8', function(err, data) {
      resolve(data)
    })
  })
}

const isPromise = value => {
  if ((typeof value === 'object' && value !== null) || typeof value === 'function') {
    if (typeof value.then === 'function') {
      return true
    }
  } else {
    return false
  }
}
Promise.all = function(values) {
  return new Promise((resolve, reject) => {
    let arr = []
    let index = 0 // 解决多个异步的并发问题 要使用计数器

    function processData(key, value) {
      arr[key] = value
      if (++index == values.length) {
        resolve(arr)
      }
    }

    for (let i = 0; i < values.length; i++) {
      let current = values[i]
      if (isPromise(current)) {
        current.then(data => {
          processData(i, data) // 异步 // 有个let 、var 问题 var 不会产生作用域
          console.log(i, data)
        }, reject)
      } else {
        processData(i, current)
      }
    }
  })
}
Promise.all([
  1,
  2,
  3,
  a.then(data => {
    return data
  }),
  b().then(data => {
    return data
  }),
  6,
  7
]).then(data => {
  console.log(data)
})

// let index = 0
// for (i = 0; i < 10; i++) {
//   //console.log(i)
//   index++
//   if (index == 6) {
//     console.log(i)
//   }
// }
// console.log(i)
