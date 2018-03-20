/**
 * Created by Pranshu Panwar on 18-11-2017.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var User = require('../models/user');

//register route
router.get('/register',function(req,res){
    res.render('register');
});

//login route
router.get('/login',function (req,res)
{
    res.render('login');
});
//logout router
router.get('/',function (req,res)
{
    res.render('Dashboard');
});
//register the user
router.post('/register',function (req,res) {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2= req.body.password2;


    //validations
    req.check('name','Name is required').notEmpty();
    req.check('email','Email is required').notEmpty();
    req.check('email','Email is valid').isEmail();
    req.check('username','Username is required').notEmpty();
    req.check('password','Password is required').notEmpty();
    req.check('password2','Confirm password is required').notEmpty();
    req.check('password2','passwords do not match').equals(password);


    var errors = req.validationErrors();

    if(errors){
        res.render('register', {
            errors: errors
        });
    }
    else
    {
        var newUser = new User({
            name : name,
            email : email,
            username : username,
            password : password
        });

        User.createUser(newUser,function(err,user){
            if(err)throw err;
            console.log(user);
        });
        req.flash('success_msg',"you are successfully registered");

        res.redirect('/users/login');
    }
});


passport.use(new LocalStrategy(
    function(username, password, done) {
     User.getUserByUsername(username,function(err,user){
         if(err)throw err;
         if(!user){
             return done(null,false,{message :'unknown user'})
         }
         User.comparePassword(password, user.password, function(err, isMatch){
             if(err) throw  err;
            // if(!isMatch){
            //     return done(null,false,{message:"Invalid password"});
          //   }
            if(isMatch) {
                return done(null, user);
            }
            else{
                return done(null,false,{message:"Invalid password"});
           }
         })
     })
    }));
/*passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));*/
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

router.post('/login',
    passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
    function(req, res) {
        res.redirect('/');
    });

module.exports = router;