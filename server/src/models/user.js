const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;


//Definicion del Modelo
const userSchema = new Schema({
    dni: String,
    firstname: String,
    lastname: String,
    mail: String,
    password: String
});

// Pre Save metodo para encriptación de password
userSchema.pre('save',  function(next) {
    try
    {   
        var user = this;
        if(!user.isModified('password')) return next();
        
        const salt =  bcrypt.genSaltSync(10);
        user.password =  bcrypt.hashSync(user.password, salt);

        next();

    }catch(error) {
        next(error);
    }
})

//Metodo para comparar password
userSchema.methods.comparePassword =  function(password) {
    const match =  bcrypt.compareSync(password, this.password);
    return match;
}

module.exports = mongoose.model('user', userSchema);