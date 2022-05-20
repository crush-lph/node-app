const express = require('express')
const mqtt = require('mqtt')

// 引入mongoose
const mongoose = require('mongoose')


const users = require("./routes/api/users")
const profiles = require('./routes/api/profiles')
const nurses = require('./routes/api/Nurses')
const medical = require('./routes/api/medical')
const patient = require('./routes/api/patient')
const role = require('./routes/api/Roles')
const department = require('./routes/api/deaprtment')
const identity = require('./routes/api/identity')

const client = require('./client')

// client.on('message')

// const host = 'broker-cn.emqx.io'
// const mqttPort = '1883'
// const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
// const connectUrl = `mqtt://${host}:${mqttPort}`
// const mqttClient = mqtt.connect(connectUrl, {
//   clientId,
//   clean: true,
//   connectTimeout: 4000,
//   username: 'emqx',
//   password: 'public',
//   reconnectPeriod: 1000,
// });

// const topic = '/nodejs/mqtt'
// mqttClient.on('connect', () => {
//   console.log('connected');
//   //订阅
//   mqttClient.subscribe([topic], () => {
//     console.log(`subscribe to topic ${topic}`);
//   })
//   //发布
//   mqttClient.publish(topic, 'nodejs', { qos: 0, retain: false }, (err) => {
//     if (err) {
//       console.log(err);
//     }
//   })
// })

// mqttClient.on('message', (topic, payload) => {
//   console.log('message: ' + topic, payload.toString());
//   const str = payload.toString()
//   if (str == 'hello') {
//     mqttClient.publish(topic, 'hi', { qos: 0, retain: false }, (err) => {
//       console.log(err)
//     })
//   }
// })




// bodyParser 已经启用
// const bodyParser = require('body-parser')
const passport = require('passport')
require('./config/passport')(passport)

const app = express()




// 连接数据库
// { useMongoClient: true }
// mongoose.connect('mongodb://数据库ip地址:端口号(默认端口27017可以省略)/数据库名')
mongoose.connect('mongodb://localhost/medical_db').then(() => {
  console.log('MonogoDB is connected');
}).catch(err => {
  console.log('connect failed' + err);
})

// 设置后端允许跨域
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})


// 使用body-parser中间件
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// 初始化passport
app.use(passport.initialize())
// app.get('/', (req, res) => {
//   res.send('hello world!,this is my app ')
// })


// 路由注册
app.use('/api/users', users)
app.use('/api/profiles', profiles)
app.use('/api/nurses', nurses)
app.use('/api/medical', medical)
app.use('/api/patient', patient)
app.use('/api/role', role)
app.use('/api/department', department)
app.use('/api/identity', identity)


const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`serve is running on port ${port}`);
})