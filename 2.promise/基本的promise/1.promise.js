let Promise = require('./promise')
//promise的特点
// 承诺  promise 是一个类

//有三个状态
// 1) resolve(成功态) reject(失败态) pending(默认等待态) // 一旦成功，不能失败，即不能改变
// 2) 每个 promise 实例都有一个 then 方法
let promise = new Promise((resolve, reject) => {
  //executor 执行器 立即执行
  //console.log(1)
  //resolve('hello')
  //reject()
  //throw new Error('失败了') //一旦失败了，就不会走了
  setTimeout(() => {
    resolve('ok的')
  }, 1000) //卡住了 ，状态是pending
})

promise.then(
  data => {
    console.log(data)
  },
  err => {
    console.log('err', err)
  }
)
promise.then(
  data => {
    console.log(data)
  },
  err => {
    console.log('err', err)
  }
)
promise.then(
  data => {
    console.log(data)
  },
  err => {
    console.log('err', err)
  }
)
