const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt

const User = require('../models/User')

console.log(process.env.SECRET_KEY)
module.exports = passport.use(
  new jwtStrategy(
    {
      jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    },
    (jwt_payload, done) => {
      User.findOne({ _id: jwt_payload._id })
        .then((user) => {
          if (user) {
            return done(null, user)
          } else {
            return done(null, false)
          }
        })
        .catch((err) => {
          console.error(err)
          return done(err, false)
        })
    }
  )
)
