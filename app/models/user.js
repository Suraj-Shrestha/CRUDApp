var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

//user schema
var userSchema = mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['Client','Manager','Admin'],
        default: 'Client'
    }
});

//Hashed values for passwords
userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};
userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User',userSchema);