let mongoose = require("mongoose");
let UserController = require("../controllers/UserController.js");

module.exports = function(app){

	app.get("/",UserController.index);
	app.post("/register",UserController.register);
	app.post("/login",UserController.login);
}



