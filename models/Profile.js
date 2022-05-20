const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProfileSchema = new Schema({
  type: {
    type: String
  },
  describe: {
    type: String
  },
  income: {
    type: String
  },
  extend: {
    type: String
  },
  cash: {
    type: String
  },

  remark: {
    type: String
  },
  // identity: {
  //   type: String,
  //   required: true

  // },
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)