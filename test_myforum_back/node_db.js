module.exports = () => {
    const mongoURL = require("./secretdatas").mongoURL;
    var mongoose = require("mongoose");
    var autoIncrement = require('mongoose-auto-increment');

    mongoose.connect(mongoURL, {useNewUrlParser:true});

    var db = mongoose.connection;
    
    db.on('error', (err) => {
        console.log("MongoDB Connection error", err);
      });
      
    db.on('open', ()=>{
       console.log("MongoDB Connection Success");
     });

     autoIncrement.initialize(db);

     return mongoose;
}