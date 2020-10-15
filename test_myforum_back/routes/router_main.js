const express = require('express');
const router = express.Router();

const user = require('../schema/schema_user');

const post = require('../schema/schema_post');
const comment = require('../schema/schema_comment');

require("./router_user")(router, user);
require("./router_post")(router, post, comment);

module.exports = router;