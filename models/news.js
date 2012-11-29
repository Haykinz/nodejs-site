// model 'news'

var db              = require('../db'),
    config          = require('../config'),
    mongoosastic    = require('mongoosastic'),

    Schema          = db.Schema,
    ObjectId        = Schema.Types.ObjectId;

                      require('./aggregator');

var News = new Schema({   
    title                   : { type: String, es_indexed: true, es_boost: 2.0 },
    author                  : { type: String },
    date                    : { type: Date, es_indexed: true },
    description             : { type: String, es_indexed: true, es_boost: 1.0 },
    image                   : { type: String },
    urlSource               : { type: String },
    hiddenText              : { type: String, es_indexed: true, es_boost: 3.0 },
    hash                    : { type: String, index: { unique: true } },
    owner                   : { type: String, lowercase: true, index: true, es_indexed: true },
}, { 
    safe: true 
});

News.plugin(mongoosastic,  config.get("ESEARCH"));

var _News = db.model('News', News);

_News.createMapping(function(err, mapping){
    if(err){
        console.log(err);  
    }
});

module.exports = News;