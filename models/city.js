//model 'city'

var db 		= require('../db'),
Schema 	 	= db.Schema,
ObjectId 	= Schema.Types.ObjectId;

require('./state');

City = new Schema({
	idOld    	: { type: Number},
	regionId    : { type: Number},
	name        : { type: String},
	countryCode : { type: String, lowercase: true, index: true},
	slug        : { type: String, lowercase: true, index: { unique: true}},
	slugOld     : { type: String, lowercase: true},
	state       : { type: ObjectId, ref: 'State'},
	major       : { type: Boolean},
	active      : { type: Boolean, index: true}
}, { 
	safe: true 
})
 
db.model('City', City);

module.exports = City;