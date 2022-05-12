const express = require('express')
const path = require('path')
const router = require('./router/index')
const init = require('./db/init')
const bodyParser = require('body-parser');

let reset = false
init(reset)

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/api', router)


console.log("server is on, listening port 3000")
app.listen(3000)