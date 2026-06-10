const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Subject name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  workload: {
    type: Number,
    required: [true, 'Workload is required'],
    min: [0, 'Workload cannot be negative']
  },
  difficultyLevel: {
    type: String,
    required: [true, 'Difficulty level is required'],
    enum: {
      values: ['Beginner', 'Intermediate', 'Advanced'],
      message: '{VALUE} is not a valid difficulty level'
    }
  },
  credits: {
    type: Number,
    required: [true, 'Credits are required'],
    min: [0, 'Credits cannot be negative']
  },
  weeklyHours: {
    type: Number,
    required: [true, 'Weekly hours are required'],
    min: [0, 'Weekly hours cannot be negative']
  }
}, {
  collection: 'subject',
  timestamps: true
});

module.exports = mongoose.model('subject', subjectSchema);
