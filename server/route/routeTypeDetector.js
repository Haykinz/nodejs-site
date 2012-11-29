var config 			= require('../../config'),
        db 			= require('../../db'),
        redis 		= require('../../redis'),
        redirect    = require('./redirect'),
        i18n    	= require('i18n'),
CitySchema 			= require('../../models/city'),
      City 			= db.model('City');

/**
 * Module detect route type, examples:
 *   'inetgiant'
 *   'anuncios360' 
 *
 *  REDIRECT MODEL
 *  if (_city) {
 *      if (detectSlugType()) {
 *	       req._route.slugType = [TYPE['item', 'keyword', 'redirect']
 *	       next()
 *      } else {
 *	       redirect(req)
 *      }
 *  } else {
 *      redirect(req)
 *  }
 */
module.exports = function(req, res, next) {

	// Determine routeType = ['inetgiant', 'anuncios360']
	if (req._route.domain.routeType == 'inetgiant') {

		// "inetgiant" : "us" : "city" : "www"
		var redisCityKey = req._route.domain.routeType + ":" + req._route.domain.countryCode + ":city:" + req._route.subdomain;

		// Lookup in Redis
		redis.get(redisCityKey, function(err, r_city) {
			if (err) {
				next(throwError(err, 502));
			} else {
				if (r_city) {
		            req._route.city = JSON.parse(r_city);
					next();
				} else {
					// If nothing in in Redis,
					// lookup in MongoDB
				    var query = City.findOne({'slug': req._route.subdomain, 'countryCode': req._route.domain.countryCode}).populate('state');
				    query.exec(function(err, m_city) {
				    	if (err) {
				    		next(throwError(err, 502));
				    	} else {
					        if (m_city) {
					        	m_city = m_city.toObject()

					        	redis.set(redisCityKey, JSON.stringify(m_city));

					            req._route.city = m_city;
								next();
					        } else {
					        	redirect(req, function(isRedirect) {
					        		if (isRedirect) {
					        			// DO something with redirect
					        			// isRedirect.sould(true);
					        		} else {
										next(throwError(i18n.__('Page not found! (%s)', req._route.subdomain), 404));
					        		}
					        	});
					        }
				    	}
				    });
				}
			}
		});
	} else if (req._route.domain.routeType == 'anuncios360') {
		// 'anuncios360 : brasil : city : www'
		// var redisCityKey = req._route.domain.routeType + ":" + req._route.domain.countryCode + ":city:" + req._route.subdomain;
        req._route.city = {
        	slug: 'www'
        }
		next();
	}
}

var detectSlugType = function (req, cb) {

}

var throwError = function (message, status) {
	if (status == null) status = 404;
	err = null;
	err = new Error(message);
	err.status = status;	
	return err;
}