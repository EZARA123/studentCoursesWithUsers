const passport = require('passport');
const{Strategy} = require('passport-local').Strategy;
const {User} = require('../models');
const md5 = require('md5');

async function validateUser(username, password, done){
    const user = await User.findOne(    {
        where: {
            email:username,
            password: md5(password)
        }
    });
    if (!user){
        return done(null, false, {message: 'Invalid Username or Password'});
    }
    return done(null, {id:user.id});
}