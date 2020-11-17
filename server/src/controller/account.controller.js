const accountModel = require('../models/account');
const userModel = require('../models/user');



const accountController = {};

accountController.addAmount = async(req, res) => {

    const user = req.session.user;
    const { amount } = req.body;

    let newAccount = await accountModel.findOneAndUpdate({
        user: user._id
    }, { $inc: {
        amount: amount
    }}, {
        new: true
    });

    res.status(200).send(newAccount);
}


accountController.removeAmount = async(req, res) => {

    const user = req.session.user;
    const { amount } = req.body;

    let newAccount = await accountModel.findOneAndUpdate({
        user: user._id
    }, { $inc: {
        amount: -amount
    }}, {
        new: true
    });

    res.status(200).send(newAccount);
}

module.exports = accountController;