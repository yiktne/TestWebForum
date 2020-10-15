/**
 * @param {import('express').Router} router 
 * @param {import('../schema/schema_post')} post 
 * @param {import('../schema/schema_comment')} comment 
 */
module.exports = (router, post, comment) => {
    const jwt = require('jsonwebtoken');

    router.get('/getPosts', (req, res) => {
        post.find((err, result) => {
            if(err) {
                return res.status(500).json(err);
            }

            return res.json(result.sort((a, b) => b.date - a.date));
        });
    });

    router.post('/post', (req, res) => {
        if(req.body.title === "" || req.body.title === undefined) {
            res.status(500).json({err:'title not found', code:100});
        }
        if(req.body.userToken === "" || req.body.userToken === undefined) {
            res.status(500).json({err:'userToken not found', code:101});
        }
        if(req.body.content === "" || req.body.content === undefined) {
            res.status(500).json({err:'content not found', code:103});
        }

        console.log(req.body.userToken);

        jwt.verify(req.body.userToken, require('../secretdatas').jwtSecret, (err, decoded) => {

            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }

            let newPost = new post();

            console.log(decoded);

            newPost.title = req.body.title;
            newPost.userID = decoded.userID;
            newPost.userName = decoded.nickName;
            newPost.content = req.body.content;
    
            newPost.save().then((value) => {
                console.log(value);
                res.json({id:value.postID});
            });
        });

    });
}
