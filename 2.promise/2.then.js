//1) （then 中传递的函数）判断成功|失败的返回结果
//2)  判断是不是promise，如果是，就采用它的状态
//3)                   如果不是，直接将结果传递下去
let Promise = require('./promise')

//1) 问题1 ：x 和 promise 2 不能是同一个
// let p = new Promise((resolve, reject) => {
//   resolve('c')
// })

// let promise2 = p.then(() => {
//   return promise2
// })
// promise2.then(null, err => {
//   console.log(err)
// })

//----------------------------------------------------------------
// let p = new Promise((resolve, reject) => {
//   //这是promise1
//   resolve(1000)
// })

// let promise2 = p.then(data => {
//   console.log(data)
//   //onfulfilled 的返回结果 // 这个 promise2 是 promise1的then
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(
//         new Promise((resolve, reject) => {
//           resolve(10000000)
//         })
//       )
//     }, 3000)
//   })
// })
// promise2
//   .then(
//     data => {
//       console.log(data)
//     },
//     err => {
//       console.log(err)
//       return 100
//     }
//   )
//   .then(data => {
//     console.log('s', data)
//   })

let p = new Promise((resolve, reject) => {
  resolve(123)
})
p.then()
  .then()
  .then(
    data => {
      console.log(data)
    },
    err => {
      console.log('err', err)
    }
  )
