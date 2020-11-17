const user = require('../models/user');


const userController = {}

userController.auth = async(req, res) => {

    const { dni, password } = req.body;

    let currentUser = await user.findOne({ dni: dni });
    if(!currentUser)
        return res.status(404).send({
            message: 'User not found'
        });
    
    const isMatch = await currentUser.comparePassword(password);
    

    res.status(200).send(await user.find());
}

userController.create = async(req, res) => {
    const { password, dni, firstname,
            lastname, mail    } = req.body;

    let currentUser = await user.findOne({ dni: dni });
    if(currentUser)
        return res.status(409).send({
            message: 'User Already Exist'
        });
    
    currentUser = await user.create({
        dni: dni,
        password: password,
        firstname: firstname,
        lastname: lastname,
        mail: mail
    });

    currentUser = currentUser.toObject();
    delete currentUser.password;
    res.status(200).send(currentUser);
}

module.exports = userController;