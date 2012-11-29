/**
 *
 * stripTags:
 *     function (input, allowed){
 *	       return clean string
 *     } 
 *
 * How to use:
 *     var striptags = require('./striptags'),
 * 	       input = "<p>Kevin</p> <b>van</b> <i>Zonneveld</i>",
 * 		   allowed = "<i><b>";
 *     console.log(striptags(input, allowed));
 *
 * Testing:
 *     mocha -R spec projects/inetgiant.js/test/test_striptags.js
 *
**/



module.exports = function(input, allowed) {
    
    // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); 

    var tags 				= /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags 	= /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;

    if (typeof input == 'string') {
	    return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
	        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
	    });
    } else {
    	return null;
    }
};