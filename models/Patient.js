const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PatientSchema = new Schema({
  // 住院时间
  date: {
    type: String,
    required: true
  },
  number: {

  },
  name: {
    type:String,
    required:true
  },
  origin:{
    type:String,
    required:true
  },
  gender: {
    type:String,
    required:true
  },
  ID_number:{
    type:String,
    required:true
  },
  phone: {
    type:String,
    required:true
  },
  age: {
    type:String,
    required:true
  },
  adress: {
    type:String,
    required:true
  },
  // 联系人姓名
  contact_name: {
    type:String,
  },
  contact_phone:String,
  contact_relation: String,
  condition:String,
  medical_history:String,
  doctor:{
    type:String,
    required:true
  },
  department:{
    type:String,
    required:true
  },
  is_del:{
    type:Number,
    default:0
  }
})
module.exports = Patients = mongoose.model('patients', PatientSchema)