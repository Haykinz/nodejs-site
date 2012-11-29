var path = require('path')
/* 
 * error handling middleware have an arity of 4
 * instead of the typical (req, res, next),
 * otherwise they behave exactly like regular
 * middleware, you may have several of them,
 * in different orders etc.
 *
 * If we were to next() here any remaining non-error-handling
 * middleware would then be executed, or if we next(err) to
 * continue passing the error, only error-handling middleware
 * would remain being executed, however here
 * we simply respond with an error page.
 */
module.exports = function(err, req, res, next){
  // we may use properties of the error object
  // here and next(err) appropriately, or if
  // we possibly recovered from the error, simply next().
  res.status(err.status || 500);
  var error = err.status || '500'

  if (process.env.NODE_ENV == 'production') {
  	console.error(err +"\t"+ req.path);
  	// err = {};	
  }
  // console.log(path.join(req._route.domain.routeType, error));
  res.render( req._route.domain.routeType + "/" +  (err.status || '500') , { error: err });
}