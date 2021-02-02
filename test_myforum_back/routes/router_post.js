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

    router.get("/getComments", (req, res) => {
        comment.find((err, result) => {
            if(err) {
                return res.status(500).json(err);
            }

            return res.json(result);
        });
    });

    router.get('/isPostOwner/:postID/:token', (req, res) => {
        if(req.params.postID === "" || req.params.postID === undefined) {
            return res.status(500).json({err:'postID not found', code:100});
        }

        post.findOne({"postID":req.params.postID}).then((post) => {
            if(!post) {
                console.log(err);
                return res.status(500).json({err:'post not found', code:200});
            }

            jwt.verify(req.params.token, require('../secretdatas').jwtSecret, (err, decoded) => {
                if(err) {
                    console.log(err);
                    return res.status(500).json({err});
                }

                return res.json({"result":decoded.userID === post.userID});
            });
        });
        
    })

    router.get('/getComments/:postID', (req, res) => {
        if(req.params.postID === "" || req.params.postID === undefined) {
            return res.status(500).json({err:'postID not found', code:100});
        }

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

            newPost.title = req.body.title;
            newPost.userID = decoded.userID;
            newPost.userName = decoded.nickName;
            newPost.content = req.body.content;
    
            post.findOne().sort({"postID":-1}).exec((err, prev)=>{
                if(!err) {
                    newPost.prevPost = prev.postID;
                } else {
                    console.log(err);
                }

                newPost.save().then((value) => {
                    console.log(value);

                    prev.nextPost = value.postID;
                    prev.save();

                    res.json({id:value.postID});
                });
            })
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

            newComment.postID = req.body.postID;
            newComment.userID = decoded.userID;
            newComment.content = req.body.content;
            newComment.target = req.body.target;
    
            newComment.save().then((value) => {
                post.findOne({postID:value.postID}).then((post) => {
                    post.comments.push(value._id);
                });
                res.json({comment:value});
            });
        });
    });

    router.put("/updatePost", (req, res) => {
        if(req.body.postID === "" || req.body.postID === undefined) {
            return res.status(500).json({err:'postID not found', code:101});
        }
        if(req.body.title === "" || req.body.title === undefined) {
            return res.status(500).json({err:'title not found', code:100});
        }
        if(req.body.content === "" || req.body.content === undefined) {
            return res.status(500).json({err:'content not found', code:101});
        }
        if(req.body.userToken === "" || req.body.userToken === undefined) {
            return res.status(500).json({err:'userToken not found', code:102});
        }

        post.findOne({"postID":req.body.postID}).then((post) => {
            jwt.verify(req.body.userToken, require('../secretdatas').jwtSecret, (err, decoded) => {
                if(post.userID === decoded.userID) {
                    post.title = req.body.title;
                    post.content = req.body.content;
                    post.save();

                    return res.json({result:true});
                } else {
                    return res.status(500).json({err:"user incorrect"});
                }
            });
        });
    });

    router.delete("/deletePost/:postID/:token", (req, res) => {
        post.findOne({"postID":req.params.postID}).then((delPost) => {
            jwt.verify(req.params.token, require('../secretdatas').jwtSecret, (err, decoded) => {
                if(err) {
                    return res.status(500).json({err});
                }

                if(decoded.userID !== delPost.userID) {
                    return res.status(500).json({err:"id incorrect"})
                }

                if(delPost.nextPost) {
                    post.find({"postID":{"$in":[delPost.prevPost, delPost.nextPost]}}).then((posts) => {
                        posts[0].nextPost = delPost.nextPost;
                        posts[1].prevPost = delPost.prevPost;

                        posts[0].save();
                        posts[1].save();
                    });
                } else {
                    post.findOne({"postID":delPost.prevPost}).then((prev) => {
                        prev.nextPost = undefined;
                        prev.save();
                    });
                }

                post.deleteOne({"postID":req.params.postID}).then((value) => {

                    comment.deleteMany({"postID":req.params.postID}).then(() => {
                        return res.json({result:value.ok});
                    })
                });
            });
        });
    });
}
