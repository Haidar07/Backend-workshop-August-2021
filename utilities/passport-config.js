const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/models')

const initialize = (passport) => {

    passport.use(new LocalStrategy(
        {usernameField: "email"}, async (email, password, done) => { 
            return await User.findOne({where: {email}}).then(async(user) => {
                if (!user){return done(null,false)};
                return await bcrypt.compare(
                    password, user.password, (err,res) => {
                        if(!res){return done(null, false)}
                        return done(null,user)
                        }
                    );
                }).catch(err => done(err));
            }
        ))
    };

module.exports = initialize; 