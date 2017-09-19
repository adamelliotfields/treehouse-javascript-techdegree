const express = require('express');
const router = express.Router();

// GET home
router.get('/', (request, response) => {
  response.render('partials/index', { title: 'Library Manager' });
});

module.exports = router;
