var compressor = require('node-minify');


/**
 * JS compress
 */
new compressor.minify({
    type: 'uglifyjs',
    fileIn: [
			'./client/_js/jquery.min.js', 
			'./client/_js/bootstrap.min.js', 
			'./client/_js/jquery-ui-1.8.16.custom.min.js',
			'./client/_js/common.js',
			'./client/_js/google.com.jsapi.js',
			// './client/js/connect.js' // uncoment when it will be needed
	 ],
    fileOut: './client/_js/frutty-mix.js',
    tempPath: './tmp',
    callback: function(err){
    	if (err) {
	        console.error(err);
    	} else {
    		console.log('Compress JS is done!!!');
    	}
    }
});

/**
 * CSS compress
 */
 new compressor.minify({
    type: 'yui-css',
    fileIn: [
			'./client/css/pre-main.css', 
			'./client/css/bootstrap.css', 
			'./client/css/font-awesome.css', 
			'./client/css/bootstrap-responsive.css', 
			'./client/css/jquery-ui-1.8.16.custom.css', 
			'./client/css/main.css', 
			'./client/css/favicons.css', 
	 ],
    fileOut: './client/css/frutty-mix.css',
    tempPath: './tmp',
    callback: function(err){
    	if (err) {
	        console.error(err);
    	} else {
    		console.log('Compress CSS is done!!!');
    	}
    }
});