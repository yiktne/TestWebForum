/**
 * @param {import("express").Application} app Express Application
 * @param {import("mongoose").Model} user User Schema
 */
module.exports = (app, User) => {
    var crypto = require("crypto");

    // 계정 생성
    app.post("/signup", async (req, res) => {
        if(req.body.userID === "" || req.body.userID === null) {
            return res.status(500).json({error:"userID not found", code:100});
        }
        if(req.body.password === "" || req.body.password === null) {
            return res.status(500).json({error:"password not found", code:101});
        }
        if(req.body.nickname === "" || req.body.nickname === null) {
            return res.status(500).json({error:"nickname not found", code:102});
        }

        const result = User.find({userID:id}, (err, user) => {
            if(user.lenth !== 0) {
                return res.status(500).json({error:"userID already used", code:201});
            }

            crypto.randomBytes(64, function(err, buf) {
                const newUser = new User();
                let pw = encrypt(buf.toString("base64"));
                
                /*
                newUser.userID = req.body.userID;
                newUser.nickname = req.body.nickname;
                newUser.pw = pw;
                newUser.pwKey = key;
                newUser.userLevel = 1;
        
                newUser.save().then(function(product){
                    console.log(product);
                    
                    res.json(product);
                }, function(err){
                    console.log(err);
                    res.status(500).json({error:err, code:300});
                });*/
            });
        });
    });



    app.post("/signin", (req, res) => {
        console.log(req.session.user);
        if(req.session.user !== undefined || req.session.user !== null) { 
            user.find({userID:req.body.userID}, (err, user) => {
                if(err) {
                    res.status(500).json({error:err});
                }

                crypto.pbkdf2(req.body.password, user.pwTemp, requier("../secretdatas.js").encryptCount, 64, "sha512", (err, key)=>{
                    if(key.toString("base64") === user.pwKey) {
                        // 로그인 성공
                        req.session.user = {
                            id: req.body.userID,
                            authorized: true
                        };

                        req.session.save(()=>{
                            console.log(req.session.user);
                            res.redirect("/");
                        });
                    }
                });
            });
        }
    });

    app.post("/signout", (req, res) => {
        delete req.session.user;

        req.session.save(()=>{
            console.log(req.session.user);
            res.redirect("/");
        });
    });

    async function encrypt(value, salt) {
        let result;
        await new Promise((resolve, reject) => {
            crypto.pbkdf2(value, salt.toString('base64'), require("../secretdatas.js").encryptCount, 64, "sha512", function(err, res) {
                if(err) {
                    reject(err);
                } else {
                    resolve();
                }
              });
        })(
            (err)=>{},
            (res)=>{ result = res; }
        );

        return result;
    }
}