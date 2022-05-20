const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MedicalSchema = new Schema({
  // 住院时间
  type: String,
  drugname: String,
  OTC: String,
  specification:String,
  form: String,
  expiry_date: String,
  vender: String,
  quantity: Number,
  price: Number,
  productname: String,
  use_quantity: String,
  brand: String,
  plantype: String,
  expiry: String,
  genericname: String,
  certificate: String,
  usage: String
})
module.exports = Medical = mongoose.model('medical', MedicalSchema)