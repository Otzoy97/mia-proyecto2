const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// rutas
app.use('/api',require('./routes/index'))

app.listen(3000, ()=> console.log("Servidor listo"))