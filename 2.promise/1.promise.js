//then 的用法
let fs = require('fs')
//链式调用，分段读取
//缺点：1)回调嵌套  2) 异步错误处理
// fs.readFile('./name.txt', 'utf8', function(err, data) {
//   fs.readFile(data, 'utf8', function(err, data) {
//     console.log(data)
//   })
// })

//把它变成promise
function read(url) {
  return new Promise((resolve, reject) => {
    fs.readFile(url, 'utf8', function(err, data) {
      if (err) reject(err)
      resolve(data)
    })
  })
}

//如果一个promise的then方法中的函数（成功|失败），返回的结果是一个promise，会自动将这个promise执行，并且采用它的状态，如果成功，会将成功结果向外层的下一个then传递
read('./name.txt')
  .then(
    data => {
      return read(data + 1)
    },
    err => {
      console.log('err', err)
    }
  )
  .then(
    data => {
      console.log(data)
    },
    err => {
      console.log('err', err)
      return 'hahahaha' //如果返回的是一个普通值，那么会将这个普通值作为下一次成功的结果
    }
  )
  .then(data => {
    console.log(data) //明明失败了，我不希望它继续走then了？
    new Promise(() => {}) //终止promise 可以返回一个pending的promise
  })

//只有两种情况会失败 返回一个失败的promise 或者 抛出异常
//每次promise的时候 都会返回一个新的promise

//.catch(err=>{}) 可以统一处理，但是如果有近的，肯定走近的
