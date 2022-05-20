// login of register

const express = require('express')
// 实例化Router模块
const router = express.Router();
// 引入对应的文档对象
const User = require('../../models/User')
const Role = require('../../models/Role')
const gravatar = require('gravatar')
// npm i bcrypt
// 加密工具
const bcrypt = require('bcrypt')
// 引入jwt
var jwt = require('jsonwebtoken');
// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');



// 加密

const keys = require('../../config/keys')
const passport = require('passport')
// @route 
// @desc 返回的请求的json数据
// @access public
router.get("/test", (req, res) => {
  res.json({ msg: 'test works' })
})

// npm i body-parser
router.post("/register", (req, res) => {
  // res.json({ msg: 'login works' })
  // console.log(req.body);
  // 查询数据库中是否拥有这个邮箱
  User.findOne({ email: req.body.email, is_del: 0 }).then(async user => {
    if (user) {
      return res.status(200).json({ code: 1, msg: '邮箱已被占用' })
    } else {
      // 创建一个默认的头像
      // s size   d 
      const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' })
      const { name, email, password, identity, gender, department, degree, major, entry_time, phone, adress, role_id } = req.body

      const role = await Role.findOne({ _id: role_id })
      const role_name = role.name
      const newUser = new User({
        // name: req.body.name,
        // email: req.body.email,
        avatar,
        password: req.body.password,
        // identity: req.body.identity,
        gender,
        phone,
        entry_time,
        major,
        degree,
        role: role,
        department,
        identity,
        name, email, adress, role_id, role_name

      })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          console.log(err);
          if (err) throw err;
          // 将加密后的hash起来
          newUser.password = hash
          newUser.save().then(user => res.json({ code: 0, data: user })).catch(err => console.log(err))
        });
      });
    }
  })
})

router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body.email);
  console.log(req.body.password);

  User.findOne({ email, is_del: 0 }).then(user => {
    if (!user) {
      return res.status(200).json({ code: 1, data: [], msg: '用户不存在' })
    } else {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // 返回一个token
          // jwt.sign("规则","加密规则","过期时间",()=>{})

          const rule = {
            id: user.id, name: user.name, avatar: user.avatar, identity: user.identity
          }
          jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err
            // 向浏览器返回token
            res.json({
              success: true,
              token: "Bearer " + token
            })
          })

          // res.json({ msg: 'success' })
        } else {
          return res.status(400).json({ code: 1, data: [], msg: '密码错误！' })
        }
      });
    }
  })
})


// 当前用户想要请求的信息
router.get('/current', passport.authenticate('jwt', { session: false }), async (req, res) => {
  Role.findOne({ _id: req.user.role_id }).then(role => {
    // res.json( )
    req.user.role = role
    res.json(req.user)
  })
})

router.get('/detail', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log(req.params)
  User.findOne({ _id: req.params.id }).then(user => {
    if (!user) {
      return res.status(200).json({ res: 1, msg: '查询不到该用户信息', data: [] })
    }
    res.json({ code: 0, msg: '', data: user })
  }).catch(err => console.log(err))
})

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {

  User.find({ is_del: { $ne: 1 } }).sort({ _id: -1 }).then(async user => {
    if (!user) {
      return res.status(200).json({
        code: 1,
        msg: '暂无数据',
        data: []
      })
    }

    Role.find({ is_del: { $ne: 1 } }).then(role => {

      res.json({ code: 0, data: { user, role }, msg: '' })
    })
    // item.role = role
    // item.role_name = 'xxx'
    // newUser.push(item)
    // return item
    // console.log(newUser)
    // const roleItem = await Role.findOne({ _id: item.role_id })
  }).catch(err => console.log(err))
})

router.post('/update', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { _id, name, email, password, identity, gender, department, degree, major, entry_time, phone, adress, role_id } = req.body
  const role = await Role.findOne({ _id: role_id })
  User.findOneAndUpdate({ _id }, { $set: { name, email, password, identity, gender, department, degree, major, entry_time, phone, adress, role_id, 'role_name': role.name, role: role } }, { new: false }).then(role => {
    res.json({ code: 0, data: role, msg: '更新成功' })
  }).catch(err => {
    res.json({ code: 1, data: err, msg: '更新失败' })
  })
})

router.post('/delete', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log('id', req.body.id)
  User.findOneAndUpdate({ _id: req.body.id }, {
    $set: {
      is_del: 1
    }
  }, { new: false }).then(user => {
    res.json(user)
  }).catch(err => { res.status(200).json('删除失败') })
})

module.exports = router