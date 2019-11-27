// generator函数 ，是个生成器，特点是可以暂停的
// 1.* 2.yield 产出
// 生成 iterator(迭代器)

//我们Object需要用到...运算符 与 for of遍历怎么办呢？
//如果我们要使用它的话，Object身上需要有一个Symbol.iterator属性
let obj = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
  // 迭代器 默认就是一个对象 具备 next方法 和 调用后返回value和done 的属性
  [Symbol.iterator]() {
    // index用来记遍历圈数
    let index = 0
    return {
      next: () => {
        return {
          value: this[index],
          done: this.length == index++
        }
      }
    }
  }
}

console.log([...obj])

let obj1 = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
  *[Symbol.iterator]() {
    // index用来记遍历圈数
    for (let i = 0; i < this.length; i++) {
      yield this[i]
    }
  }
}

console.log([...obj1])
//----------------------------------------------------
// function* read() {
//     let a = yield 'hello';
//     console.log(a);
//     let b = yield 'world';
//     console.log(b);
// }
// // 1) 碰到yield 就停止
// let it = read();
// console.log(it.next()) // 第一次next方法传递的参数是没有任何意义的
// console.log(it.next(1)) // 会传递给上一次yield的返回值
// console.log(it.next(2))
//------------------------------------------
let fs = require('fs').promises // 他可以直接将fs中的方法变成promise 10+
function* read() {
  try {
    let content = yield fs.readFile('name.txt', 'utf8')
    let r = yield fs.readFile(content, 'utf8')
    return r
  } catch (e) {
    console.log('err', e)
  }
}
let it = read()
// 循环 循环不支持异步  递归
let { value, done } = it.next()
Promise.resolve(value).then(data => {
  let { value, done } = it.next(data)
  Promise.resolve(value).then(data => {
    let { value, done } = it.next(data)
    console.log(value)
  })
})
//-----------------------------------------------------------------------------------
//co库--->promise
//co@4.0.0 has been released, which now relies on **promises**.
// It is a stepping stone towards the **async/await** proposal. The primary API change is how co() is invoked.
// Before, co returned a "thunk", which you then called with a **callback and optional arguments**.
// Now, co() returns a **promise**.
function co(it) {
  return new Promise((resolve, reject) => {
    function next() {
      let { value, done } = it.next(data)
      if (!done) {
        Promise.resolve(value).then(
          data => {
            //包一下
            next(data) //递归
          },
          err => {
            reject(err)
          }
        )
      } else {
        resolve(data)
      }
    }
    next()
  })
}

co(read()).then(
  data => {
    console.log(data)
  },
  err => {
    console.log(err)
  }
)

//-------------------------------------------------------------------------
//async/await 基于 generator和co
let fs = require('fs').promises
async function read() {
  try {
    let content = await fs.readFile('name.txt', 'utf8')
    let r = await fs.readFile(content, 'utf8')
    return r
  } catch (e) {
    console.log('err', e)
  }
}

read().then(
  data => {
    console.log(data)
  },
  err => {
    console.log(err)
  }
)
