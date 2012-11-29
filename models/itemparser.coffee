# model 'item'

db = require('../db')

Schema   = db.Schema
ObjectId = Schema.Types.ObjectId

ItemParser = new Schema({
    name                    : { type: String, index: true},    
    link                    : { type: String, index: true},
    parent                  : { type: ObjectId, ref: 'ItemParser'},
    sub                     : { type: Array},    
    fields                  : { type: Object}

}, { 
    safe: true 
})
 
db.model('ItemParser', ItemParser)

module.exports = ItemParser