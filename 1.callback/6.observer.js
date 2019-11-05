//被观察
class Subject {
  constructor() {
    this.state = 'happy'
    this.arr = []
  }
  attach(o) {
    // 订阅
    this.arr.push(o)
  }
  setState(newState) {
    this.state = newState
    this.arr.forEach(o => o.update(this.state)) //发布
  }
}

//观察者
class Observer {
  constructor(name) {
    this.name = name
  }
  update(newState) {
    console.log(this.name + ':' + '小宝宝的状态' + newState)
  }
}

let s = new Subject('小宝宝')
let o1 = new Observer('我')
let o2 = new Observer('老婆')
s.attach(o1)
s.attach(o2)
s.setState('sad')
s.setState('憨憨')
