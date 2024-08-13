const homeRouter = require('./home')
const authRouter = require('./auth')
const productManagerRouter = require('./product')
function route(app){
    app.use('/', homeRouter);
    app.use('/auth', authRouter)

    app.use('/products', productManagerRouter)
}

module.exports = route;