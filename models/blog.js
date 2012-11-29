// model 'blog'

var db          = require('../db'),
    Schema      = db.Schema,
    ObjectId    = Schema.Types.ObjectId;

require('./aggregator');

var Blog = new Schema({   
    aggregatorId            : { type: ObjectId, ref: 'Aggregator'},
    keywordIds              : { type: Array, index: true},
    hash                    : { type: String, index: { unique: true } },    
    title                   : { type: String},
    urlSource               : { type: String},
    image                   : { type: String},
    description             : { type: String},
    author                  : { type: String},
    date                    : { type: Date},
    owner                   : { type: String}
}, { 
    safe: true 
});

db.model('Blog', Blog);

module.exports = Blog;