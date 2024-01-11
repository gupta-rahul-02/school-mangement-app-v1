const express = require('express');
const connectionWiithDb = require('./config/db');
const cookieParser = require('cookie-parser')
require('dotenv').config()
const app = express();

app.use(express.json())
app.use(cookieParser())

var cors = require('cors')

app.use(cors(
    {
        origin: 'http://localhost:4200',
        credentials: true,
        allowedHeaders: 'Content-Type, Authorization',
      }
))

//testing route
app.get('/test', (req,res) =>{
    console.log('tested')
})

const user = require('./routes/user.routes')
// const attendance = require('./routes/attendance.route')
const attendance = require('./routes/attendance.routes')
app.use('/api/v1/user',user)
app.use('/api/v1/attendance',attendance)

app.listen(3000,() =>{
    connectionWiithDb()
    console.log('port running at 3000')
})
module.exports = app