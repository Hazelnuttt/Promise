//在。。。之后
function after(times, callback) {
  //这个3，放入到after内部，也就是闭包，作用域没有被销毁
  return function() {
    console.log(times)
    if (--times === 0) {
      //保存了变量
      callback()
    }
  }
}

let fn = after(3, function() {
  //调用三次才会真正的被执行
  console.log('real')
})

fn()
fn()
fn()
