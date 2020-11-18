const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    destiny_user: { type: Schema.Types.ObjectId, ref: 'user' },
    date: Date,
    amount: Number,
    remaining_amount: Number,
    type: String
});

module.exports = mongoose.model('transaction', transactionSchema);