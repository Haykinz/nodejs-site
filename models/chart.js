// model 'Chart'

var db 		= require('../db'),
Schema 	 	= db.Schema,
ObjectId 	= Schema.Types.ObjectId;

Chart = new Schema({	
	aggregator   			: { type: ObjectId},
	keywordIds				: { type: Array, index: true},
	hash         			: { type: String, index: { unique: true } },	
	byCity					: {
		data        			: { type: Array},
		dataSlugs      			: { type: Array},
		dataStateCodes			: { type: Array}
	},
	byState					: {
		data        			: { type: Array},
		dataSlugs      			: { type: Array},
		dataStateCodes			: { type: Array}
	}	
}, { 
	safe: true 
})
 
db.model('Chart', Chart);

module.exports = Chart;