/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
const { genSalt, hash, compare } = require('bcrypt');
const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

/* istanbul ignore next */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await genSalt();

  this.password = await hash(this.password, salt);
  return this.password;
});

/* istanbul ignore next */
userSchema.pre('updateOne', async function (next) {
  if (!this._update.password) return next();
  const salt = await genSalt();

  this._update.password = await hash(this._update.password, salt);
  return this._update.password;
});

/* istanbul ignore next */
userSchema.methods.validatePassword = async function (password) {
  try {
    const valid = await compare(password, this.password);
    return valid;
  } catch (err) {
    return false;
  }
};

module.exports = model('User', userSchema, 'users');
