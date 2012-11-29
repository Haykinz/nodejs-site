	
var db 					= require('../db'),    
	StatisticsSchema 	= require('../models/statistics'),
	Statistics 			= db.model('Statistics', StatisticsSchema);

module.exports = function(aggregator_id, cb) {
	var statistics                      = new Statistics();
		statistics.keywordAggregatorId  = aggregator_id,
		statistics.counter              = 0;	
	
	cb(statistics);
}