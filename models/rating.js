// model 'rating'

var db              = require('../db'),
    
    Schema          = db.Schema,
    ObjectId        = Schema.Types.ObjectId;

var Rating = new Schema({	
	aggregator   			: { type: ObjectId},
	keywordIds				: { type: Array, index: true},
	value                   : { type: Number},
	votes                   : { type: Number},
	lastUpdate				: { type: Date, default: Date.now}
}, { 
	safe: true 
})

db.model('Rating', Rating);

module.exports = Rating;
