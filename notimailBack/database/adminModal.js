const mongoose = require("mongoose")


const Schema = mongoose.Schema


const adminSchema = new Schema({
    name: {
        type: String,
        require: true
    },

    userName: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true
    },

    password: {
        type: String,
        require: true
    },

    access_token: {
        type: String,
    },
    code: {
        type: String,
    },

  
})

module.exports = mongoose.model('admin', adminSchema)