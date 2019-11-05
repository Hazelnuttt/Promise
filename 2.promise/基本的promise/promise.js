const PENDING = 'PENDING'
const RESOLVED = 'RESOLVE'
const REJECTED = 'REJECTED'
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
      executor(resolve, reject) //默认立即执行//resolve 和 reject 是两个函数
    } catch (e) {
      reject(e) //执行时发生错误等价于调用了reject
    }
  }

  then(onfulfilled, onrejected) {
    //onfulfilled 和 onrejected 是两个函数
    //目前有两个参数
    if (this.status === RESOLVED) {
      onfulfilled(this.value)
    }
    if (this.status === REJECTED) {
      onrejected(this.reason)
    }
    if (this.status === PENDING) {
      //如果是异步就订阅
      this.onResolvedCallbacks.push(() => {
        //todo
        onfulfilled(this.value)
      })
      this.onRejectedCallbacks.push(() => {
        onrejected(this.reason)
      })
    }
  }
}

module.exports = Promise
