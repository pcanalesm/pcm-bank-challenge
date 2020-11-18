const accountModel = require('../models/account');
const userModel = require('../models/user');
const transactionModel = require('../models/transaction');
const TransactionType = require('../models/transaction-type');
const moment = require('moment');



const accountController = {};

accountController.addAmount = async(req, res) => {

    const user = req.decoded;
    const { amount } = req.body;


    let currentAccount = await  accountModel.find({
        user: user._id
    });

    const newTransaction = await transactionModel.create({
        date: moment().format(),
        type: TransactionType.DEPOSIT,
        amount: amount,
        remaining_amount: newAccount.amount 
    });


    let newAccount = await accountModel.findByIdAndUpdate(currentAccount._id, 
        { 
            $inc: 
            {
                 amount: amount
            },
            $push: 
            {
                transactions: newTransaction
            }
        }, 
        {
            new: true
        });



    res.status(200).send(newAccount);
}


accountController.removeAmount = async(req, res) => {

    const user = req.decoded;
    const { amount } = req.body;


    let currentAccount = await  accountModel.find({
        user: user._id
    });

    const newTransaction = await transactionModel.create({
        date: moment().format(),
        type: TransactionType.ORDER,
        amount: amount,
        remaining_amount: newAccount.amount 
    });


    let newAccount = await accountModel.findByIdAndUpdate(currentAccount._id, 
        { 
            $inc: 
            {
                 amount: -amount
            },
            $push: 
            {
                transactions: newTransaction
            }
        }, 
        {
            new: true
        });



    res.status(200).send(newAccount);
}

module.exports = accountController;