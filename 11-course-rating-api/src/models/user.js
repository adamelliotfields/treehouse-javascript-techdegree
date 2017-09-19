const mongoose = require('mongoose');
const bluebird = require('bluebird');
const bcrypt = require('bcrypt');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.Promise = bluebird;

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  emailAddress: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
});

UserSchema.plugin(uniqueValidator);

UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ emailAddress: email })
    .exec((err, user) => {
      if (err) return callback(err);
      if (!user) {
        const error = new Error('User not found');
        // 401 === Unauthorized
        error.status = 401;
        return callback(error);
      }
      bcrypt.compare(password, user.password, (error, result) => {
        if (result) {
          return callback(null, user);
        } else {
          return callback(error);
        }
      });
    });
};

UserSchema.pre('save', function (next) {
  const user = this;
  const validEmail = validator.isEmail(user.emailAddress);
  if (!validEmail) {
    const error = new Error('Invalid email');
    error.status = 401;
    return next(error);
  }
  bcrypt.hash(user.password, 10, (error, hash) => {
    if (error) return next(error);
    user.password = hash;
    return next();
  });
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
