/**
 *
 * clearText info.
 *
 * function (string, stopwords) {
 *    return string
 * }
 *
 *
 * var cleartext = require('./cleartext');
 *
 * text = cleartext('Lorem Ipsum is simply dummy text of the printing and typesetting industry.', ['a', 'b', 'c']);
 *
 */

module.exports = function(string, stopwords) {

	matches = string.toLowerCase()
					.replace("_", " ")
					.match(/\w+/g);

	stopwords.forEach(function(stopword, index){
		matches = deleteItem(matches, stopword);
	})

	return matches;
};

var deleteItem = function(matches, stopword){
	var idx = matches.indexOf(stopword);
	
	if(idx != -1){
		matches.splice(idx, 1);
		matches = deleteItem(matches, stopword);
	}

	return matches;
};