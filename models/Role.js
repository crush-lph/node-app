const mongoose = require('mongoose')

const Schema = mongoose.Schema






const RoleSchema = new Schema({
  name:{type:String,required:true},
  auth_time:Number,//授权时间
  auth_name:String,//授权人
  // 创建时间
  create_time:{
    type:Number,
    default:Date.now
  },
  menus:{
    type:Array,required:true
  },
  is_del:{
    type:Number,
    default:0
  },
  isAuth:{
    type:Number,
    default:0
  }
})





module.exports = User = mongoose.model('roles', RoleSchema)