let mongoose = require("mongoose");
let User = mongoose.model("User");
let bcrypt = require("bcrypt-as-promised");

class UserController{
	index(req,res){

		res.render("index",{
			"errors":req.session.errors
		});
	}

	register(req,res){
		User.find({email:req.body.email},(err,user)=>{
			console.log("USER: ",user);

			if(err){
				console.log(err);
			}else{
				if(user.length > 0){ // If this person exists, don't let them register, someone already has this email.
					console.log("USER WITH EMAIL:"+req.body.email+" ALREADY EXISTS.");	
					res.redirect("/")
				}

				let newUser = new User(req.body);

				bcrypt.hash(req.body.password,10)
				.then(hash => {
					newUser.password = hash;

					newUser.save(err=>{
						if(err){
							console.log(err);
							res.redirect("/");
						}

						req.session.user_id = newUser._id;
						res.redirect("/");
					});
				})
				.catch(error => {
					console.log("BCRYPT ERROR: "+error);
					res.redirect("/");
				});

			}
		});
	}

	login(req,res){
		let errors = [];

		User.find({email:req.body.email},(err,user)=>{
			if(err){
				errors.push("Failed to lookup user");
				req.session.errors =errors;
				res.redirect("/");
			}else{
				if(user[0]){
					bcrypt.compare(req.body.password,user[0].password)
					.then(()=>{
						req.session.user_id = user[0]._id;
						res.redirect("/dashboard");
					})
					.catch((err)=>{
						console.log("CATCH:",err);
						errors.push(err);
						req.session.errors =errors;

						res.redirect("/");
					});					
				}else{



					console.log("USER: "+req.body.email+" DOES NOT EXIST!!");
					res.redirect("/");
				}
			}
		});
	}
}

module.exports = new UserController();