/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
require('../Password/model');
const { Schema, model } = require('mongoose');

const FolderSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#ccc',
    validate: {
      validator(v) {
        return /#(?:[0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})/.test(v);
      },
      message: props => `${props.value} is not a valid hexadecimal color!`,
    },
  },
  passwords: [{ type: Schema.Types.ObjectId, ref: 'Password' }],
});

module.exports = model('Folder', FolderSchema, 'folder');
