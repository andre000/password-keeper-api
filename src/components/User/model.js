/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
const { genSalt, hash, compare } = require('bcrypt');
const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
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

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await genSalt();

  this.password = await hash(this.password, salt);
  return this.password;
});

userSchema.pre('updateOne', async function (next) {
  if (!this._update.password) return next();
  const salt = await genSalt();

  this._update.password = await hash(this._update.password, salt);
  return this._update.password;
});

userSchema.methods.validatePassword = async function (password) {
  const valid = await compare(password, this.password);
  return valid;
};

module.exports = model('User', userSchema, 'users');
