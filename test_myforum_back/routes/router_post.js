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

    router.get('/getComments/:postID', (req, res) => {
        if(req.params.postID === "" || req.params.postID === undefined) {
            return res.status(500).json({err:'postID not found', code:100});
        }

        comment.find((err, res) => {
            console.log(res);
        })

        comment.find({"postID":req.params.postID}).sort("sort").exec((err, result) => {
            if(err) {
                return res.status(500).json({err});
            }

            res.json(result);
        });
    });
    
    router.get('/getLastPost', (req, res) => {
        post.findOne({}, {_id:0, postID:1}).sort({postID:-1}).exec((err, result) => {
            if(err) {
                return res.status(500).json({err});
            }

            res.json({lastID:result.postID});
        });
    });

    router.post('/post', (req, res) => {
        if(req.body.title === "" || req.body.title === undefined) {
            return res.status(500).json({err:'title not found', code:100});
        }
        if(req.body.content === "" || req.body.content === undefined) {
            return res.status(500).json({err:'content not found', code:101});
        }
        if(req.body.userToken === "" || req.body.userToken === undefined) {
            return res.status(500).json({err:'userToken not found', code:102});
        }

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

    router.post("/comment", (req, res) => {
        
        if(req.body.postID === "" || req.body.postID === undefined) {
            return res.status(500).json({err:'postID not found', code:101});
        }
        if(req.body.content === "" || req.body.content === undefined) {
            return res.status(500).json({err:'content not found', code:101});
        }
        if(req.body.userToken === "" || req.body.userToken === undefined) {
            return res.status(500).json({err:'userToken not found', code:102});
        }

        jwt.verify(req.body.userToken, require('../secretdatas').jwtSecret, (err, decoded) => {

            if(err) {
                console.log(err);
                return res.status(500).json(err);
            }

            let newComment = new comment();

            console.log(decoded);

            newComment.postID = req.body.postID;
            newComment.userID = decoded.userID;
            newComment.content = req.body.content;
            newComment.target = req.body.target;
    
            newComment.save().then((value) => {
                console.log(value);
                res.json({id:value._id});
            });
        });
    });
}
