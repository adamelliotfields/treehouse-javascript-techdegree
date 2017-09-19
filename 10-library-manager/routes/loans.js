const express = require('express');
const router = express.Router();
const co = require('co');
const moment = require('moment');

const Book = require('../models').Book;
const Loan = require('../models').Loan;
const Patron = require('../models').Patron;

/*!
 NOTE: Cannot use co in the router callback.
 */

// GET loans
router.get('/', (request, response, next) => {
  co(function * () {
    try {
      const loans = yield Loan.findAll({
        include: [{ all: true }],
        order: 'Book.title'
      });
      response.status(200);
      response.render('partials/loans', {
        title: 'Loans',
        loans: loans
      });
    } catch (error) {
      return next(error);
    }
  });
});

// GET overdue loans
router.get('/overdue', (request, response, next) => {
  co(function * () {
    try {
      const loans = yield Loan.findAll({
        include: [{ all: true }],
        where: { return_by: { $lt: moment().format('YYYY-MM-DD') }, returned_on: null }
      });
      response.status(200);
      response.render('partials/overdueloans', {
        title: 'Overdue Loans',
        loans: loans
      });
    } catch (error) {
      return next(error);
    }
  });
});

// GET checked-out loans
router.get('/checked_out', (request, response, next) => {
  co(function * () {
    try {
      const loans = yield Loan.findAll({
        include: [{ all: true }],
        where: { returned_on: null }
      });
      response.status(200);
      response.render('partials/checkedoutloans', {
        title: 'Checked-Out Loans',
        loans: loans
      });
    } catch (error) {
      return next(error);
    }
  });
});

// GET return book
router.get('/return/:id', (request, response, next) => {
  co(function * () {
    try {
      const loan = yield Loan.findById((request.params.id), {
        include: [{ all: true }]
      });
      loan.returned_on = moment().format('YYYY-MM-DD');
      response.status(200);
      response.render('partials/returnbook', {
        title: 'Return Book',
        loan: loan
      });
    } catch (error) {
      return next(error);
    }
  });
});

// PUT return book
router.put('/return/:id', (request, response, next) => {
  co(function * () {
    try {
      const loan = yield Loan.findById(request.params.id);
      yield loan.update(request.body);
      response.status(201);
      response.redirect('/loans/');
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const loan = yield Loan.findById((request.params.id), {
          include: [{ all: true }]
        });
        loan.returned_on = moment().format('YYYY-MM-DD');
        response.render('partials/returnbook', {
          title: 'Return Book',
          loan: loan,
          errors: error.errors.map((item) => item.message)
        });
      } else {
        return next(error);
      }
    }
  });
});

// GET new loan
router.get('/new', (request, response, next) => {
  co(function * () {
    try {
      const book = yield Book.findAll({
        attributes: ['id', 'title'],
        order: 'title'
      });
      const patron = yield Patron.findAll({
        attributes: ['id', 'first_name', 'last_name'],
        order: 'last_name'
      });
      response.status(200);
      response.render('partials/newloan', {
        title: 'Create New Loan',
        books: book,
        patrons: patron,
        loaned_on: moment().format('YYYY-MM-DD'),
        return_by: moment().add(7, 'days').format('YYYY-MM-DD')
      });
    } catch (error) {
      return next(error);
    }
  });
});

// POST new loan
router.post('/new', (request, response, next) => {
  co(function * () {
    try {
      yield Loan.create(request.body);
      response.status(201);
      response.redirect('/loans/');
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const book = yield Book.findAll({
          attributes: ['id', 'title'],
          order: 'title'
        });
        const patron = yield Patron.findAll({
          attributes: ['id', 'first_name', 'last_name'],
          order: 'last_name'
        });
        response.render('partials/newloan', {
          title: 'Create New Loan',
          books: book,
          patrons: patron,
          loaned_on: moment().format('YYYY-MM-DD'),
          return_by: moment().add(7, 'days').format('YYYY-MM-DD'),
          errors: error.errors.map((item) => item.message)
        });
      } else {
        return next(error);
      }
    }
  });
});

module.exports = router;
