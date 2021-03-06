// koa 对http的一个封装 实现了一个node框架 => 根据这个框架去实现自己的mvc框架
// 每个人用koa的方式都不太一样 无法做到约定性 => egg基于koa封装的约定性的框


// npm install koa
// koa
    // lib
    // application 创建应用
    // context 上下文
    // request koa中的自己实现的request的对象 path
    // application koa 中的自己实现的reponse的对象
const Koa = require('./koa')
const app = new Koa()
// 1、实现基本的逻辑
// 2、ctx是什么东西?

// koa中要求每个next 方法前面 都必须增加await 否则不存在等待效果
app.use((ctx,next)=>{
    ctx.body = 'hello world'
    // ctx 中整合了request responese req和res
    // koa 自己实现的request response
    // http 原生的req和res
    console.log(ctx.req.url)
    console.log(ctx.requset.req.url)

    //--------------------------
    console.log(ctx.requset.url) // 内部使用了url模块进行了解析
    console.log(ctx.url)
    // 以后使用ctx变量时 很少会使用原生的req和res （一般使用都是request ,response 或者直接使用的方式）

})
app.on('error',(err)=>{
    console.log(err)
})
// next() 1、可以把多个模块通过next方法来链接起来
// 2、可以决定是否向下执行（可以实现后台权限
// 3、可以封装一些方法 在中间件中，向下执行

app.listen(3000)
