const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { v4 } = require('uuid');
const { generate } = require('shortid');

const messageSchema = new Schema(
  {
    uuid: { type: String, default: v4 },
    shortId: { type: String, default: generate },
    actualMessage: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    chat: { type: Schema.Types.ObjectId, ref: 'Chat' },
    deletedAt: { type: Date },
  },
  { timestamps: true },
);

messageSchema.methods.chatFormat = function chatFormat() {
  return {
    shortId: this.shortId,
    actualMessage: this.actualMessage,
    createdAt: this.createdAt,
    author: this.author.participantFormat(),
  };
};

module.exports = mongoose.model('Message', messageSchema);
