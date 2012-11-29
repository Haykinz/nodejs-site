var    config = require('../../config'),
		i18n  = require('i18n'),
	validator = require('validator');

/**
 * Prepeare 
 *	req._route = {
 *		subdomain: 'www',
 * 		path: '/automobiles/autos-for-sale/audi-s6-2010',
 *		protocol: 'http',
 *		domain: { 
 * 			name: 'giant.com',
 *    		title: 'iNetGiant',
 *    		countryCode: 'us',
 *    		langCode: 'en',
 *    		routeType: 'inetgiant' 
 *   	},
 * 		host: 'giant.com' }
 * 	}
 */
module.exports = function(req, res, next) {

	req._route 				= {};
	req._route.subdomain  	= req.subdomains[0];
	req._route.protocol 	= req.protocol;

	var domain = getDomain(req.host);

	if (req.subdomains[0] == '' || !req.subdomains.length) {
		var _redirect = req.protocol + "://www." + domain.name + ( req.path == '/' ? '' : req.path) ;
		res.redirect(301, _redirect);
		res.end();

	} else if (req.subdomains.length > 1) {
		next(throwError(i18n.__('Page not found!'), 404));

	} else {
		if (domain) {

			/**
			 * Pager detecter
			 * 	[ 'page-1',
		  	 * 	   '1',
		     *      index: 27,
		     *      input: 'automobiles/autos-for-sale/page-1' 
		     *  ]
			 */
			req._route.path     = validator.sanitize(req.path).trim('/');
			var _page 			= req._route.path.match(/page-(\d+)(?![\s\S])/);
			if (_page) {
				req._route.path = req._route.path.replace(/\/page-(\d+)(?![\s\S])/, '');

				if (_page[1] == 0) {
					next(throwError(i18n.__('Page not found!'), 404));

				} else if (_page[1] != 0 && _page[1] > 1) {
					req._route.page = _page[1];

				} else if (_page[1] == 1) {
					res.redirect(301, req._route.path);
					res.end();
				}

			} else {
				req._route.page = 1;
			}

			// console.log(req._route);

			if (req._route.page) {
				req._route.domain = domain;
				req._route.host   = domain.name;
				req._route.address = getAddress(req);
				next();
			}
		} else {
			next(throwError(i18n.__('Page not found!'), 404));
		}
	}



};

var throwError = function (message, status) {
	if (status == null) status = 404;
	err = null;
	err = new Error(message);
	err.status = status;	
	return err;
}

function getAddress (req) {
	var address = req._route.protocol + "://" + req._route.subdomain + "." + req._route.domain.name,
	    port = config.get("SERVER:PORT");
	if ( port !== 80 ) {
		address += ":" + port 
	}
	return address;
};

function getDomain (host, callback) {
    var domain = null,
       domains = config.get("DOMAINS");

    for (i = 0, len = domains.length; i < len; i++) {
        _dname = domains[i].name;
        var rest = host.split(_dname);

        /**
         * IF domain in allowed domains list
         */
        if (rest.length >= 2 && rest[0].substr(-1) == ".") {
            domain = domains[i];
            
        // for non www. requests
        } else if (rest.length == 2 && rest == ",") {
            domain = domains[i];
        }
    }
    return domain;
};
