/* 
 * error handling middleware have an arity of 4
 * instead of the typical (req, res, next),
 * otherwise they behave exactly like regular
 * middleware, you may have several of them,
 * in different orders etc.
 */
module.exports = function (req, res, next) {
	res.status(404);
  	
	// respond with html page
	if (req.accepts('html')) {
		res.render(req._route.domain.routeType + '/404', { url: req.url });
		return;
	}

	// respond with json
	if (req.accepts('json')) {
		res.send({ error: 'Not found' });
		return;
	}

	// default to plain-text. send()
	res.type('txt').send('Not found');
}