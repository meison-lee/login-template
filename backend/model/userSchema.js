const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  occupation: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    sparse: true
  },
  image:{
    type: String
  },
  deleteAt:{
    type: Date
  },
  auth: {
    method: {
      type: String,
      required: true
    },  // "local", "facebook", "google", etc.
    password: {
      type: String
    },
    facebook_id: {
      type: String,
      unique: true,
      sparse: true
    },
    google_id: {
      type: String,
      unique: true,
      sparse: true
    },
    token: {
      type: String
    }
  }
});

userSchema.index({ email: 1, deleteAt: 1 }, { unique: true, sparse: true });

userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.auth.password;
  // delete other sensitive fields
  return user;
};

module.exports = mongoose.model('User', userSchema);