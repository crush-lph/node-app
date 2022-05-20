// login of register

const express = require('express')
const router = express.Router();
const Patient = require('../../models/Patient')
const gravatar = require('gravatar')
// npm i bcrypt
// 加密工具
const bcrypt = require('bcrypt')
// 引入jwt
var jwt = require('jsonwebtoken');
// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

const keys = require('../../config/keys')
const passport = require('passport')

// 路由测试接口
router.get("/test", (req, res) => {
  res.json({ msg: 'patient works' })
})

// 添加患者信息
router.post('/add',passport.authenticate('jwt',{session:false}),(req,res)=>{
  // 获取参数,并完成创建
  const patientFilelds = {}
  console.log(req.body)
  req.body.date && (patientFilelds.date = req.body.date)
  req.body.name &&(patientFilelds.name = req.body.name)
  req.body.origin &&(patientFilelds.origin = req.body.origin)
  req.body.gender &&(patientFilelds.gender = req.body.gender)
  req.body.ID_number &&(patientFilelds.ID_number = req.body.ID_number)
  req.body.phone &&(patientFilelds.phone = req.body.phone)
  req.body.age &&(patientFilelds.age = req.body.age)
  req.body.adress &&(patientFilelds.adress = req.body.adress)
  req.body.contact_name &&(patientFilelds.contact_name = req.body.contact_name)
  req.body.contact_relation &&(patientFilelds.contact_relation = req.body.contact_relation)
  req.body.contact_phone &&(patientFilelds.contact_phone = req.body.contact_phone)
  req.body.condition &&(patientFilelds.condition = req.body.condition)
  req.body.medical_history &&(patientFilelds.medical_history = req.body.medical_history)
  req.body.doctor &&(patientFilelds.doctor = req.body.doctor)
  req.body.department &&(patientFilelds.department = req.body.department)


  new Patient(patientFilelds).save().then((patient)=>{
    res.status(200).json({
      code:0,
      data:patient,
      msg:''
    })
  })
})

// 获取所有患者信息
router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
  Patient.find({ is_del: { $ne: 1 } }).sort({_id:-1}).then(patient=>{
    if(!patient){
      return res.status(200).json({
        code:1,
        msg:'暂无数据',
        data:[]
      })
    }
    res.json({
        code:0,
        msg:'',
        data:patient
      })
  }).catch(err=>{
    console.log(err)
  })
})

// 删除信息
router.post('/delete',passport.authenticate('jwt',{session:false}),(req,res)=>{
  Patient.findOneAndUpdate({_id:req.body.id},{
    $set:{
      is_del:1
    }
  },{new:false})
  .then(patient=>{
    res.status(200).json({code:0,data:patient,msg:'删除成功'})
  })
  .catch(err=>{
    res.status(200).json({code:1,msg:'删除失败',data:[]})
  })
})

module.exports = router