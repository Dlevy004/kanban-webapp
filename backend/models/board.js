const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }]
});

module.exports = mongoose.model('Board', boardSchema);