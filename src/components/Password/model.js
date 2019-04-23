/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
const { Schema, model } = require('mongoose');
const { encrypt } = require('../../utils/cypher');
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
  notes: {
    type: Object,
  },
});

passwordSchema.pre('findOneAndUpdate', async function (next) /* istanbul ignore next */ {
  if (!this._update.$set.fields) return next();
  this._update.$set.fields.map((f) => {
    // eslint-disable-next-line no-param-reassign
    f.value = encrypt(f.value);
    return f;
  });
  return this._update;
});

module.exports = model('Password', passwordSchema, 'password');
