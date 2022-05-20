const express  =require('express')
const router = express.Router();
const Identity = require('../../models/Identity')

const passport = require('passport')

router.get('/test',(req,res)=>{
  res.json({msg:'test run'})
})


router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  const params = {}
  params.name = req.body.name
  params.create_time = Date.now()

  Identity.findOne({name:req.body.name,is_del:0}).then(data=>{
    if(data){
      return res.json({
        code:1,msg:'该职位已存在',data:[]
      })
    }else{
      new Identity(params).save().then(dep=>{
        res.json({code:0,data:dep,msg:'创建成功'})
      }).catch(err=>{
        res.json({code:1,data:[],msg:err})
      })
    }
  })
})

router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
  Identity.find({ is_del: { $ne: 1 }}).sort({_id:-1}).then(dep=>{
    if(!dep){
      return res.status(200).json({
        code:1,
        msg:'暂无数据',
        data:[]
      })
    }
    res.json({code:0,msg:'',data:dep})
  }).catch(err=>{
    res.json({code:1,msg:err,data:[]})
  })
})


router.post('/update',passport.authenticate('jwt',{session:false}),(req,res)=>{
  const {_id,name,auth_name} = req.body;
  const update_time = Date.now()
  Identity.findOneAndUpdate({_id},{$set:{name,auth_name,update_time,isAuth:1}},{new:true}).then(role=>{
    res.json({code:0,data:role,msg:'更新成功'})
  }).catch(err=>{
    res.json({code:1,data:err,msg:'更新失败'})
  })
})

router.post('/delete',passport.authenticate('jwt',{session:false}),(req,res)=>{
  const {_id} = req.body;
  Identity.findOneAndUpdate({_id},{$set:{is_del:1}},{new:false}).then(role=>{
    res.json({code:0,data:role,msg:'删除成功'})
  }).catch(err=>{
    res.json({code:1,data:err,msg:'删除失败'})
  })
})

module.exports = router