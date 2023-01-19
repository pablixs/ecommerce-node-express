const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
const passport = require('passport');
// const cookie = require('cookie-parser');
const fromCookie = (req) => {
    return req.cookies.jwt
}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.jwtFromRequest = ExtractJwt.fromExtractors([fromCookie]);
opts.secretOrKey = 'Mega secret';

const user_find = require('../models/users/UserManagment_model');


passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    const { success, data:user, error } = await user_find.search_user(jwt_payload.email);
    // User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (!success) {
            return done(null, false);
        }
        if (success) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    // });
}));