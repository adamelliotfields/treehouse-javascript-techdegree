const express = require('express');

const courses = require('./routes/courses.js');
const users = require('./routes/users.js');

const router = express.Router();

router.use('/courses', courses);
router.use('/users', users);

module.exports = router;
