
// __defineGetter__ 方法可以将一个函数绑定在当前对象的指定属性上，
// 当那个属性的值被读取时，你所绑定的函数就会被调用。

const proto = {
    // ctx.__proto__.__proto__ = proto
    // this是 ctx
    // get url(){
    //     return this.request.url
    // },
    // get path(){
    //     return this.request.path
    // }
}

function defineGetter(target,key){
    // 已经被废弃了 object.defineProperty
    proto.__defineGetter__(key,function () {
        return this[target][key]
    })
}

function defineSetter(target,key){ // defineProperty不能单独定义setter =>proxy
    // 已经被废弃了 object.defineProperty
    proto.__defineSetter__(key,function (value) {
        this[target][key] = value
    })
}
defineGetter('requset','url')
defineGetter('requset','path')
defineGetter('response','body')

defineSetter('response','body')

// defineGetter('requset','url')
module.exports = proto
