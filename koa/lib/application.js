const EventEmitter = require('events')
// 因为使用了on方法 继承了events
const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')

class Application extends EventEmitter{
    constructor() {
        super();
        // 为了防止 多个实例共享 response、request、context 我都需要进行拷贝
        this.response = Object.create(response)
        this.request = Object.create(request)
        this.context = Object.create(context)
        this.middlewares = [] // 存储用户所有的callback
    }
    use(callback){ // 将用户传递的callback 全部组合起来(redux compose) reduce 实现compose
        // this.callback = callback
        this.middlewares.push(callback)


    }
    createContext(req,res){
        // 每次请求都会创建全新的上下文
        let response = Object.create(this.response)
        let request = Object.create(this.request)
        let context = Object.create(this.context)
        // 上下文中有一个request 对象 是自己封装的对象
        context.request = request
        context.response = response
        // 上下文中还有一个req属性 指代的是原生的req
        // 自己封装的request 对象上有req属性
        context.request.req = context.req = req
        context.response.req = context.res = res
        return context
    }
    async handleRequest(req,res){
        let ctx = this.createContext(req,res) // 创建一个上下文
        await this.compose(ctx)
        let body = ctx.body; // 当组合后的promise完成后 拿到最终的结果 响应回去
        res.end(body)

        // this.callback(req,res)
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
