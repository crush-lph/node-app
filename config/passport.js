// const passport = require("passport");

const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose')
const User = mongoose.model('users')
const keys = require('../config/keys')
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey

module.exports = passport => {
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    // 这个jwt_payload就是jwt的载荷部分，其中携带了有用的信息
    User.findById(jwt_payload.id).then(user => {
      if (user) {
        return done(null, user)
      }
      return done(null, false)
    }).catch(err => {
      console.log(err)
    })
  }));
}