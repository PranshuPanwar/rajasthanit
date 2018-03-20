/**
 * Created by Pranshu Panwar on 22-12-2017.
 */
var mongoose = require('mongoose');
var bcrypt= require('bcryptjs');


//Userschema
var UserSchema=mongoose.Schema({
    username:{type: String ,
     index :true},
    password :{ type:String},
    email :{ type :String},
    name : { type : String}
});


var User = module.exports = mongoose.model('User',UserSchema);

//create users
module.exports.createUser= function(newUser,callback)
{
    //bcrypt function for password hassing
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            // Store hash in your password DB.
            newUser= hash;
          // newUser.save(callback);
        });
        newUser.save(callback);
    });

};
module.exports.getUserByUsername= function (username, callback) {
    var query = {username: username};
    User.findOne(query,callback);
};
module.exports.getUserById= function (id, callback) {
    User.findById(id,callback);
};

module.exports.comparePassword = function(candidatePassword , hash ,callback){

    bcrypt.compare(candidatePassword, hash , function(err, isMatch) {

        if(err) throw err;

        callback(null,isMatch);
    });

};