var  	   fs = require('fs'),
        redis = require('../../redis'),
   	     path = require('path'),
     	 i18n = require('i18n'),

           db = require('../../db'),
     // ObjectId = db.Types.ObjectId,
   ItemSchema = require('../../models/item'),
      	 Item = db.model('Item'),
KeywordSchema = require('../../models/keyword'),
      Keyword = db.model('Keyword');


/**
 *	req._route = { 
 *		subdomain: 'www',
 *	  	path: 'automobiles/autos-for-sale',
 *	  	protocol: 'http',
 *	  	domain: { 
 			name: 'giant.com',
 *	     	title: 'iNetGiant',
 *	     	countryCode: 'us',
 *	     	langCode: 'en',
 *	     	routeType: 'inetgiant' 
 * 		},
 *	  	host: 'giant.com',
 *	  	address: 'http://giant.com',
 *	  	city: {
 *		   	_id: '50105ee28f0fc6ee18000001',
 *		     active: 'true',
 *	    	 countryCode: 'us',
 *		     idOld: '0',
 *		     major: 'false',
 *	    	 slug: 'www'
 *		} 
 *  }
 */
module.exports = function(req, res, next) {
	
	// console.log(req._route);

	if (req._route.domain.routeType == 'inetgiant' || req._route.domain.routeType == 'anuncios360') {

		// Item    :: "inetgiant" : "/automobiles/autos-for-sale/audi-s6-2010"
		// Keyword :: "inetgiant" : "/automobiles/autos-for-sale/1998-mitsubishi-eclipse-gst-montrose-sd-6813269"
		var redisSlugKey = req._route.domain.routeType + ":" + req._route.domain.countryCode + ":slug:" + req._route.path + ":" + req._route.city.slug.toString() + ":" + req._route.page;

		// template file defenition
		var tamplateFile = path.join(__dirname, req._route.domain.routeType + ".js");

		/**
		 * Lookup slug in Redis
		 */
		redis.get(redisSlugKey, function(err, content) {
			if (err) {
				next(throwError(err, 502));
			} else {
				if (content) {
					req._route.content = JSON.parse(content);
					next();
				} else {
					// IF nothing in Redis
					// lookup in MongoDB.items
				    // Item.findOne({'countryCode': req._route.domain.countryCode, 'city': req._route.city._id, 'slug': req._route.path}).exec(function(err, item) {
				    Item.findOne({'countryCode': req._route.domain.countryCode, 'city': req._route.city._id, 'slug': req._route.path}).populate('userId').populate('state').populate('city').exec(function(err, item) {
						if (err) {
							next(throwError(err, 502));
						} else {
							if (item) {

								req._route.content 				= item.toObject();
								req._route.content.template 	= req._route.domain.routeType + "/item-page";
								req._route.content.type     	= "item";

								/**
								 * BREADCRUMBS
								 */
								var _dimainName = "www." + req._route.domain.name
								req._route.content.breadcrumbs 	= [{name: req._route.domain.countryName, slug: _dimainName}];

								if (item.keywordIds && item.keywordIds[0]) {
									Keyword.findById(item.keywordIds[0], {"name": 1, "slug": 1, "path": 1}).exec(function(err, keyword) {
										if (err) console.error(err);
										if (keyword) {
											keyword.getAnsestors(function(err, parents) {
												for (var i = 0; i < parents.length; i++) {
													req._route.content.breadcrumbs.push({name: parents[i]["name"], slug: path.join(_dimainName, parents[i]["slug"])})
												};
												// base keyword name & slug
												req._route.content.breadcrumbs.push({name: keyword.name, slug: path.join(_dimainName, keyword.slug)})

												// ad's name & slug
												req._route.content.breadcrumbs.push({name: item.title, slug: path.join(item.city.slug + "." + req._route.domain.name, item.slug)})
												next();
											});
										} else {
											req._route.content.breadcrumbs.push({name: item.title, slug: path.join(item.city.slug + "." + req._route.domain.name, item.slug)})
											next();
										}
									});
								} else {
									req._route.content.breadcrumbs.push({name: item.title, slug: path.join(item.city.slug + "." + req._route.domain.name, item.slug)})
									next();

								}
							} else {

							    Keyword.findOne({'countryCode': req._route.domain.countryCode, 'slug': req._route.path}).exec(function(err, keyword) {
							    	if (err) {
										next(throwError(err, 502));
									} else {
										if (keyword && keyword.active) {
											if (fs.existsSync(tamplateFile)) {
												// var loader = require(tamplateFile);
												var loader = require('./inetgiant.js');
												loader(req, function(content){

													req._route.content 	= content;
													req._route.content.type 		= "keyword";
													req._route.content.template 	= req._route.domain.routeType + "/keyword-page/" + content.template;

													/**
													 * BREADCRUMBS
													 */
													var _dimainName = "www." + req._route.domain.name
													req._route.content.breadcrumbs 	= [{name: req._route.domain.countryName, slug: _dimainName}];
													keyword.getAnsestors(function(err, parents) {
														for (var i = 0; i < parents.length; i++) {
															req._route.content.breadcrumbs.push({name: parents[i]["name"], slug: path.join(_dimainName, parents[i]["slug"])})
														};
														// base keyword name & slug
														req._route.content.breadcrumbs.push({name: keyword.name, slug: path.join(_dimainName, keyword.slug)})
														next();
													});

													/**
													 * Set redis cache
													 */
													// redis.set(redisSlugKey, JSON.stringify(content));
													

													// next();
												})
											} else {
										        console.error("Template not found :: " + tamplateFile);
										        next(throwError(i18n._('Page not found!'), 404));
											}


										} else {
											next(throwError(i18n.__('Page not found or inactive!'), 404));
										}
									}
								});
							}
						}
					});
				}
			}
		});

	// } else if (req._route.domain.routeType == 'anuncios360') {
	// 	console.log(req._route);
	} else {
		next(throwError(i18n._('Page not found!') + " - wrong 'req._route.domain.routeType'", 502));
	}

		// var tamplate = path.join(__dirname, req._route.domain.routeType + ".js");
		// if (fs.existsSync(tamplate)) {
		// 	// var loader = require(tamplate);
		// 	var loader = require('./inetgiant.js');
		// 	loader(req, function(content){
		// 		req._route.content = content;
		// 		next();
		// 	})
		// } else {
	 //        console.error("Template not found :: " + tamplate);
	 //        next(throwError(i18n._('Page not found!'), 404));
		// }
}

var throwError = function (message, status) {
	if (status == null) status = 404;
	err = null;
	err = new Error(message);
	err.status = status;	
	return err;
}