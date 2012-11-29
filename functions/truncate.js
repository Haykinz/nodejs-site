/**
 *
 * Truncate:
 *     function (string, length){
 *	       return trimmed string by length
 *     } 
 *
 * How to use:
 *     var truncate = require('./truncate');
 *     console.log("'" + truncate('test test', 7) + "'");
 *
 * Testing:
 *     mocha -R spec projects/inetgiant.js/test/test_truncate.js
 *
**/



module.exports = function (str, limit) {
	var n = str.indexOf(' ', limit)
	,	m = str.lastIndexOf(' ', limit);

	if ( str == ' ' ){
		return str.substring(0, n).trim();
	} else if ( limit >= str.length ) {
		return str.trim();
	} else {
		return str.substring(0, m).trim();
	};
};

