						  require('coffee-script');
var async           	= require('async'),
	db              = require('../db'),
  Schema   = db.Schema,
  ObjectId = db.SchemaTypes.ObjectId,

	AggregatorSchema   = require('./aggregator'),
	Aggregator         = db.model('Aggregator', AggregatorSchema),

	KeywordSchema   = require('./keyword'),
	Keyword         = db.model('Keyword', KeywordSchema);


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
*/

// Aggregator.findById("500c93b29e03fce75f000002", function(err, doc){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(doc);

//     k = new Keyword();

//     k.active = true;
//     k.name  = "Autos for sale";
//     k.slug   = "autos-for-sale";
//     k.aggregators.push({aggregator: doc._id, order: 1, style: 'list' });

//     k.save(function(err) {
//       console.log(err);
//     })
    
//   }
// });

// Keyword.findOne({}).populate('aggregators', function(err, doc){
//   console.log(doc);
// });

// Keyword.findOne({}).populate('aggregators.aggregator').exec(function(err, doc){
//   console.log(doc.aggregators[0]);
//   console.log(doc.aggregators[1]);
// });


// // [
 // {
     
     // "id": new ObjectId("500c492853c2e81b19000001")
      // "order": 1,
      // "style": "list" 
  
 // },
 // {
     // new ObjectId("500c492853c2e81b19000002")
     // "id": new ObjectId("500c492853c2e81b19000002")
     // "order": 1,
     // "style": "list" 
  // }

// ];

// k.save(function(err) {
//   console.log(err);
// })
