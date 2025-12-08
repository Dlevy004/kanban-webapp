const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: [true, 'Task title is required'],
    trim: true 
  },
  description: {
    type: String,
    trim: true
  },
  column: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Column',
    required: true 
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: true
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  dueDate: {
    type: Date
  },
  order: {
    type: Number,
    required: true
  },

  isCompleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);