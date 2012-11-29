// model 'SpecificationGeneric'

var db     = require('../db'),
Schema     = db.Schema,
ObjectId   = Schema.Types.ObjectId;

SpecificationGeneric = new Schema({
	keywordIds : { type: Array, index: true},
	keywords   : { type: Array}
}, { 
	safe: true 
})
 
db.model('SpecificationGeneric', SpecificationGeneric);

module.exports = SpecificationGeneric;