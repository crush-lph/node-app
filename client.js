const mqtt = require('mqtt')

const host = 'broker-cn.emqx.io'
const mqttPort = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const connectUrl = `mqtt://${host}:${mqttPort}`
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'emqx',
  password: 'public',
  reconnectPeriod: 1000,
});

const topic = '/nodejs/mqtt'
client.on('connect', () => {
  console.log('connected')
  client.subscribe([topic], () => {
    console.log(`订阅${topic}的消息`);
  })

  client.publish(topic, 'nodejs', { qos: 0, retain: false }, (err) => {
    if (err) {
      console.log(err)
    }
  })
})

client.on('message', (topic, payload) => {
  console.log('message: ' + topic, payload.toString());
  const str = payload.toString()
  if (str == 'hello') {
    client.publish(topic, 'hi', { qos: 0, retain: false }, (err) => {
      console.log(err)
    })
  }
})


module.exports = client