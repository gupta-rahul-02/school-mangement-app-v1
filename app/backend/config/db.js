const mongoose = require('mongoose')

const connectionWiithDb = () =>{
    mongoose.connect("mongodb+srv://webbybutterrahul:IndiaRahul11@school-management.4kdljeu.mongodb.net/?retryWrites=true&w=majority",)
    .then(console.log('Db Connected'))
    .catch(error => {
        console.log('Db connection failed')
        console.log(error)
    })
}

module.exports = connectionWiithDb