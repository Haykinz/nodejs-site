// model 'blog'

var db          = require('../db'),
    Schema      = db.Schema,
    ObjectId    = Schema.Types.ObjectId;

var linksMap = new Schema({   
    aggregatorId       : { type: ObjectId, index: true },
    link               : { type: String, unique: true },
}, { 
    safe: true 
});

db.model('linksMap', linksMap);

module.exports = linksMap;