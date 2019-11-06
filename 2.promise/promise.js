const PENDING = 'PENDING'
const RESOLVED = 'RESOLVE'
const REJECTED = 'REJECTED'

// 神经质||可能是别人的
// Object.defineProperty(x,then,{
//   get(){
//     throw new Error( )
//   }
// })
const resolvePromise = (promise2, x, resolve, reject) => {
  //判断x的值
  let called //内部测试，成功失败都会调用
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  if ((typeof x === 'object' && x != null) || typeof x === 'function') {
    try {
      let then = x.then //x肯定是对象啊，那区then为什么会报错呢
      if (typeof then === 'function') {
        //有then方法就姑且认为x是一个promise
        then.call(
          //小心翼翼，谨慎的。。。//x.then()
          x,
          y => {
            //y可能还是promise
            // resolve(y)
            if (called) {
              return
            }
            called = true
            resolvePromise(promise2, y, resolve, reject)
          },
          r => {
            //promise失败了还能调用成功
            if (called) {
              return
            }
            called = true
            reject(r)
          }
        )
      } else {
        //{x:{then:1}} //普通对象
        resolve(x)
      }
    } catch (e) {
      if (called) {
        return
      }
      called = true
      reject(e)
    }
  } else {
    //那就是一个普通值
    resolve(x)
  }
}
class Promise {
  //1. 这个属性能否在原型上使用
  //2. 看属性是否公用
  constructor(executor) {
    this.status = PENDING //默认是pending
    //成功
    //这个value和reason当调用then的时候，也可以拿到，所以要把它保存起来
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = [] //成功的回调数组
    this.onRejectedCallbacks = [] // 失败的回调数组
    let resolve = value => {
      //屏蔽
      if (this.status === PENDING) {
        this.value = value
        this.status = RESOLVED
        //发布
        this.onResolvedCallbacks.forEach(fn => fn()) //参数拿到了，不用管了
      }
    }
    //失败
    let reject = reason => {
      //屏蔽
      if (this.status === PENDING) {
        this.reason = reason
        this.status = REJECTED
        //发布
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    try {
      //这个try catch 只能捕获同步异常，promise2 里面加了一个setTimeout，是异步的
      executor(resolve, reject) //默认立即执行//resolve 和 reject 是两个函数
    } catch (e) {
      reject(e) //执行时发生错误等价于调用了reject
    }
  }

  then(onfulfilled, onrejected) {
    //onfulfilled 和 onrejected 是两个函数,但又是可选的
    //目前有两个参数
    onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : data => data
    onrejected =
      typeof onrejected === 'function'
        ? onrejected
        : err => {
            throw err
          }
    let promise2 = new Promise((resolve, reject) => {
      //js执行的问题，需要new完Promise,再把值赋给promise2，还没new完，就拿不到promise2
      //executor 会立即执行
      if (this.status === RESOLVED) {
        setTimeout(() => {
          //写个定时器延迟，就可以异步执行
          try {
            let x = onfulfilled(this.value)
            //x可能是普通值，也可能是promise
            //todo:判断x的值=>promise2的状态
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onrejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.status === PENDING) {
        //如果是异步就订阅
        this.onResolvedCallbacks.push(() => {
          //todo
          setTimeout(() => {
            try {
              let x = onfulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onrejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })
    return promise2 //调用完后，返回，每次都返回新的promise
  }
}

module.exports = Promise
