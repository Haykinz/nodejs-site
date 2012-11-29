// model 'specificationAbstract'

var db     = require('../db'),
Attributes = require('./schemas/attributes.schema'),
Schema     = db.Schema,
ObjectId   = Schema.Types.ObjectId;

/**
 * Remapping fields into Array
 */

for (var field in Attributes) {
	Attributes[field]['type'] = Array;
};

SpecificationAbstract = new Schema(Attributes, { safe: true });

SpecificationAbstract.keywordIds = { type: Array, index: true};
 
db.model('SpecificationAbstract', SpecificationAbstract);

module.exports = SpecificationAbstract;