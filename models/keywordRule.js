// model 'news'

var db              = require('../db'),
    config          = require('../config'),

    Schema          = db.Schema,
    ObjectId        = Schema.Types.ObjectId;


/**

steps : [
    { 
        generic: {
            keyword: 2,                         // * 1 or 2
            level: 2,                           // * 2 means only base cathegory
            filter: ["for sale", "cost"],       //   depends on which "generic.keyword" is using, generic.keyword[0] OR generic.keyword[1]
            exclude: ["new model", "cheap"],    //   because diesel appears in specific car model
            skipIdsMatch: true,                 //   skip keywordIds match between rule steps, helpfull when rule use with specific Specification record
                                                //   for example: [audi,a4,3.0 tdi quattro,2006,sedan,6 cylinders, ,4wd,manual,5 seater,4] doesn't have any keywordId
            replace: "%s TEXT"
        } 
    },

    { 
        specification: {
            filter: ["model_make_id", "model_name", "model_trim", "model_year", "model_body_style", "model_engine_num_cyl", "model_engine_fuel", "model_drive", "model_transmission_type", "model_seats", "model_doors"],
            order : ["model_make_id", "model_name", "model_trim", "model_year", "model_body_style", "model_engine_num_cyl", "model_engine_fuel", "model_drive", "model_transmission_type", "model_seats", "model_doors"],
            replace: {
                model_seats: "%s seater",
                model_doors: "%s doors",
                model_engine_num_cyl: "%s cylinders",
            },
            showOnly: {
                model_engine_fuel: ["diesel"]
            }           
        },
    },

    { 
        specificationAbstract: {
            any: 1,
            filter: ["model_autospec1"],
            replace: {
                model_autospec1: "with %s",
            }
            parentsLookUp: false,
        }
    },

    { 
        subCategory: {
            level: 3,
        } 
    },
],


    [ 
        // MUST
        { model_make_id: 'audi' },
        { model_name: 'A4' },
        { model_trim: '3.0 TDI Quattro' },
        { model_year: 2006 },

        // SHOULD
        { generic_1: 'new' },
        { model_body_style: 'Sedan' },
        { model_engine_num_cyl: '6 cylinders' },
        { model_engine_fuel: null },
        { model_drive: '4WD' },
        { model_transmission_type: 'Manual' },
        { model_seats: '5 seater' },
        { model_doors: '4 doors' },
        { model_color: 'Beige' },
        { generic_2: 'cost' } 
    ]
search: {
    must: ["model_make_id", "model_name", "model_year", "model_trim"],
    must_not: []
    should: ["generic_1", "model_body_style", "model_engine_num_cyl", "model_engine_fuel", "model_drive", "model_transmission_type", "model_seats", "model_doors", "model_color", "generic_2"],
    minimum_number_should_match: 0
},

countryCode: ["us", "es"],

keywordUniqMatchInRule : [
    "model_make_display",
    "model_name",
    "model_trim",
    "model_year",
    "model_color"
]

keywordUniqMatchOutRule : [
    "model_make_display",
    "model_name",
    "model_trim",
    "model_year",
    "model_exterior_color",
]





*/


var keywordRule = new Schema({   
    description                             : { type: String },   
    keywordId                               : { type: ObjectId, index: true },
    baseKeywordIds                          : { type: Array}, // For Serach:   [ObjectId, ObjectId. -""-, ]
    countryCode                             : { type: Array }, //  ["us"]

    steps                                   : { type: Array },

    keywordUniqMatchInRule                  : { type: Array }, // Values which should be represented only once
    keywordUniqMatchOutRule                 : { type: Array }, // Values which should be represented only once

    keywordMakeNameRule                     : { type: Array },
    keywordMakeNameShortRule                : { type: Array },
    keywordMakeNameTransform                : { 
        cap                                 : { type: Array },
        upper                               : { type: Array },
        lower                               : { type: Array },
    },

    contentSearchPriority                   : { type: Number }, // Pioryty for content search in Elastic Serach

    search: {
        item: {
            must                            : { type: Array },
            must_not                        : { type: Array },
            should                          : { type: Array },
            minimum_number_should_match     : { type: Number },
        },
        news: {
            must                            : { type: Array },
            must_not                        : { type: Array },
            should                          : { type: Array },
            minimum_number_should_match     : { type: Number },
        },
        review: {
            must                            : { type: Array },
            must_not                        : { type: Array },
            should                          : { type: Array },
            minimum_number_should_match     : { type: Number },
        }                
    }


}, { 
    safe: true 
});

db.model('KeywordRule', keywordRule);

module.exports = keywordRule;


