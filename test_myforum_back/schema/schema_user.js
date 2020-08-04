var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userID:String,
    nickName:String,
    pwKey:String,
    pwTemp:String,
    userLevel:Number
});

module.exports = mongoose.model("user", userSchema);