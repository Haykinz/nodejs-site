var db              = require('../db'),
    config          = require('../config'),

    Schema          = db.Schema,
    ObjectId        = Schema.Types.ObjectId;
                      
                      require('./state'),
                      require('./city');


var User = new Schema({
    hash                    : { type: String, index: { unique: true }},
    email                   : { type: String, lowercase: true },
    password                : { type: String },
    dealerId                : { type: Number }, //old user id
    name                    : { type: String },
    phone                   : { type: String },
    address                 : { type: String },
    state                   : { type: ObjectId, ref: 'State' }, 
    city                    : { type: ObjectId, ref: 'City' },
    zipCode                 : { type: Number },
    newDisclaimer           : { type: String },
    usedDisclaimer          : { type: String },
    owner                   : { type: String },
    userPhoto               : { type: String },
    dateRegistration        : { type: Date, default: Date.now }
}, {
    safe: true 
});

db.model('User', User);

module.exports = User;