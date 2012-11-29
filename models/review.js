// model 'review'

var db              = require('../db'),
    config          = require('../config'),
    mongoosastic    = require('mongoosastic'),

    Schema          = db.Schema,
    ObjectId        = Schema.Types.ObjectId;

                      require('./aggregator');

var Review = new Schema({   
    aggregatorId            : { type: ObjectId, ref: 'Aggregator' },
    keywordIds              : { type: Array, index: true, es_indexed: true, es_type: 'string' }, // For Keywords: [ObjectId, ObjectId. -""-, ]
    baseKeywordIds          : { type: Array, index: true, es_indexed: true, es_type: 'string' }, // For Serach:   [ObjectId, ObjectId. -""-, ]
    hash                    : { type: String, index: { unique: true } },
    countryCode             : { type: String, lowercase: true, index: true, es_indexed: true },    
    title                   : { type: String, es_indexed: true, es_boost: 2.0 },
    urlSource               : { type: String },
    image                   : { type: String },
    description             : { type: String, es_indexed: true, es_boost: 1.0 },
    hiddenText              : { type: String, es_indexed: true, es_boost: 3.0 },
    author                  : { type: String },
    date                    : { type: Date, es_indexed: true },
    owner                   : { type: String, lowercase: true, index: true, es_indexed: true },
    rating                  : { type: Number }
}, {
    safe: true 
});

Review.plugin(mongoosastic,  config.get("ESEARCH"));

var _Review = db.model('Review', Review);

_Review.createMapping(function(err, mapping){
    if(err){
        console.log(err);  
    }
});

module.exports = Review;