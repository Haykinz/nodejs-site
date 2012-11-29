/**
 * Front-end template Helper
 */

		              require('coffee-script');
var 		 config = require('../../config'),
		   truncate = require('../../functions/truncate'),
	    	     db	= require('../../db'),
		   ObjectId = db.Types.ObjectId,

	  KeywordSchema	= require('../../models/keyword'),
	  		Keyword = db.model('Keyword'),
	  		
   // AggregatorSchema = require('../models/aggregator'),
	   ReviewSchema	= require('../../models/review'),
	     ItemSchema	= require('../../models/item'),
	      Newschema	= require('../../models/news'),
	     Vidoechema = require('../../models/video'),
        ChartSchema = require('../../models/chart'),
       RatingSchema = require('../../models/rating'),
SpecificationSchema = require('../../models/specification'),
SpecificationGroupSchema = require('../../models/specificationGroup'),
	  		// Review 	= db.model('Review'),

	     preCompile	= require('./preCompile'),

	  		  async = require('async'),
		   template	= {},
		   _city, _keyword;
 

module.exports = function(req, cb) {
	cb('');
}