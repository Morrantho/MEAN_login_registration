let mongoose = require("mongoose");

let user = mongoose.model("User",new mongoose.Schema({
	name:{type:String,required:true,minlength:1,maxlength:255},
	email:{type:String,required:true,minlength:1,maxlength:255},
	password:{type:String,required:true,minlength:8,maxlength:255}
},{timestamps:true}));