const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserData=new mongoose.Schema({
        name: {
            type: String
        },
        amount: {
            type: Number,
            required: true
        }
    },
);


module.exports = mongoose.model('User', UserData);
