var mongoose = require("mongoose");
var Campground = require("./models/campground"),
	Comment	   = require ("./models/comment");

var data = [

	{
		name: "Cloud 9"  ,
		image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg" ,
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name:  "Hell hell",
		image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg" ,
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name:  "What is this?",
		image:  "https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg" ,
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." 
	}



]


//remove campgrounds
function seedDB(){
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("Removed campgrounds");
		//as there is no guarantee that the below function will happen before removing
		data.forEach(function(seed){
			Campground.create(seed, function(err,createdCampground){
				if(err){
					console.log(err);
				}
				else{
					console.log("added a campground");
					Comment.create({
						text: "Wow",
						author: "Varun"
					}, function(err,comment){
						if(err){
							console.log(err);
						}
						else{
							createdCampground.comments.push(comment);
							createdCampground.save();
							console.log("created a new comment")
						}
					})
				}
			})
		})
	})
}

//add a few campgrounds




module.exports = seedDB;