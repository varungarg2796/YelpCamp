var express = require("express");
var router = express.Router();

var Campground = require("../models/campground");

var middleware = require("../middleware");

// HOME - main page

router.get("/campgrounds",function(req,res){
	//get campgrounds from db
	console.log(req.user);
	Campground.find({},function(err,allCampgrounds){ //'Campground' is our model
		if(err){
			console.log(err);
		}
		else{
			res.render("campgrounds/index.ejs", {campgrounds:allCampgrounds});
		}
	})

})


//CREATE- Add something which the user wants to create

router.post("/campgrounds", middleware.isLoggedIn, function(req,res){ // to create new campgrounds
	//get data from form and add to campgrounds array xxx--> now add it to the db!!
	//redirect back to campgrounds page
	var name= req.body.name;
	var image= req.body.image;
	var desc= req.body.description;
	var price= req.body.price;
	var author= {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground= {name:name, price:price, image:image, description:desc, author:author} ;
	console.log(req.user);
	// of no use as we are using db and not an array --> campgrounds.push(newCampground); //pushing the newly made object into the array
	Campground.create(newCampground,function(err,newlyCreated){
		if(err){
			console.log(err);
		}
		else{
			console.log(newlyCreated);
			res.redirect("/campgrounds");	
		}
	})

})

//NEW - Create something
router.get("/campgrounds/new", middleware.isLoggedIn, function(req,res){
	//show data that will be sent to the post request
	res.render("campgrounds/new.ejs")
})


// the following should be below everything as it can lead to catastrophy


//SHOW
router.get("/campgrounds/:id", function(req,res){
	// req.param.id matlab just param aaya hai request ka, usme se id nikal lo
	//FINDBYID mongoose ka ek method hai. create jaise.
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		//console.log(req.param.id);
		if(err){
			console.log(err);
		}
		else{
			console.log(foundCampground);
			res.render("campgrounds/show.ejs", {campground:foundCampground});
		}
	})

})

//EDIT campground route
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,function(req,res){

		Campground.findById(req.params.id, function(err,foundCampground){	
			res.render("campgrounds/edit.ejs", {campground: foundCampground});
		})
})


//UPDATE campground route

router.put("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
	//req.params.id is the 'id' that comes in the url. we can access it becase we are mentioning "/campgrounds/:id" in the request
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		}
		else{
			res.redirect("/campgrounds/"+ req.params.id);
		}
	})

})


//DESTROY campground route

router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		}
			res.redirect("/campgrounds");

	})
})



module.exports = router;