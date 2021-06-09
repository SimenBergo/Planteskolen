const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

//user schema
const User = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['gardener', 'manager', 'anonymous'],
        default: 'anonymous'
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
        default: Date.now
    }
});

//hashing password before saving in database
User.pre('save',
    async function(next) {
        const hash = await bcrypt.hash(this.password, 10);

        this.password = hash;

        next();
    }
);

//comparing hashed password in database with users typed password
User.methods.isValidPassword = async function(password) {
    const user      = this;
    const compare   =  await bcrypt.compare(password, user.password);

    return compare;
};

const UserModel = mongoose.model('users', User);
module.exports = UserModel;