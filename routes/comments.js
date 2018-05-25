var express = require("express");
var router = express.Router({mergeParams: true});
var Comment = require("../models/comment");
var Campground = require("../models/campground");
var middleware = require("../middleware");





//========================COMMENTS ROUTES===================
//NEW AND CREATE FOR COMMENTS

//NEW
router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn, function(req,res){

	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		}
		else{
			res.render("comments/new.ejs", {campground:campground});
		}
	})
	
})

router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req,res){
	//lookup campground using id
	Campground.findById(req.params.id, function(err,foundCampground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}
		else{
			Comment.create(req.body.comment, function(err,comment){
				if(err){
					console.log(err);
				}
				else{
					console.log(req.user.username);
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save()

					//db mein se jo campground mila hai, usko find karke comments ke
					// andar jo form se cheez aayi hai, voh push kardo
					foundCampground.comments.push(comment);
					foundCampground.save();
					console.log("========" + comment);
					req.flash("success", "Successfully created the comment");
					res.redirect('/campgrounds/'+ foundCampground._id);
				}
			});
		}
	})	

	//create new comment

	//connect new comment to campground
})


//COMMENT UPDATE

router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership,function(req,res){
	Comment.findById(req.params.comment_id, function(err,foundComment){
		if(err){
			res.redirect("back");
		}
		else{
			res.render("comments/edit.ejs",{campground_id:req.params.id , comment:foundComment});
		}
	})
})

router.put("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		}
		else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
})


//COMMENT DESTROY

router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		}
		else{
			req.flash("success", "Comment deleted");
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
})







module.exports = router;
