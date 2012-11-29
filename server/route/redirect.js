var config 		= require('../../config'),
        db 		= require('../../db'),
RedirectSchema	= require('../../models/redirect'),
  Redirect 		= db.model('Redirect');

/**
 * Module redirect  
 * next(true|false)
 */
module.exports = function(req, next) {
    if (typeof req._route  == 'object') {
        console.log();
        console.log('REDIRECT :: FROM :: %s', JSON.stringify(req._route, null));
        console.log();
    }
    next(false);
};
// module.exports = function(req, res, next) {
// 	err = null;

//     var query = Redirect.findOne({'countryCode': req._route.domain.countryCode, 'from': req._route.path});
//     query.exec(function(err, _redirect) {
// 		console.log(req._route.path);
//     	if (err) {
//     		next(err);
//     	}
//         if (_redirect) {
//         	res.redirect(_redirect.status, _redirect.to);
//         } else  {
// 			next();
//         }
//     });
// }