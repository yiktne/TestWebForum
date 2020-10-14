const express = require('express');
const router = express.Router();

const user = require('../schema/schema_user');

require("./router_user")(router, user);

module.exports = router;