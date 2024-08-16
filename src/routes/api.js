const homeRouter = require('./home')
const authRouter = require('./auth')
const productManagerRouter = require('./product')
const cartRouter = require('./cart')
function route(app){
    app.use('/', homeRouter);
    app.use('/auth', authRouter)

    app.use('/products', productManagerRouter)
    app.use('/cart', cartRouter)
}

module.exports = route;