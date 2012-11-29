
						  require('coffee-script');
var async           	= require('async'),
	db              	= require('../db'),
	AggregatorSchema 	= require('./aggregator'),
	Aggregator 			= db.model('Aggregator', AggregatorSchema);  // check on city call code (router)

/*
var a = new Aggregator();
/**********
a.name      = "US Com Edmunds Reviews";
a.urlSource = "edmunds.com";
a.runFile  	= "us.com.edmunds.reviews.js";
a.active 	=   true;
a.save();
/**********
a = new Aggregator();
a.name      = "US Com Edmunds Vehicle";
a.urlSource = "edmunds.com";
a.runFile   = "us.com.edmunds.vehicle.js";
a.active    = true;
a.save();