const transactionModel = require('../models/transaction');
const accountModel = require('../models/account');
const moment = require('moment');



const transactionController = {};

transactionController.registerTansaction = async(req, res) => {

    const { transaction } = req.body;

    const newTransaction = await transactionModel.create({
        date: moment(),
        post_account: transaction.post_account.id,
        get_account: transaction.get_account.id,


    });

}


module.exports = transactionController;