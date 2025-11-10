const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Board title is required'],
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  columns: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Column' 
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Board', boardSchema);