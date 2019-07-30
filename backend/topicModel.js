const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { v4 } = require('uuid');
const { generate } = require('shortid');
const bcrypt = require('bcrypt');

const topicSchema = new Schema(
  {
    uuid: { type: String, default: v4 },
    shortId: { type: String, default: generate },
    subject: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    publiclyVisible: { type: Boolean, default: true },
    popularity: { type: Number, default: 0 },
  },
  { timestamps: true },
);

topicSchema.methods.listFormat = function listFormat() {
  return {
    subject: this.subject,
    shortId: this.shortId,
    createdAt: this.createdAt,
  };
};

module.exports = mongoose.model('Topic', topicSchema);
