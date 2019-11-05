//回调函数是高阶函数的一种
//什么是高阶函数: 1) 如果函数的参数是一个函数 或 2)如果一个函数返回了一个函数

// function c(cb) {
//   cb()
// }

// function c(){
//   return function name(params){

//   }
// }

//高阶函数的应用

//需求：不希望破坏原有函数，但想要在原函数（前|后）加其他的功能
//AOP 面向切片编程
function say(who) {
  //todo
  console.log(who + '说话')
}

// Function.prototype.before = function(cb){
//   this = say;
//   let that = this;4
//   return function(){
//     cb();
//     that();
//   }
// }
//需求：让所有函数都有这个before功能，那这个before方法怎么实现，放到原型上面，say 是 Function 的一个实例
Function.prototype.before = function(cb) {
  //this = say
  // 剩余运算符，将所有的参数组合成一个数组，只能在最后一个参数里来用
  return (...args) => {
    //before是个function 它的返回值还是一个函数，newFn
    //箭头函数没有this,没有arguments,没有原型
    console.log(args)
    cb()
    this(...args) // 会有this问题，看调用函数之前的上下文 //展开运算符
  }
}

//这个函数在上面一个函数之前被调用
//则这个 newFn 就是 say.before + say
let newFn = say.before(function() {
  //before 方法的参数是一个函数,回调函数
  console.log('说话前')
})
newFn('w')

//aop
// let array = [1, 2, 3]
// array.push(4)
// console.log(array)
// 需求：[1,2,3].push(4);在调用push方法时 触发一句更新操作。---> 则需要重写这个push方法
let oldPush = Array.prototype.push //先拿到原型上的 push 方法
function push(...args) {
  //this = [1,2,3]
  console.log('数据更新了')
  oldPush.call(this, ...args)
}
let arr = [1, 2, 3]
push.call(arr, 4, 5, 6)
console.log(arr)

//react setState

// function say(who1, who2) {
//   console.log(who1 + '说话' + who2 + '说话')
// }

// Function.prototype.before = function(cb) {
//   return (...args) => {
//     console.log(args)
//     //剩余运算符
//     cb()
//     this(...args) //展开
//   }
// }

// let newFn = say.before(function() {
//   console.log('说话前')
// })
// newFn('a', 'b')
