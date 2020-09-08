const url = require('url')
const request = {
    get url(){ 
        // 属性访问器 ctx.request.url Object.defineProperty
        // 这里的this代表谁访问了url 就是谁 代表 ctx.request
        return this.url
    },
    get path(){
        return url.parse(this.req.url).pathname
    },
    get query(){
        return url.parse(this.req.url).query
    },
    }
}
module.exports = request