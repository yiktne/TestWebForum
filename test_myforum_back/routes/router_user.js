/**
 * @param {import("express").Application} app Express Application
 * @param {import("../schema/schema_user")} user User Schema
 */
module.exports = (app, user) => {
    var crypto = require("crypto");

    // 계정 생성
    app.post("/signup", (req, res) => {
        if(req.body.userID === "" || req.body.userID === null) {
            res.status(500).json({error:"userID not found"});
        }
        if(req.body.password === "" || req.body.password === null) {
            res.status(500).json({error:"password not found"});
        }
        if(req.body.nickname === "" || req.body.nickname === null) {
            res.status(500).json({error:"nickname not found"});
        }

        user.find({userID:req.body.userID}, (err, user) => {
            if(err) {
                res.status(500).json({error:err});
            }

            if(user.lenth !== 0) {
                res.status(500).json({error:"userID already used"});
            }

            crypto.randomBytes(64, (err, buf)=>{
                crypto.pbkdf2(req.body.password, buf.toString('base64'), requier("../secretdatas.js").encryptCount, 64, "sha512", (err, key)=>{
                    var _user = new user();

                    _user.userID = req.body.userID;
                    _user.nickname = req.body.nickname;
                    _user.pwKey = key.toString("base64");
                    _user.pwTemp = buf.toString("base64");
                    _user.userLevel = 1;

                    _user.save().then(function(product){
                        console.log(product);
                        
                        res.json(product);
                    }, function(err){
                        console.log(err);
                        return res.status(500).json({error:err});
                    });
                });
            });
        })
    });

    app.post("/signin", (req, res) => {
        user.find({userID:req.body.userID}, (err, user) => {
            if(err) {
                res.status(500).json({error:err});
            }

            crypto.pbkdf2(req.body.password, user.pwTemp, requier("../secretdatas.js").encryptCount, 64, "sha512", (err, key)=>{
                if(key.toString("base64") === user.pwKey) {
                    res.status(200).json({result:key.toString("base64") === user.pwKey});
                }
            });
        });
    });
}