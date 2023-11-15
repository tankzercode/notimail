const mongoose = require("mongoose")


const Schema = mongoose.Schema


const userSchema = new Schema({
    firm_name: {
        type: String,
        require: true
    },

    first_name: {
        type: String,
        require: true
    },

    last_name: {
        type: String,
        require: true
    },

    email: {
        type: String,

    },
    phone_number: {
        type: String
    },

    last_received_mail: {
        type: Date
    },
    last_picked_up: {
        type: Date
    },
    has_mail: {
        type: Boolean
    },

    is_admin: {
        type: Boolean

    },
    access_token: {
        type: String,
    },
    code: {
        type: String,
    },

})

module.exports = mongoose.model('user', userSchema)