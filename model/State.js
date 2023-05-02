const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
Schema
*/
const state_schema = new Schema({

  statecode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },

  funfacts: {
    type: [String],
  },
});

module.exports = mongoose.model('State', state_schema);
