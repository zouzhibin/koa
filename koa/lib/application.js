const EventEmitter = require('events')
// 因为使用了on方法 继承了events
const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')

class Application extends EventEmitter{
    use(callback){
        this.callback = callback
        // 为了防止 多个实例共享 response、request、context 我都需要进行拷贝
        this.response = Object.create(response)
        this.request = Object.create(request)
        this.context = Object.create(context)
    }
    handleRequest(req,res){
        this.callback(req,res)
    }
    listen(...args){
        let server = http.createServer(this.handleRequest.bind(this))
        server.listen(...args)
    }
}
module.exports = Application












// let obj = {
//     name1:1
// }
// class A{
//     constructor(){
//         this.a = Object.create(obj)
//     }
// }
// let a1 = new A()
// let a2 = new A()
// a1.a.name1 = 19
// console.log(obj)
// console.log(a1.a.name1)
// console.log(a2.a.name1)