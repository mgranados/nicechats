const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { v4 } = require('uuid');
const { generate } = require('shortid');
const bcrypt = require('bcrypt');

const chatSchema = new Schema(
  {
    uuid: { type: String, default: v4 },
    shortId: { type: String, default: generate },
    subject: { type: String },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    messages: [Schema.Types.Mixed],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Chat', chatSchema);
