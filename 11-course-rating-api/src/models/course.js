const mongoose = require('mongoose');
const bluebird = require('bluebird');

const Schema = mongoose.Schema;

mongoose.Promise = bluebird;

const CourseSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  estimatedTime: {
    type: String,
    trim: true
  },
  materialsNeeded: {
    type: String,
    trim: true
  },
  steps: {
    type: [{
      stepNumber: Number,
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      }
    }]
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }]
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
