let mongoose = require("mongoose");

mongoose.model("Task",new mongoose.Schema({
	title:{type:String,required:true,minlength:1,maxlength:255},
	description:{type:String,required:true,minlength:1,maxlength:255},
	completed:{type:Boolean,required:false}
},{timestamps:true}));