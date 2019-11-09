## 什么叫闭包？作用域的产生？

是 根据函数定义的位置 ; 不是 执行上下文
可以不在当前作用域下执行
作用域和执行的上下文不一样，但是却拿到了作用域的值，那个函数没有被销毁

## call

1. 可以改变函数中的 this 指向
2. 让函数执行

## promise 有哪些优缺点？

优：1) 可以解决异步嵌套问题 2) 可以处理异步并发
缺：1) promise 基于回调 2) promise 无法终止异步

## async + await ==>Promise.resolve()

## Promise 的执行机制和原理

- promise 的产生替代了回调函数
- promise 是一个类，上面有
- 一、executor(立即执行)
- 二、resolve(判断：1.是值 2.是个 promise)
- 三、reject(判断：1.是值 2.是个 promise)
- 四、then(返回一个新的 promise；then 的参数：1.是值 2.是个 promise；解决异步：通过发布订阅)
- 五、all(返回一个新的 Promise；解决异步并发：通过发布订阅)
- 六、finally(需要把 data 传给下面的 then，return p.then()；解决异步，通过 Promise.resolve(),这个方法会等待这个 promise 执行完后再继续执行) 等 api 方法，
