// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose');

// const UserSchema = new Schema({
//     fullname:{
//         type: String,
//         required: true,
//         unique: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     }
// });

// UserSchema.plugin(passportLocalMongoose);

// module.exports = mongoose.model('User', UserSchema);

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
