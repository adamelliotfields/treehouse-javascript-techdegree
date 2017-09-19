const express = require('express');
const router = express.Router();
const co = require('co');

const Book = require('../models').Book;
const Loan = require('../models').Loan;
const Patron = require('../models').Patron;

/*!
 NOTE: Cannot use co in the router callback.
 */

// GET patrons
router.get('/', (request, response, next) => {
  co(function * () {
    try {
      const patrons = yield Patron.findAll({ order: 'last_name' });
      response.status(200);
      response.render('partials/patrons', {
        title: 'Patrons',
        patrons: patrons
      });
    } catch (error) {
      return next(error);
    }
  });
});

// GET new patron
router.get('/new', (request, response) => {
  response.status(200);
  response.render('partials/newpatron', { title: 'Create New Patron' });
});

// POST new patron
router.post('/new', (request, response, next) => {
  co(function * () {
    try {
      yield Patron.create(request.body);
      response.status(201);
      response.redirect('/patrons/');
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        response.render('partials/newpatron', {
          title: 'Create New Patron',
          patronFirstName: request.body.first_name,
          patronLastName: request.body.last_name,
          patronAddress: request.body.address,
          patronEmail: request.body.email,
          patronLibraryId: request.body.library_id,
          patronZipCode: request.body.zip_code,
          errors: error.errors.map((item) => item.message)
        });
      } else {
        return next(error);
      }
    }
  });
});

// GET patron details
router.get('/:id', (request, response, next) => {
  co(function * () {
    try {
      const patrons = yield Patron.findAll({
        include: [{ model: Loan, include: [{ model: Book }] }],
        where: { id: request.params.id }
      });
      response.status(200);
      response.render('partials/patrondetail', {
        title: 'Patron Details',
        patron: patrons[0],
        loans: patrons[0].Loans
      });
    } catch (error) {
      return next(error);
    }
  });
});

// PUT patron details
router.put('/:id', (request, response, next) => {
  co(function * () {
    try {
      const patron = yield Patron.findById(request.params.id);
      yield patron.update(request.body);
      response.status(201);
      response.redirect('/patrons/' + patron.id);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const patrons = yield Patron.findAll({
          include: [{ model: Loan, include: [{ model: Book }] }],
          where: { id: request.params.id }
        });
        response.render('partials/patrondetail', {
          title: 'Patron Details',
          patron: patrons[0],
          loans: patrons[0].Loans,
          errors: error.errors.map((item) => item.message)
        });
      } else {
        return next(error);
      }
    }
  });
});

module.exports = router;
