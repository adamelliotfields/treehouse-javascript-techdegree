const auth = require('basic-auth');

const User = require('../models/user.js');

const authenticate = (request, response, next) => {
  const userAuth = auth(request);
  if (userAuth) {
    User.authenticate(userAuth.name, userAuth.pass, (err, user) => {
      if (err) {
        const error = new Error('Invalid email or password');
        // 401 === Unauthorized
        error.status = 401;
        return next(error);
      } else {
        request.session.userId = user._id;
      }
      return next();
    });
  } else {
    const error = new Error('You are not authorized to view this resource');
    error.status = 401;
    return next(error);
  }
};

module.exports = authenticate;
