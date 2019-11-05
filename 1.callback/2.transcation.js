function perform(anyMethod, wrappers) {
  //传入的参数是函数，回调函数
  return function() {
    // 返回值还是个函数
    wrappers.forEach(wrapper => wrapper.initialize())
    anyMethod()
    wrappers.forEach(wrapper => wrapper.close())
  }
}

let newFn = perform(
  function() {
    //调用perform
    console.log('say') //需求：在say之前|后增加一些功能
  },
  [
    {
      initialize() {
        console.log('wrapper1 beforeSay')
      },
      close() {
        console.log('wrapper1 close')
      }
    },
    {
      initialize() {
        console.log('wrapper2 beforeSay')
      },
      close() {
        console.log('wrapper2 close')
      }
    }
  ]
)

newFn()
