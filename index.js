const router_memberapi = require('./memberapi.js')
const router_boardapi = require('./boardapi.js')
const authMiddleware = require('./authmiddleware')
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

// npm install --save body-parser
app.use(express.urlencoded({extended:true}))
app.use(express.json()) 
app.use('/members', require('./memberapi'))

// /boards로 요청이 들어오면, 먼저 ./authmiddleware를 거친 뒤, 성공하면
// ./boardapi로 들어가게 된다. (next()로 실행됨?)
app.use('/boards', require('./authmiddleware'))
app.use('/boards', require('./boardapi'))

app.listen(5500, () => {
    console.log('listening on 5500...')
})