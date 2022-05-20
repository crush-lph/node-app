const mongoose = require('mongoose')

const Schema = mongoose.Schema

const IdentitySchema = new Schema({
 name:{
   required:true,
   type:String
 },
 is_del:{
   type:Number,
   default:0
 },create_time:{
   type:Number,
   default:Date.now
 },
 update_time:{
   type:Number,
 },
 auth_name:{
   type:String
 },
 isAuth:{
    type:Number,
    default:0
  }
})

module.exports = Identity = mongoose.model('identity', IdentitySchema)