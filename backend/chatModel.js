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
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    publiclyVisible: { type: Boolean, default: false },
  },
  { timestamps: true },
);

chatSchema.methods.listFormat = function listFormat() {
  return {
    subject: this.subject,
    shortId: this.shortId,
    createdAt: this.createdAt,
  };
};

chatSchema.methods.messageFormat = function messageFormat() {
  return {
    subject: this.subject,
    shortId: this.shortId,
  };
};

module.exports = mongoose.model('Chat', chatSchema);
