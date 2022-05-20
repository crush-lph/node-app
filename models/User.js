const mongoose = require('mongoose')

const Schema = mongoose.Schema


const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  adress: {
    type: String,
    required: true
  },
  degree:{
    type:String,
    required:true
  },
  department:{
    type:String,required:true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    default:'123456789'
  },
  avatar: {
    type: String
  },
  entry_time: {
    type: String,
    default: Date.now
  },
  identity: {
    type: String,
    required: true
  },
  gender:{
    type:String,
    required:true
  },
  phone:{
    type:String,
    required:true
  },
  major:{
    type:String,
    required:true
  },
  is_del: {
    type: Number,
    default: 0
  },
  role:{
    type:Array,
     required:true
  },
  role_id:{
    type:String,
    required:true
  },
  role_name:{
    type:String,
    required:true
  },
})





module.exports = User = mongoose.model('users', UserSchema)