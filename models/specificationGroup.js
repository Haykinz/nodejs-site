// model 'specification'

var db 		= require('../db'),
Schema		= db.Schema,
ObjectId 	= Schema.Types.ObjectId;

SpecificationGroup = new Schema({
	description	: { type: String}, 
	fields		: { type: Array}, 
}, { 
	safe: true 
})
 
db.model('SpecificationGroup', SpecificationGroup);

module.exports = SpecificationGroup;