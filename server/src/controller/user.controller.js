const userModel = require('../models/user');
const accountModel = require('../models/account');
const jwt = require('jsonwebtoken');
const { SESSION_EXPIRE, JWT_SECRET } = require('../config/config');



const userController = {}

userController.auth = async (req, res) => {

    try {
        const { dni, password } = req.body;

        let currentUser = await userModel.findOne({ dni: dni });
        if (!currentUser)
            return res.status(404).send({
                message: 'User not found'
            });

        const isMatch = await currentUser.comparePassword(password);
        if (!isMatch)
            return res.status(401).send({
                message: 'Credentials error'
            });

        currentUser = currentUser.toObject();
        delete currentUser.password;

        const jwt_token = jwt.sign(currentUser, JWT_SECRET, {
            expiresIn: SESSION_EXPIRE
        });

        currentUser.token = jwt_token;

        res.status(200).send(currentUser);

    } catch (error) {
        res.status(400).send({
            message: error.toString()
        });

    }
}
userController.getSessionUser = async(req, res) => {
    try
    {
        let token = req.headers['access_token'] || req.headers['authorization'];
        if(token) {
            if (token.startsWith('Bearer ')) {
      
                token = token.slice(7, token.length);
            }
            jwt.verify(token, JWT_SECRET , (err, decoded) => {
                if (err) {
                    return res.status(200).send(null);
                } else {
                  req.decoded = decoded;
                }
            });
        }
        else {
            return res.status(200).send(null);
        }
       
        res.status(200).send(req.decoded);
    }
    catch (error) {
        res.status(400).send({
            message: error.toString()
        });

    }
}


userController.getUserByDni = async (req, res) => {

    try {
        const dni = req.params.dni;

        let currentUser = await userModel.findOne({ dni: dni });

        if (currentUser) {
            currentUser = currentUser.toObject();
            delete currentUser.password;
        }

        res.status(200).send(currentUser);

    } catch (error) {
        res.status(400).send({
            message: error.toString()
        });

    }
}

userController.create = async (req, res) => {


    try {

        const { password, dni, firstname,
            lastname, mail } = req.body;

        let currentUser = await userModel.findOne({ dni: dni });
        if (currentUser)
            return res.status(409).send({
                message: 'User Already Exist'
            });

        let newUser = await userModel.create({
            dni: dni,
            password: password,
            firstname: firstname,
            lastname: lastname,
            mail: mail
        });

        let newAccount = await accountModel.create({
            amount: 0,
            user: newUser._id
        });

        newUser = newUser.toObject();
        delete newUser.password;
        res.status(200).send(newUser);

    } catch (error) {
        res.status(400).send({
            message: error.toString()
        });

    }
}

module.exports = userController;