const mongoose = require('mongoose')

const connectionWiithDb = () =>{
    mongoose.connect(process.env.DATABASE_STRING)
    .then(console.log('Db Connected'))
    .catch(error => {
        console.log('Db connection failed')
        console.log(error)
    })
}

module.exports = connectionWiithDb