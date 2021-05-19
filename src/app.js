require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const UserRouter = require('./UserRoutes/UserRoutes')
const itemsRouter = require('./itemsRoutes/itemsRoutes')
const cartRouter = require('./cartRoutes/cartRoutes')
const authRouter = require('./auth/auth-router')

const app = express()

const morganOption = (process.env.NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.use('/inventory', itemsRouter)
app.use('/cart', cartRouter)
app.use('/api/auth', authRouter)
app.use('/users', UserRouter)


app.get('/', (req, res) => {

    res.send('Hello, boilerplate cool!')

})

module.exports = app