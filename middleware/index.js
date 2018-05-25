// all the middleware goes here
var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj= {};

middlewareObj.checkCampgroundOwnership = function(req,res,next){

			if(req.isAuthenticated()){

				Campground.findById(req.params.id, function(err,foundCampground){
					if(err){
						res.redirect("back");
					}
					else{
						//does the user own the campground?
						if(foundCampground.author.id.equals(req.user._id)){ //one is string the other is a num so we have used to equals method 
							next(); //move on and execute the code
						}
						else{
							req.flash("error", "You do not have permission to do that");
							res.send("YOU DO NOT HAVE PERMISSION TO DO THAT");
						}
					}
				})

			}
			else{
				res.redirect("back");
			}
		
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        // Pay attention to the beginning of the line below!
        // Campground.findById(req.params.comment_id, function(err,foundComment){
        Comment.findById(req.params.comment_id, function(err, foundComment){  // Corrected.
            if(err){
                res.redirect("back");
            }  else {
                // does user own the comment?
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
					req.flash("error", "You do not have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
		req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};


middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in to do that");
	res.redirect("/login");
}



module.exports = middlewareObj;