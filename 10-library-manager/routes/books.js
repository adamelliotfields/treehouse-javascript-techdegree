const express = require('express');
const router = express.Router();
const co = require('co');

const Book = require('../models').Book;
const Loan = require('../models').Loan;
const Patron = require('../models').Patron;

/*!
 NOTE: Cannot use co in the router callback.
 */

// GET books
router.get('/', (request, response, next) => {
  co(function * () {
    try {
      const books = yield Book.findAll({
        order: 'title'
      });
      response.status(200);
      response.render('partials/books', {
        title: 'Books',
        books: books
      });
    } catch (error) {
      return next(error);
    }
  });
});

// GET overdue books
router.get('/overdue', (request, response, next) => {
  co(function * () {
    try {
      const loans = yield Loan.findAll({
        include: [{ model: Book }],
        where: { return_by: { $lt: new Date() }, returned_on: null },
        order: 'title'
      });
      response.status(200);
      response.render('partials/overduebooks', {
        title: 'Overdue Books',
        loans: loans
      });
    } catch (error) {
      return next(error);
    }
  });
});

// GET checked-out books
router.get('/checked_out', (request, response, next) => {
  co(function * () {
    try {
      const loans = yield Loan.findAll({
        include: [{ model: Book }],
        where: { returned_on: null },
        order: 'title'
      });
      response.status(200);
      response.render('partials/checkedoutbooks', {
        title: 'Checked-Out Books',
        loans: loans
      });
    } catch (error) {
      return next(error);
    }
  });
});

// GET new book
router.get('/new', (request, response) => {
  response.status(200);
  response.render('partials/newbook', { title: 'Create New Book' });
});

// POST new book
router.post('/new', (request, response, next) => {
  co(function * () {
    try {
      yield Book.create(request.body);
      response.status(201);
      response.redirect('/books/');
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        response.render('partials/newbook', {
          title: 'Create New Book',
          bookTitle: request.body.title,
          bookAuthor: request.body.author,
          bookGenre: request.body.genre,
          bookPublished: request.body.first_published,
          errors: error.errors.map((item) => item.message)
        });
      } else {
        return next(error);
      }
    }
  });
});

// GET book details
router.get('/:id', (request, response, next) => {
  co(function * () {
    try {
      const books = yield Book.findAll({
        include: [{ model: Loan, include: [{ model: Patron }] }],
        where: { id: request.params.id }
      });
      response.status(200);
      response.render('partials/bookdetail', {
        title: 'Book Details',
        book: books[0],
        loans: books[0].Loans
      });
    } catch (error) {
      return next(error);
    }
  });
});

// PUT book details
router.put('/:id', (request, response, next) => {
  co(function * () {
    try {
      const book = yield Book.findById(request.params.id);
      yield book.update(request.body);
      response.status(201);
      response.redirect('/books/' + book.id);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const books = yield Book.findAll({
          include: [{ model: Loan, include: [{ model: Patron }] }],
          where: { id: request.params.id } });
        response.render('partials/bookdetail', {
          title: 'Book Details',
          book: books[0],
          loans: books[0].Loans,
          errors: error.errors.map((item) => item.message)
        });
      } else {
        return next(error);
      }
    }
  });
});

module.exports = router;
