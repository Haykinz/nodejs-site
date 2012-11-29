// model 'statistics'

db = require('../db')

Schema 	 = db.Schema;
ObjectId = Schema.Types.ObjectId;

require('./keyword');

Aggregator = new Schema({	
	aggregatorId 	: { type: ObjectId},
	name			: { type: String},
	total	      	: { type: Number},
	fail    	   	: { type: Number},
	save       		: { type: Number},
	error      		: { type: Number},
	duplicate	  	: { type: Number}
});

Statistics = new Schema({	
	keyword 				: { type: ObjectId, ref: 'Keyword'},
	aggregators				: [Aggregator],
	date 		 			: { type: Date, default: Date.now, index: true}
}, { 
	safe: true 
});

db.model('Statistics', Statistics);

module.exports = Statistics;