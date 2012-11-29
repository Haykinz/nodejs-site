// model 'item'

var db 				= require('../db'),
	config 			= require('../config'),
	mongoosastic 	= require('mongoosastic'),
	Attributes      = require('./schemas/attributes.schema'),
	
	Schema 	 		= db.Schema,
	ObjectId 		= Schema.Types.ObjectId;

					  require('./aggregator');
					  require('./state');
					  require('./city');
					  require('./user');
					  
Item = new Schema({
	hash					: { type: String, index: { unique: true } },
	
	keywordIds				: { type: Array, index: true, es_indexed: true, es_type: 'string'}, // For Keywords: [ObjectId, ObjectId. -""-, ]
	baseKeywordIds          : { type: Array, index: true, es_indexed: true, es_type: 'string'}, // For Serach:   [ObjectId, ObjectId. -""-, ]

	idOld    	    		: { type: Number },
	userIdOld   			: { type: Number },
	categoryIdOld			: { type: Number },

	aggregatorId  			: { type: ObjectId, ref: 'Aggregator' },
	userId 		 			: { type: ObjectId, ref: 'User' },
	state 			       	: { type: ObjectId, ref: 'State' },	
	city        			: { type: ObjectId, ref: 'City', index: true, es_indexed: true },

	countryCode 			: { type: String, lowercase: true, index: true, es_indexed: true },
	slug 					: { type: String, lowercase: true, index: true, es_indexed: true },
	
	vipStatus				: { type: Boolean, default: false },
	vipParams				: { type: Object },

	// content					: {
	title 					: { type: String, es_indexed: true, es_boost: 2.0 },
	images					: { type: Array },
	descriptionTEXT			: { type: String, es_indexed: true, es_boost: 1.0 },
	descriptionHTML 		: { type: String },
	descriptionClickLink    : { type: String },
	hiddenText              : { type: String, es_indexed: true, es_boost: 3.0},
	// },

	contentSearchPriority 	: { type: Number }, // Piority for content search in Elastic Serach
	attributes 				: Attributes,
	
	phoneExt 				: { type: String },

	dateInsert  			: { type: Date, default: Date.now, index: -1, es_indexed: true },
	dateUpdate  			: { type: Date},
	price       			: { type: Number, index: true },
	filter      			: { type: Number, index: true },

	owner 		   			: { type: String, lowercase: true, index: true, es_indexed: true },
	trueOwner    			: { type: String, lowercase: true },

	inIndex      			: { type: Boolean}					// Page robots="noindex"

}, { 
	safe: true 
})

Item.plugin(mongoosastic,  config.get("ESEARCH"));

var _Item = db.model('Item', Item);

_Item.createMapping(function(err, mapping){
	if(err){		
		console.log(err);  
	}
});

module.exports = Item;