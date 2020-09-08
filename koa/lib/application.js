const EventEmitter = require('events')
// 因为使用了on方法 继承了events
const http = require('http')

class Application extends EventEmitter{
    use(callback){
        this.callback = callback
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