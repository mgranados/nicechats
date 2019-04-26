const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { v4 } = require('uuid');
const { generate } = require('shortId');
const bcrypt = require('bcrypt');

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
  },
  { timestamps: true },
);

userSchema.pre('save', function(next) {
  if (!this.password || !this.isModified('password')) {
    return next();
  }

  try {
    const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
    this.password = bcrypt.hashSync(this.password, salt);
  } catch (err) {
    return next(err);
  }
  return next();
});

module.exports = mongoose.model('User', userSchema);
