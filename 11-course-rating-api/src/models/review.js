const mongoose = require('mongoose');
const bluebird = require('bluebird');

const Course = require('./course.js');

const Schema = mongoose.Schema;

mongoose.Promise = bluebird;

const ReviewSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  postedOn: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  review: {
    type: String
  }
});

ReviewSchema.pre('save', function (next) {
  const review = this;
  Course.findOne({ reviews: review._id })
    .select('user reviews')
    .exec(function (err, course) {
      if (err) return next(err);
      if (course) {
        if (review.user.toString() === course.user.toString()) {
          const error = new Error('You cannot review your own course!');
          error.status = 403;
          return next(error);
        } else {
          return next();
        }
      } else {
        return next();
      }
    });
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
