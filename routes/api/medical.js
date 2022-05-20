// login of register

const express = require('express')
const router = express.Router();
const Medical = require('../../models/Medical')
const gravatar = require('gravatar')
// npm i bcrypt
// 加密工具
const bcrypt = require('bcrypt')
// 引入jwt
var jwt = require('jsonwebtoken');
// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

const keys = require('../../config/keys')
const passport = require('passport')
// @route 
// @desc 返回的请求的json数据
// @access public
router.get("/test", (req, res) => {
  res.json({ msg: 'medical works' })
})

// @route 
// @desc 创建信息接口
// @access private

router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  const {type,drugname,OTC,specification,form,expiry_date,
     vender,
   quantity,
      price,
productname,
se_quantity,
      brand,
   plantype,
     expiry,
genericname,
certificate,
      usage,
}  = req.body
  const medicalFilelds = {
    type,drugname,OTC,specification,form,expiry_date,
     vender,
   quantity,
      price,
productname,
se_quantity,
      brand,
   plantype,
     expiry,
genericname,
certificate,
      usage,
  }
  
  new Medical(medicalFilelds).save().then((medical) => {
    res.json({code:0,msg:'',data:medical});
  })
})

// @route 
// @desc 获取所有信息
// @access private

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Medical.find().then(medical => {
    if (!medical) {
      return res.status(200).json({msg:'没有任何内容',code:1,data:[]})
    }
    res.json({data:medical,code:0,msg:''})
  }).catch(err => console.log(err))
})



// @route 
// @desc 获取所有信息
// @access private

router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ _id: req.params.id }).then(profile => {
    if (!profile) {
      return res.status(404).json('没有任何内容')
    }
    res.json(profile)
  }).catch(err => console.log(err))
})



// @route 
// @desc 编辑
// @access private

router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const profileFilelds = {}
  if (req.body.type) profileFilelds.type = req.body.type
  if (req.body.describe) profileFilelds.describe = req.body.describe
  if (req.body.income) profileFilelds.income = req.body.income
  if (req.body.expend) profileFilelds.expend = req.body.expend
  if (req.body.cash) profileFilelds.cash = req.body.cash
  if (req.body.remark) profileFilelds.remark = req.body.remark

  profile.fineOneAndUpdate({ _id: req.params.id }, { $set: profileFilelds }, { new: true }).then(profile => res.json(profile))
})

// @route   delete
// @desc 删除信息接口
// @access private

router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  profile.findOneAndUpdate({ _id: req.params.id }).then(profile => {
    profile.save().then(profile => res.json(profile))
  }).catch(err => { res.status(404).json('删除失败') })
})



module.exports = router