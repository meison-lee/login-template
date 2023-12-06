require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors');
require('./DB/redisClient')
require('./DB/mongo')
const checkAuthenticated = require('./auth')

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json())

app.use('/', require('./routes/user'))
app.use(checkAuthenticated)
app.use('/note', require('./routes/notes'))


app.listen(4000)