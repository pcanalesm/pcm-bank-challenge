const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { SALT_FACTOR } = require('../config/config');
const bcryptjs = require('bcryptjs');
const Schema = mongoose.Schema;


//Model Definition
const userSchema = new Schema({
    dni: String,
    name: String,
    mail: String,
    password: String
});

// Pre Save metodo para encriptación de password
userSchema.pre('save', async function(next) {
    try
    {   
        var user = this;
        if(!user.isModified('password')) return next();

        const salt = await bcrypt.genSalt(SALT_FACTOR);
        user.password = await bcrypt.hash(user.password, salt);

        next();

    }catch(error) {
        next(error);
    }
})

//Metodo para comparar password
userSchema.methods.comparePassword = async function(password) {
    const match = await bcrypt.compare(password, this.password);
    return match;
}

module.exports = mongoose.model('user', userSchema);