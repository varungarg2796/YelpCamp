var express = require("express");

var bodyParser = require("body-parser");

var Campground = require("./models/campground"),
	seedDB	   = require("./seeds"),
	Comment    = require("./models/comment"),
	User       = require("./models/user"),
	methodOverride= require("method-override"),
	passport   = require("passport"),
	flash      = require("connect-flash"),
	LocalStrategy = require('passport-local');
	

var commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	authRoutes 		= require("./routes/index");

// seedDB(); //seeds he database

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connection.openUri('mongodb://localhost/yelp_camp');

//passport config	
var app = express();
app.use(express.static(__dirname+ "/public")); //attaching the stylesheets
app.use(methodOverride("_method"));

app.use(require("express-session")({
	secret: "Varun is a champ",
	resave: false,
	saveUninitialized: false
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
app.use(bodyParser.urlencoded({extended:true}));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");	
	next();
})

app.use(campgroundRoutes);
app.use(authRoutes);
app.use(commentRoutes);



app.listen("3000",function(req,res){
	console.log("listening on port 3000");  
})



//COPIED FROM iAN THE TA. Missed the s of params in my code :(
    // app.get("/campgrounds/:id", function(req, res){
    //     //find the campground with provided ID
    //     Campground.findById(req.params.id, function(err, foundCampground){
    //         if(err){
    //             console.log(err);
    //         } else {
    //             console.log("Found campground:", foundCampground);
    //             res.render("show.ejs", {campground: foundCampground});
    //         }
    //     });
    // });












//SCHEMA SETUP -- shifted to models

// For adding data to db through mongoose
// Campground.create(
// 	{
	
// 		name: "Qutub Minar",
// 		image:"http://www.makeyourdayhere.com/ImageRepository/Document?documentID=51",
// 		description: "This is a very good site"	


// 	},function(error,campground){
// 		if(error){
// 			console.log(error);
// 		}
// 		else{
// 			console.log("newly formed campground")
// 			console.log(campground);
// 		}
// 	})



//delted array
// var campgrounds= [
// 		{name: "Dhanouli", image:"https://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5253636.jpg"},
// 		{name: "Qutub Minar",image:"http://www.makeyourdayhere.com/ImageRepository/Document?documentID=51"},
// 		{name: "Despactito",image:"http://haulihuvila.com/wp-content/uploads/2012/09/hauli-huvila-campgrounds-lg.jpg"}

// 	];

//TO PASS CURRENTUSER TO ALL THE PAGES WE MAKE OUR MIDDLEWARE