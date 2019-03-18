/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
const { Schema, model } = require('mongoose');
const Field = require('./Field');

const passwordSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  fields: {
    type: [Field],
    required: true,
  },
});

module.exports = model('Password', passwordSchema, 'password');
