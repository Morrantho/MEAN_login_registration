let mongoose = require("mongoose");
let Task = mongoose.model("Task");
let bcrypt = require("bcrypt-as-promised");

class TaskController{
	all(req,res){
		Task.find({},(err,tasks)=>{
			if(err){
				return res.status(404).json({errors:"Failed to retrieve tasks."});
			}
			return res.status(200).json(tasks);
		});
	}

	find(req,res){
		Task.findOne({_id:req.params.id},(err,task)=>{
			if(err){
				return res.status(404).json({errors:"Failed to retrieve task."});
			}
			return res.status(200).json(task);
		})
	}

	create(req,res){
		let task = new Task(req.body);

		task.save(err=>{
			if(err){
				return res.status(400).json({errors:err});
			}
			return res.status(200).json(task);
		});
	}

	update(req,res){
		Task.findOne({_id:req.params.id},(err,task)=>{
			if(err){
				return res.status(404).json("Failed to lookup task.");
			}

			task.title = req.body.title;
			task.description = req.body.description;
			task.completed = req.body.completed;

			task.save(err=>{
				if(err){
					return res.status(400).json({errors:err});
				}
				return res.status(200).json(task);
			});
		});
	}

	destroy(req,res){
		Task.findOne({_id:req.params.id},(err,task)=>{		
			Task.remove({_id:req.params.id},err=>{
				if(err){
					return res.status(404).json({errors:"Failed to remove task."});
				}
				return res.status(200).json(task);
			});
		});
	}
}

module.exports = new TaskController();