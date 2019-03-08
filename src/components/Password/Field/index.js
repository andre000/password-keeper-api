/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
const { Schema } = require('mongoose');
const { encrypt } = require('../../../utils/cypher');

const fieldSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

fieldSchema.pre('save', async function (next) {
  if (!this.isModified('value')) return next();
  this.value = encrypt(this.value);
  return this.value;
});

fieldSchema.pre('updateOne', async function (next) {
  if (!this._update.value) return next();
  this._update.value = encrypt(this._update.value);
  return this._update.value;
});

module.exports = fieldSchema;
