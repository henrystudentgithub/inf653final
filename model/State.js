const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
Schema
*/
const state_schema = new Schema({

  state_code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },

  fun_facts: {
    type: [String],
  },
});

module.exports = mongoose.model('State', state_schema);
