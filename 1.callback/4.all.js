let fs = require('fs') //node 中的api,文件读写的

// 1)
// let personalCard = {}
// //这两步是异步的，哪一个先不知道
// fs.readFile('./name.txt', 'utf8', function(err, data) {
//   console.log(data)
//   personalCard.name = data
// })
// fs.readFile('./age.txt', 'utf8', function(err, data) {
//   console.log(data)
//   personalCard.age = data
// })

// console.log(personalCard)

// 串行；通过嵌套 ，首先：第一步执行 3s, 第二步执行 2s, 第三步执行 1s,程序结束结束需要6s。其次：第一步，第二步是完全独立的。最后：串行
// let personalCard = {}
// //这两步是异步的，哪一个先不知道
// fs.readFile('./name.txt', 'utf8', function(err, data) {
//   // 第一步
//   console.log(data)
//   personalCard.name = data
//   fs.readFile('./age.txt', 'utf8', function(err, data) {
//     //第二步
//     console.log(data)
//     personalCard.age = data
//     console.log(personalCard) //第三步
//   })
// })

//并行
// 缺点：不希望有一个对象，而且会修改原函数，这就恶心了
// let personalCard = {}

// function out() {
//   if (Object.keys(personalCard).length === 2) {
//     console.log(personalCard)
//   }
// }

// fs.readFile('./name.txt', 'utf8', function(err, data) {
//   personalCard.name = data
//   out()
// })

// fs.readFile('./age.txt', 'utf8', function(err, data) {
//   personalCard.age = data
//   out()
// })

//最终拿到一个整体的结果 {name:xxx , age:xxx}
// 1)通过回调函数来解决 after 函数
// 2)发布订阅

function after(times, cb) {
  let personalCard = {} //把key,value存起来，这个对象不能写在下面，只有这里才能不被销毁
  return function(key, value) {
    // 拿到上级作用域的东西
    personalCard[key] = value
    if (--times === 0) {
      cb(personalCard)
    }
  }
}

let out = after(2, function(result) {
  console.log(result)
})

fs.readFile('./name.txt', 'utf8', function(err, data) {
  out('name', data)
})

fs.readFile('./age.txt', 'utf8', function(err, data) {
  out('age', data)
})
