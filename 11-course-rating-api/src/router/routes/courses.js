const express = require('express');
const co = require('co');

const Course = require('../../models/course.js');
const Review = require('../../models/review.js');
const authenticate = require('../../middleware/authenticate.js');

const router = express.Router();

// GET /courses
router.get('/', (request, response, next) => {
  Course.find({})
    .select('_id title')
    .exec((error, course) => {
      if (error) return next(error);
      // 200 === OK
      response.status(200);
      return response.json(course);
    });
});

// POST /courses
router.post('/', authenticate, co.wrap(function * (request, response, next) {
  try {
    yield Course.create(request.body);
    response.setHeader('Location', '/');
    // 201 === Created
    response.status(201);
    return response.json({});
  } catch (error) {
    // 400 === Bad Request
    error.status = 400;
    return next(error);
  }
}));

// GET /courses/:courseId
router.get('/:courseId', authenticate, (request, response, next) => {
  Course.findById(request.params.courseId)
    .populate('user', '_id fullName')
    .populate({
      path: 'reviews',
      populate: { path: 'user', select: 'fullName' }
    })
    .exec((err, course) => {
      if (err) return next(err);
      if (!course) {
        const error = new Error('Course not found');
        // 404 === Not Found
        error.status = 404;
        return next(error);
      } else {
        request.course = course;
        response.status(200);
        response.json(request.course);
      }
    });
});

// PUT /courses/:courseId
router.put('/:courseId', authenticate, (request, response, next) => {
  Course.findById(request.params.courseId)
    .exec((err, course) => {
      if (err) return next(err);
      if (course) {
        if (request.body.title) course.title = request.body.title;
        if (request.body.description) course.description = request.body.description;
        if (request.body.estimatedTime) course.estimatedTime = request.body.estimatedTime;
        if (request.body.materialsNeeded) course.materialsNeed = request.body.materialsNeeded;
        if (request.body.steps) course.steps = request.body.steps;
        course.save((error, course) => {
          if (error) return next(error);
          // 204 === No Content
          response.status(204);
          return response.json({});
        });
      } else {
        const error = new Error('Course not found');
        error.status = 404;
        return next(error);
      }
    });
});

// POST /courses/:courseId/reviews
router.post('/:courseId/reviews', authenticate, (request, response, next) => {
  Course.findById(request.params.courseId)
    .exec((findError, course) => {
      if (findError) return next(findError);
      if (course) {
        const review = new Review(request.body);
        review.user = request.session.userId;
        course.reviews.push(review);
        course.save((courseError, course) => {
          if (courseError) return next(courseError);
          review.save((reviewError, review) => {
            if (reviewError) return next(reviewError);
            response.setHeader('Location', `/api/courses/${request.params.courseId}`)
            response.status(201);
            return response.json({});
          });
        });
      } else {
        const error = new Error('Course not found');
        error.status = 404;
        return next(error);
      }
    });
});

module.exports = router;
