const express = require('express');
const co = require('co');

const User = require('../../models/user.js');
const authenticate = require('../../middleware/authenticate.js');

const router = express.Router();

// GET /users
router.get('/', authenticate, (request, response, next) => {
  User.findById(request.session.userId)
    .exec((err, user) => {
      if (err) return next(err);
      if (user) {
        // 200 === OK
        response.status(200);
        return response.json(user);
      } else {
        const error = new Error('You are not authorized to access /users');
        // 401 === Unauthorized
        error.status = 401;
        return next(error);
      }
    });
});

// POST /users
router.post('/', co.wrap(function * (request, response, next) {
  try {
    yield User.create(request.body);
    response.setHeader('Location', '/');
    // 201 === Created
    response.status(201);
    return response.json({});
  } catch (error) {
    return next(error);
  }
}));

module.exports = router;
