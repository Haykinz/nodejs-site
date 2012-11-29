// model 'aggregator'

var db 			= require('../db'),
	Schema 		= db.Schema,
	ObjectId 	= Schema.Types.ObjectId;

var Aggregator = new Schema({
	
	__model 		: { type: String },
	
	name        	: { type: String },
	description 	: { type: String },
	owner 		   	: { type: String, lowercase: true, index: true },
	
	runFile     	: { type: String },	
	runParams   	: { type: Object },

	translateParams	: {
		langIn 		: { type: String},
		langOut 	: { type: String}
	},
	
	sortPosition	: { type: Number},
	limit 			: { type: Number},

	proxy	      	: { type: Boolean},
	active      	: { type: Boolean, index: true }
}, { 
	safe: true 
});
 
db.model('Aggregator', Aggregator);

module.exports = Aggregator;