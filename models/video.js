// model 'video'

var db = require('../db'),
Schema 	 = db.Schema,
ObjectId = Schema.Types.ObjectId;

Video = new Schema({
	aggregator   			: { type: ObjectId },
	keywordIds 				: { type: Array},
	hash         			: { type: String, index: { unique: true } },	
	videos       			: { type: Array},
	owner 		   			: { type: String, lowercase: true, index: true }
}, { 
	safe: true 
})

db.model('Video', Video)

module.exports = Video