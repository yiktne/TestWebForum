var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var commentSchema = new Schema({
    postID:Number,
    userID:String,
    content:String,
    date:{type:Date, default: Date.now},
    target:ObjectId,
});

module.exports = mongoose.model("comment", commentSchema);