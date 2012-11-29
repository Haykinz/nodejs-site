// model 'news'

var db              = require('../db'),
    config          = require('../config'),

    Schema          = db.Schema,
    ObjectId        = Schema.Types.ObjectId;


var KeywordCandidate = new Schema({   
    ruleId                  : { type: ObjectId, index: true },
    keywordId               : { type: ObjectId, index: true },       // parent/under layer keywordId
    keywordParentId         : { type: ObjectId, index: true },       // parent/under layer keywordId
    keywordCandidateSet     : {},
    skip                    : { type: Boolean},
    contentFound            : {
        items               : { type: Number, index: true },
        news                : { type: Number, index: true },
        reviews             : { type: Number, index: true },
    },
    hash                    : { type: String, index: { unique: true } },


}, { 
    safe: true 
});

/**
 * Compound INDEXING
 */
KeywordCandidate.index({ contentFound: 1});

db.model('KeywordCandidate', KeywordCandidate);

module.exports = KeywordCandidate;


