/**
 * Main Router
 * @param {import("express").Application} app Express App
 * @param {import("../schema/schema_user")} user User Schema
 */
module.exports = (app, user) => {

    var user = require("./router_user")(app, user);
}