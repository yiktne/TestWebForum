var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userID:String,
    nickName:String,
    pw:String,
    pwKey:String,
    userLevel:Number
});

module.exports = mongoose.model("user", userSchema);