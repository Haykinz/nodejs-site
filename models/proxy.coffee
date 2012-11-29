# model 'city'

db = require('../db')

Schema 	 = db.Schema
ObjectId = Schema.Types.ObjectId

Proxy = new Schema({
	name	        : { type: String, index: { unique: true }},

	auth			: { 
		login		: { type: String},
		password	: { type: String}
	},
	counter     	: { type: Number, index: true},
	active      	: { type: Boolean, index: true}
}, { 
	safe: true 
});
 
db.model('Proxy', Proxy)

module.exports = Proxy