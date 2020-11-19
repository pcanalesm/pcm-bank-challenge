const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    destiny_user: { type: Schema.Types.ObjectId, ref: 'user' },
    origin_user: { type: Schema.Types.ObjectId, ref: 'user' },
    date: { type : Date, get: getDate },
    amount: Number,
    remaining_amount: Number,
    type: String
}, {
    toObject: {getters: true, setters: true},
    toJSON: {getters: true, setters: true},
    runSettersOnQuery: true
});

function getDate(date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
}

module.exports = mongoose.model('transaction', transactionSchema);