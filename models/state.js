//model 'sate'

var db 		= require('../db'),
Schema		= db.Schema,
ObjectId 	= Schema.Types.ObjectId;

State = new Schema({
	idOld    	: { type: Number},
	name        : { type: String},
	stateCode   : { type: String},
	countryCode : { type: String, lowercase: true, index: true},
	slug        : { type: String, lowercase: true, index: { unique: true}},
	slugOld     : { type: String, lowercase: true},
	active      : { type: Boolean, index: true}
}, { 
	safe: true 
})
 
db.model('State', State);

module.exports = State;