// login of register

const express = require('express')
const router = express.Router();
const Role = require('../../models/Role')



const passport = require('passport')

// @route 
// @desc 返回的请求的json数据
// @access public
router.get("/test", (req, res) => {
  res.json({ msg: 'role api works' })
})

// @route 
// @desc 创建信息接口
// @access private

router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  const Filelds = {}
  const {name,create_time,menus} = req.body
  name && (Filelds.name = name)
  create_time && (Filelds.create_time = create_time)
  menus && (Filelds.menus = menus)

  Role.findOne({name:Filelds.name,is_del:0}).then(role=>{
    if(role){
      return res.json({
        code:1,msg:'该角色已存在',data:[]
      })
    }else{
      new Role(Filelds).save().then((role) => {
          res.json({code:0,data:role,msg:'创建成功'});
        }).catch(err=>{
          res.status(200).json({code:1,data:[],msg:err})
        })
    }
  })
})

// 获取角色列表
router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
  Role.find({ is_del: { $ne: 1 }}).sort({_id:-1}).then(role=>{
    if(!role){
      return res.status(200).json({
        code:1,
        msg:'暂无数据',
        data:[]
      })
    }
    res.json({code:0,msg:'',data:role})
  }).catch(err=>{
    res.json({code:1,msg:err,data:[]})
  })
})

// 更新角色信息
router.post('/update',passport.authenticate('jwt',{session:false}),(req,res)=>{
  const {_id,menus,auth_name} = req.body;
  const auth_time = Date.now()
  Role.findOneAndUpdate({_id},{$set:{_id,menus,auth_time,auth_name,isAuth:1}},{new:true}).then(role=>{
    res.json({code:0,data:role,msg:'更新成功'})
  }).catch(err=>{
    res.json({code:1,data:err,msg:'更新失败'})
  })
})

// 删除
router.post('/delete',passport.authenticate('jwt',{session:false}),(req,res)=>{
  const {_id} = req.body;
  Role.findOneAndUpdate({_id},{$set:{is_del:1}},{new:false}).then(role=>{
    res.json({code:0,data:role,msg:'删除成功'})
  }).catch(err=>{
    res.json({code:1,data:err,msg:'删除失败'})
  })
})


module.exports = router