const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Column title is required'],
    trim: true 
  },
  board: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Board',
    required: true 
  },
  tasks: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Task' 
  }],
  order: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Column', columnSchema);