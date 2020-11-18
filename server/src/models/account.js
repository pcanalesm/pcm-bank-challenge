const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const accountSchema = new Schema({
    number: Number,
    amount: Number,
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    transactions: [{ type: Schema.Types.ObjectId, ref: 'transaction' }]
});


module.exports = mongoose.model('account', accountSchema);