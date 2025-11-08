const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  stage: { type: mongoose.Schema.Types.ObjectId, ref: 'Stage' }
});

module.exports = mongoose.model('Card', cardSchema);