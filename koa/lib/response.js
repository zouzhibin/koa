const response = {
    _body:'', // 这是一个规则 如果一个对象上有get set的话 需要进行声明
    get body(){
        return this._body
    },
    set body(val){
        this._body = val
    }
}
module.exports = response
