const accountModel = require('../models/account');
const userModel = require('../models/user');
const transactionModel = require('../models/transaction');
const TransactionType = require('../models/transaction-type');
const moment = require('moment');



const accountController = {};

accountController.addAmount = async (req, res) => {

    try {

        const user = req.decoded;
        const { amount } = req.body;

        let currentAccount = await accountModel.findOne({
            user: user._id
        });

        const newTransaction = await transactionModel.create({
            date: moment().format(),
            type: TransactionType.DEPOSIT,
            amount: amount,
            remaining_amount: Number(currentAccount.amount) + Number(amount)
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
    } catch (error) {
        res.status(400).send({
            message: error.toString()
        });

    }
}


accountController.removeAmount = async (req, res) => {
    try {

        const user = req.decoded;
        const { amount } = req.body;


        let currentAccount = await accountModel.findOne({
            user: user._id
        });

        const newTransaction = await transactionModel.create({
            date: moment().format(),
            type: TransactionType.ORDER,
            amount: amount,
            remaining_amount: Number(currentAccount.amount) - Number(amount)
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

    } catch (error) {
        res.status(400).send({
            message: error.toString()
        });

    }
}

accountController.getStatusAccount = async (req, res) => {

    let account = await accountModel.findOne({
        user: req.decoded._id
    }).populate({ path: 'transactions', populate: [{ path: 'destiny_user'  }, { path: 'origin_user' }]
    , options: { sort: { 'date': -1 } } }).populate('user');

    account = account.toObject();
    delete account.user.password;
    res.status(200).send(account);

}


accountController.validateDestinyAccount = async (req, res) => {
    try {

        const dni = req.params.dni;

        const user = await userModel.findOne({
            dni: dni
        });

        if (!user) {
            return res.status(200).send(false);
        }

        let account = await accountModel.findOne({
            user: user._id
        });

        if (!account) {
            account = await accountModel.create({
                amount: 0,
                user: user._id
            });
        }

        res.status(200).send(true);
    } catch (error) {
        res.status(400).send({
            message: error.toString()
        });

    }
}


accountController.transfer = async (req, res) => {
    try {



        const user = req.decoded;
        const { amount, destiny_dni } = req.body;


        let currentAccount = await accountModel.findOne({ user: user._id });

        let destinyUser = await userModel.findOne({ dni: destiny_dni });

        if (!destinyUser) {
            return res.status(404).send({
                message: 'User Destiny Not Found'
            });
        }

        let destiny_account = await accountModel.findOne({
            user: destinyUser._id
        });

        const newTransaction = await transactionModel.create({
            date: moment().format(),
            type: TransactionType.TRANSFER,
            amount: amount,
            remaining_amount: (currentAccount.amount - amount),
            destiny_user: destinyUser._id
        });


        const newTransactionDeposit = await transactionModel.create({
            date: moment().format(),
            type: TransactionType.TRANSFER_DESPOSIT,
            amount: amount,
            remaining_amount: (destiny_account.amount + amount),
            origin_user: user._id
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

        let destinyAccount = await accountModel.findByIdAndUpdate(destiny_account._id,
            {
                $inc:
                {
                    amount: amount
                },
                $push:
                {
                    transactions: newTransactionDeposit
                }
            },
            {
                new: true
            });



        res.status(200).send(newAccount);

    } catch (error) {
        res.status(400).send({
            message: error.toString()
        });

    }
}

module.exports = accountController;