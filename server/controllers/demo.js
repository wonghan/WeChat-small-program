module.exports = async (ctx) => {
    console.log(ctx.request.body)
    ctx.state.data = {
        msg: 'hello 小程序后台'
    }
}
