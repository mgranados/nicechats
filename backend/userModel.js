const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { v4 } = require('uuid');
const { generate } = require('shortid');
const bcrypt = require('bcrypt');
const assert = require('http-assert');

const SALT_WORK_FACTOR = parseInt(process.env.SALT_WORK_FACTOR);

const userSchema = new Schema(
  {
    fullName: { type: String },
    email: { type: String },
    password: { type: String },
    uuid: { type: String, default: v4 },
    shortId: { type: String, default: generate },
    userName: { type: String },
    country: { type: String },
    description: { type: String },
    newPasswordRequired: { type: Boolean, default: false },
    balance: { type: Number, default: 0 },
    chats: [{ type: Schema.Types.ObjectId, ref: 'Chat' }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  },
  { timestamps: true },
);

userSchema.pre('save', function(next) {
  if (!this.password || !this.isModified('password')) {
    return next();
  }

  if (this.email) {
    this.email = this.email.toLowerCase();
  }

  try {
    const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
    this.password = bcrypt.hashSync(this.password, salt);
  } catch (err) {
    return next(err);
  }
  return next();
});

userSchema.statics.auth = async function(email, password) {
  assert(email, 403, 'Email not provided');
  assert(password, 403, 'password not provided');
  const authEmail = email.toLowerCase();

  const user = await this.findOne({ email: authEmail });
  assert(user, 404, 'User not found');

  const isValid = await bcrypt.compare(password, user.password);
  assert(isValid, 401, 'Invalid email/password');

  return user;
};

userSchema.methods.public = function public() {
  return {
    email: this.email,
    userName: this.userName,
    uuid: this.uuid,
    balance: this.balance,
    createdAt: this.createdAt,
    newPasswordRequired: this.newPasswordRequired,
  };
};

userSchema.methods.participantFormat = function participantFormat() {
  return {
    userName: this.userName,
  };
};

module.exports = mongoose.model('User', userSchema);
