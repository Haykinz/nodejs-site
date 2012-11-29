/**
 * model 'redirect'
 */

var   db = require('../db'),
  Schema = db.Schema,
ObjectId = Schema.Types.ObjectId;

var Redirect = new Schema({	
	countryCode 	: { type: Array, lowercase: true, index: true },
	from			: { type: String, index: true},
	to     			: { type: String},
	status     		: { type: Number, default: 301},
}, { 
	safe: true 
});

db.model('Redirect', Redirect);

module.exports = Redirect;