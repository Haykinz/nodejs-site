/**
 * Loading prototypes from current dirrectory
 */

var fs   = require('fs'),
	parh = require('path');


fs.readdir(__dirname, function(err, files) {
	if (files && files.length) {
	    files.forEach(function(file, index) {
	    	var _file = parh.join(__dirname, file);
	        if (fs.existsSync(_file) && __filename.indexOf(file) == -1) {
	            require(_file);
	        }
	    });
	}
});
