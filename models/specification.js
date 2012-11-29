// model 'specification'

var db     = require('../db'),
Attributes = require('./schemas/attributes.schema'),
Schema     = db.Schema,
ObjectId   = Schema.Types.ObjectId;

Specification            = new Schema(
	Attributes
, { safe: true })
Specification.keywordIds = { type: Array, index: true};
Specification.model_id   = { type: Number, index: { unique: true } };

db.model('Specification', Specification);

module.exports = Specification;