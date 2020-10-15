/**
 * @param {import('express').Router} router 
 * @param {import("../schema/schema_user")} User 
 */
module.exports = (router, User) => {
    const crypto = require("crypto");
    const jwt = require('jsonwebtoken');
    
    // 계정 생성
    router.post("/signup", async (req, res) => {
        if(req.body.userID === "" || req.body.userID === null) {
            return res.status(500).json({error:"userID not found", code:100});
        }
        if(req.body.password === "" || req.body.password === null) {
            return res.status(500).json({error:"password not found", code:101});
        }
        if(req.body.nickname === "" || req.body.nickname === null) {
            return res.status(500).json({error:"nickname not found", code:102});
        }

        const result = User.find({userID:req.body.userID}, (err, user) => {
            if(user.length !== 0) {
                return res.status(500).json({error:"userID already used", code:201});
            }

            crypto.randomBytes(64, async function(err, buf) {
                const newUser = new User();
                
                const pwKey = buf.toString("base64");
                let pw = await encrypt(req.body.password, pwKey);
                
                newUser.userID = req.body.userID;
                newUser.nickName = req.body.nickname;
                newUser.pw = pw.toString("base64");
                newUser.pwKey = pwKey;
                newUser.userLevel = 1;
        
                console.log(err);

                newUser.save().then(function(product){
                    console.log(product);
                    
                    res.json(product);
                }, function(err){
                    console.log(err);
                    res.status(500).json({error:err, code:300});
                });
            });
        });
    });



    router.post("/signin", (req, res) => {
        User.findOne({userID:req.body.userID}, (err, user) => {
            if(err) {
                console.log(err);
                res.status(500).json({error:err});
            }

            if(user !== null) {
                crypto.pbkdf2(req.body.password, user.pwKey, require("../secretdatas").encryptCount, 64, "sha512", (err, key)=>{
                    console.log(key.toString("base64"));
                    console.log(user.pw);
                    if(key.toString("base64") === user.pw) {
                        // 로그인 성공
                        // JWT 발급
                        const p = jwt.sign({userID: user.userID, nickName:user.nickName, userLevel:user.userLevel}, require('../secretdatas').jwtSecret);
    
                        res.json({token:p});
                    } else {
                        return res.status(500).json({error:'password unmatched', code:200});
                    }
                });
            } else {
                return res.status(500).json({error:'user not found', code:100});
            }
        });
    });

    router.post("/signout", (req, res) => {
        delete req.session.user;

        req.session.save(()=>{
            console.log(req.session.user);
            res.redirect("/");
        });
    });

    async function encrypt(value, salt) {
        let result;
        await new Promise((resolve, reject) => {
            crypto.pbkdf2(value, salt.toString('base64'), require("../secretdatas").encryptCount, 64, "sha512", function(err, res) {
                if(err) {
                    reject(err);
                } else {
                    resolve(res);
                }
              });
        }).then(res => { result = res; })

        return result;
    }
}