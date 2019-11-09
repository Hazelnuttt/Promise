let Promise = require('./promise')
let p = new Promise((resolve, reject) => {
  // 1)第一种情况：
  //   resolve(100) //把100传下去
  // 2)第二种情况：
  resolve(
    new Promise((resolve, reject) => {
      reject(100)
    })
  )
}).then(
  data => {
    console.log(data)
  },
  err => {
    console.log('err', err)
  }
)

//Promise.resolve
//  1) executor 里的两个方法里的其一
//  2) resolve函数的参数，1. 值(直接向下传) 2. 一个新的Promise(递归)
//  3) value status
//  4)
