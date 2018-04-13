let TaskController = require("../controllers/TaskController.js");

module.exports = function(app){
	app.get("/api/tasks",TaskController.all);
	app.get("/api/tasks/:id",TaskController.find);
	app.post("/api/tasks",TaskController.create);
	app.put("/api/tasks/:id",TaskController.update);
	app.delete("/api/tasks/:id",TaskController.destroy);
}