const mongoose = require('mongoose')

async function connect(){
    try {
        await mongoose.connect('mongodb+srv://sevycanh:Jpqw1AouolUc7Tdg@cluster0.xqkd3.mongodb.net/banh_tam_db');
        console.log('Connect mongo successfully')
    } catch (error) {
        console.log('Connect mongo failure')
    }
}

module.exports = { connect };