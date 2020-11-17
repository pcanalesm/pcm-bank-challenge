const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    post_acount: { type: Schema.Types.ObjectId, ref: 'account' },
    get_acount: { type: Schema.Types.ObjectId, ref: 'account' },
    date: Date,
    amount: Number,
    remaining_amount: Number
});

module.exports = mongoose.model('transaction', transactionSchema);