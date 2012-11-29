// model 'keyword'


var tree 		= require('mongoose-tree');
	db 			= require('../db'),
	Schema 		= db.Schema,
	ObjectId 	= Schema.Types.ObjectId;

				  require('./aggregator');
				  require('./specificationGroup');

KeywordAggregator = new Schema({
	aggregator 				: { type: ObjectId, ref: 'Aggregator' },
	order   				: { type: Number },
	style   				: { type: String },
	title   				: { type: String },
	__model					: { type: String },
	limit					: { type: Number },
	owner 		   			: { type: String, lowercase: true, index: true },

	translate 				: { type: Boolean },
	translateParams			: {
		langIn 				: { type: String },
		langOut 			: { type: String }
	},	
  
	lastUpdate				: { type: Date, default: Date.now},
	runParams   			: {
		specification 		: { type: Array },
		specificationGroup	: { type: ObjectId, ref: 'SpecificationGroup'},
		q					: { type: Schema.Types.Mixed },
		lastId				: { type: Number },
		region				: { type: String },
		category 			: { type: String },
		keyword 			: { type: String },
		make 				: { type: String },
		model 				: { type: String },
		year 				: { type: String }
	},

	orderImages 			: { type: Number, default: 0 },
});

Keyword = new Schema({
	parent      			: { type: ObjectId },
	ruleId      			: { type: ObjectId },
	baseKeywordIds          : { type: Array}, // For Serach:   [ObjectId, ObjectId. -""-, ]
	keywordCandidateId		: { type: ObjectId },
	hash 					: { type: String, index: { unique: true } },	
	hashPattern  			: { type: String },	
	template				: { type: String },
	countryCode 			: { type: Array, lowercase: true, index: true },
	name        			: { type: String},
	nameShort      			: { type: String},
	slug        			: { type: String, lowercase: true, index: { unique: true } },
	aggregators 			: [KeywordAggregator],
	translate 				: { type: Boolean, default: false },	
	translateParams			: {
		langIn 				: { type: String},
		langOut 			: { type: String}
	},
	major       			: { type: Boolean },
	active      			: { type: Boolean, index: true },
	inIndex      			: { type: Boolean},					// Page robots="noindex"
	addDate 				: { type: Date, index: true, default: Date.now, },
	pubDate     	    	: { type: Date, index: true },
	authLevel				: { type: String },

	contentSearchPriority 	: { type: Number }, // Pioryty for content search in Elastic Serach

    contentFound    		: {
        items 				: { type: Number, default: 0, index: true },
        news 				: { type: Number, default: 0, index: true },
        reviews 			: { type: Number, default: 0, index: true },
    },
    
	lastUpdate			: { type: Date, index: true }
}, { 
	safe: true
})

/**
 * Compound INDEXING
 */
Keyword.index({ contentFound: 1});

/**
 * PLUGINS
 */
Keyword.plugin(tree);

db.model('Keyword', Keyword);

module.exports = Keyword