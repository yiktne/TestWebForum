var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var autoIncrement = require('mongoose-auto-increment');

var postSchema = new Schema({
    postID:Number,
    title:String,
    userID:String,
    userName:String,
    content:String,
    date:{type:Date, default: Date.now},
    comments:[ObjectId]
});

postSchema.plugin(autoIncrement.plugin, {model:'post', field:'postID', startAt:1, increment:1});

module.exports = mongoose.model("post", postSchema);