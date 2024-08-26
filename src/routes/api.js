const homeRouter = require('./home')
const authRouter = require('./auth')
const productManagerRouter = require('./product')
const cartRouter = require('./cart')
const accountRouter = require('./account')
const orderRouter = require('./order')
function route(app){

    app.use('/', homeRouter);
    app.use('/auth', authRouter)

    app.use('/products', productManagerRouter)
    app.use('/cart', cartRouter)
    app.use('/accounts', accountRouter)
    app.use('/order', orderRouter)
}

module.exports = route;