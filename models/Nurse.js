const mongoose = require('mongoose')

const Schema = mongoose.Schema

const NurseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  degree: {
    type: String
  },
  major: {
    type: String,
  },
  profession: {
    type: String,
    required: true
  },
  office: {
    type: String
  },
  officeId: {
    type: String
  },
  isexport: {
    type: String
  }
})

module.exports = Nurse = mongoose.model('nurses', NurseSchema)