var passport= require('passport');
var {User}= require('../model/user');
var LocalStrategy= require('passport-local').Strategy;

passport.serializeUser((user, done)=>{
    done(null, user.id);
})

passport.deserializeUser((id, done)=>{
    User.findById(id,(err, user)=>{
        done(err, user);
    })
})

passport.use('local.signup',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true,
    
}, (req, email, password, done)=>{
    req.check('email', 'Invalid Emai Address').notEmpty().isEmail();
    req.check('password', 'Invalid Password').notEmpty().isLength({min:4});
    var errors= req.validationErrors();
    if(errors){
        var messages=[];
        errors.forEach(error=>{
            messages.push(error.msg);
        })
        return done(null, null, req.flash('error',messages));
    }
    User.findOne({'email':email}, (err, user)=>{
        if(err){
           return  done(err);
        }
        if(user){
           return done(null,false,{message:"Email address already in use"});
        }
    })

    var newUser=new User();
    newUser.email=email;
    newUser.password=newUser.encryptPassword(password);
    newUser.save((err,result)=>{
        if(err){
           return done(err);
        }
       return done(null,newUser);
    })
}));

passport.use('local.signin', new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true,
}, function(req, email, password, done){
    req.check('email', 'Invalid Emai Address').notEmpty().isEmail();
    req.check('password', 'Invalid Password').notEmpty().isLength({min:4});
    var errors= req.validationErrors();
    if(errors){
        var messages=[];
        errors.forEach(error=>{
            messages.push(error.msg);
        })
        return done(null, null, req.flash('error',messages));
    }

    User.findOne({'email':email}, (err, user)=>{
        if(err){
           return done(err);
        }
        if(!user){
           return done(null,false,{message:"Specified User is not already registered, Consider registering first"});
        }

        if(!user.validatePassword(password)){
            return done(null,false,{message:"Wrong Password!!"});
        }

        return done(null, user);
    })


}))
