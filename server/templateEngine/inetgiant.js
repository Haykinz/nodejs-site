/**
 * Front-end template Helper
 */
		                   require('coffee-script');
              var config = require('../../config'),
		        truncate = require('../../functions/truncate'),
		       validator = require('validator'),
	  		       async = require('async'),
                   redis = require('../../redis'),
                      db = require('../../db'),
                ObjectId = db.Types.ObjectId,
           KeywordSchema = require('../../models/keyword'),
                 Keyword = db.model('Keyword'),
	        ReviewSchema = require('../../models/review'),
	          ItemSchema = require('../../models/item'),
	           Newschema = require('../../models/news'),
	          Vidoechema = require('../../models/video'),
             ChartSchema = require('../../models/chart'),
            RatingSchema = require('../../models/rating'),
     SpecificationSchema = require('../../models/specification'),
SpecificationGroupSchema = require('../../models/specificationGroup'),
	          preCompile = require('./preCompile');
 

module.exports = function(req, cb) {
	
	var slugsArray 	= makeSlugsArrayFromPath(req._route.path);
	
	processKeyword(slugsArray, function(keyword) {
		if (keyword) {

			var _data = {
				name: keyword.name
			};

			var _content = {
				name: keyword.name,
				nameShort: keyword.nameShort,
				template: keyword.template,
				pager: {
					items: 0,
					page: ~~ req._route.page, 
					pages: null
				},

				itemsCount: 0,
				lastReview: '',
				rating: {},
				inIndex: keyword.inIndex ? keyword.inIndex : false,
			};

			if (keyword.lastUpdate) {
				_content.lastUpdate = keyword.lastUpdate.toDateString();
			}

			keyword.aggregators = keyword.aggregators.sort(sortASC);

			async.map(keyword.aggregators, 

				function(nextAggregator, cb){
					walkAggregators(nextAggregator, keyword, req, function(err, doc){
						cb(err, doc);
					});
				},

				function(err, results){
					if (err) {
						console.log(__filename + ":" + err);
					}
					if (results) {
				        for (_i = 0, _len = results.length; _i < _len; _i++) {
				            if (results[_i] !== null) {
				            	var _array = [];
				            	

				            	for (index in results[_i]) {
				            		if (results[_i][index]) {

				            			/**
				            			 * Mapping last review for 'page.lastReview' in 'layout.jade'
				            			 */
				            			// console.log(results[_i][index].style);
				            			if (results[_i][index].style == "list-news") {
				            				_content.lastReview = truncate(results[_i][index]['data'][0]['description'], 70) + "...";
				            			}

				            			/**
				            			 * Mapping keywordRating for 'page.keywordRating' in 'layout.jade'
				            			 */
				            			if (results[_i][index].style == "list-rating") {
				            				var maxRating = 10;
				            				var rating  = results[_i][index]['data'][0]['value'];
				            				var votes = results[_i][index]['data'][0]['votes'];
				            				if (rating && votes) {
					            				_content.rating.full  	= (rating / votes) / 100 * maxRating;
												_content.rating.full  	= _content.rating.full.toFixed(1); // from 5.6676767 -> 5.7
												_content.rating.rest  	= (_content.rating.full % 1);
												_content.rating.round 	= ~~_content.rating.full;
												_content.rating.max 	= maxRating;
												_content.rating.votes 	= votes;
				            				}
				            			}

				            			/**
				            			 * Images analyser, based on and only on "item-list-inetgiant"
				            			 */
				            			if (results[_i][index].style == "item-list-inetgiant" || results[_i][index].style == "item-list-oodle") {
							            	/**
							            	 * Counter for all items
							            	 */
							            	 if (results[_i]['itemsCount']) {

												_data.itemsCount += results[_i]['itemsCount'];

												/**
												 * Items count remapping
												 */
												results[_i][index]['itemsCount'] = results[_i]['itemsCount'];

												/**
												 * Items pager recounting
												 */
												 if (_content.pager.items == null || _content.pager.items < results[_i]['itemsCount']) {
												 	_content.pager.items = results[_i]['itemsCount'];
												 }
							            	 }
				            				

				            				if (results[_i][index].orderImages && results[_i][index].orderImages > 0) {
					            				var element = {};
					            				
					            				/** 
					            				 * We need this loop because 
					            				 * results[_i][index] - is Mongoose Model Instance
					            				 *
					            				 * so just var element = results[_i][index]
					            				 * stiil the same instance  - results[_i][index]
					            				 */
				            					for (field in results[_i][index]) {
				            						element[field] = results[_i][index][field];
				            					}
				            					/**
				            					 * Custom fields
				            					 */ 
												element.style = 'images-previews-inetgiant';
												element.keywordAggregatorId += "-images-list" 

												if (_data[element.orderImages]) {

						            				if (typeof _data[element.orderImages] === 'array') {	
														element.title = 'Photos';
								            			_data[element.orderImages].push(element);

						            				} else if (typeof _data[element.orderImages] === 'object') {
														for (i in element.data) {
															_data[element.orderImages]['data'].push(element.data[i]);
														}
						            				}

						            			} else {
													element.title = 'Photos';
							            			_data[element.orderImages] = element;
						            			}
				            				}
				            			}


				            			if (_data[index]) {

				            				if (typeof _data[index] === 'array') {	
						            			_data[index].push(results[_i][index]);

				            				} else if (typeof _data[index] === 'object') {
				            					if (_data[index].length) {
													for (i in _data[index]) {
						            					_array.push(_data[index][i]);
													}
				            					} else {
				            						_array.push(_data[index]);
				            					}
				            					_array.push(results[_i][index]);
						            			_data[index] = _array;
				            				}
				            			} else {
					            			_data[index] = results[_i][index];
				            			}
				            		}
				            	}
							}
				        }
				        /**
				         * Pre compiling
				         */
						
						_content.pager.pages = ~~ (_content.pager.items / config.get("PAGE:PAGER:LIMIT"));
						if ((_content.pager.items / config.get("PAGE:PAGER:LIMIT")) % 1) {
							_content.pager.pages++;
						} 

						if (_data.itemsCount > 0) {
							_content.itemsCount = _data.itemsCount
						}
						// if (_itemsCount > 0) {
						// 	_content.itemsCount = _itemsCount
						// }

				        for (var key in _data) {
					         var _key =  validator.sanitize(key).toInt();
					 		if (_data[_key] && validator.check(_key).isInt()) {
					        	_content[key] = {};
					        	// _content[key].dataCompiled = preCompile(req, _data, _data[key]).replace(/\t/g, '').replace(/  +/g, '');
					        	_content[key].dataCompiled = preCompile(req, keyword, _data[key]);
				 			}
						}
						cb(_content);
					} else {
						cb(null);
					}
				}
			);
			
		}
	});
}


var walkAggregators = function(nextAggregator, keyword, req, cb) {
	var data = {},
	  _city  = req._route.city
	  _page  = req._route.page,
	  _limit = config.get("PAGE:PAGER:LIMIT"),
	  _skip  = _limit * (_page - 1);

	if (nextAggregator.limit) {
    	_limit = nextAggregator.limit;
		_skip  = _limit * (_page - 1);
	}
	
	if (nextAggregator.__model) {
		var Model;


		if (Model = db.model(nextAggregator.__model)) {

        	if (nextAggregator.__model == 'Item') {

	        	
	        	var query = Model.find({}).populate('city').populate('state');
	        	var count = Model.count({});

        		// IF !city. or www.

        		if (_city === null || _city.slug == "www") {
        			var _count = count
								.where("keywordIds", keyword._id)
								.where("owner", nextAggregator.owner);

		        	var _query = query
								.where("keywordIds", keyword._id)
								.where("owner", nextAggregator.owner)
								.sort("-dateInsert")
								.limit(_limit).skip(_skip);

		        	var _search = {
						"query": {
							"bool": {
								"must": [
									{ "term": {"keywordIds": keyword._id.toString()} },
									{ "term": {"owner": nextAggregator.owner} }
										    
								],
								"must_not": [],
								"should": []
							}
						},
						"from": 0,
						"size": 3,
						"sort": [
							{ "dateInsert" : {"order" : "desc"} }
						],
						"facets": {}
					};


        		// if city.
        		} else {
        			var _count = count
								.where("keywordIds", keyword._id)
								.where("owner", nextAggregator.owner)
								.where("city", _city._id);
								
					var _query = query
								.where("keywordIds", keyword._id)
								.where("owner", nextAggregator.owner)
								.where("city", _city._id)
								.sort("-city")
								.sort("-dateInsert")
								.limit(_limit).skip(_skip);

        		}

    //     		Model.search(_search, function(err, results) {
    //     			if (err) {
    //     				console.error(err);
    //     			} else {
				// 		console.log("SE: " + results.hits.hits.length);
    //     			}
				// });
	        	_count.exec(function(err, cnt) {
	        		if (err) console.error(err);
	        		// cnt = 1;
	        		console.log('count:' + cnt);
	        		
	        		if (cnt > 0) {
	        			// _itemsCount += cnt;
			        	_query.exec(function(err, data) {

			        		console.log('items:' + cnt + " data:" + data.length);

			        		if (data && data.length > 0) {
				        		setData(nextAggregator, data, function (err, doc) {
				        			if (err != null) {
				        				console.error(err);
					        			cb(null, null);
				        			} else {
				        				if (doc) {
						        			doc.itemsCount = cnt;
						        			cb(null, doc);
				        				} else {
						        			cb(null, null);
				        				}
				        			}
				        		})
			        			
			        		} else {
			        			cb(null, null);
			        		}
			        	});
	        		} else {
	        			cb(null, null);
	        		}
	        	});    		

			} else if (nextAggregator.__model == 'Specification') {
				var query = Model.find({});
				var spec;

				if (spec = nextAggregator.runParams.specification) {
		        	SpecificationGroup =  db.model('SpecificationGroup');
	        		SpecificationGroup.findById(nextAggregator.runParams.specificationGroup, function(err, _specificationGroup) {
	        			if (_specificationGroup) {
				        	var _query = query
				        		.select(_specificationGroup.fields.join(" "))
				        		.where("_id").in(spec);

			        		// -- Callback just for 'Specification'
				        	_query.exec(function(err, data) {
				        		var _data = [];
				        		for (index in data) {
		        					_item  = {};

				        			for(i = 0; i < _specificationGroup.fields.length; i++) {
				        				var _field = _specificationGroup.fields[i];

				        				if (data[index][_field]) {
				        					_item[_field] = data[index][_field];
				        				}
				        			}	
				        			_item._id = data[index]._id;
			        				_data[index] = _item;
				        		}

				        		setData(nextAggregator, _data, function (err, doc) {
				        			cb(null, doc);
				        		})
				        	});
	        			} else {
	        				console.error(__filename + " :: ERROR :: No specificationGroup found: " + nextAggregator.runParams.specificationGroup);
		        			cb(null, null);
	        			}
	        		})
				} else {
					cb(null, {});
				}

	        } else if (nextAggregator.__model == 'Chart' || nextAggregator.__model == 'Rating') {
	    		var query = Model.find({});
	        	var _query = query
							.where("keywordIds", keyword._id)
							.where("aggregator", nextAggregator.aggregator)
							.sort("-city");

	        	_query.exec(function(err, data) {
	        		if (data && data.length > 0) {
		        		setData(nextAggregator, data, function (err, doc) {
		        			cb(null, doc);
		        		})
	        		} else {
	        			cb(null, null);
	        		}
	        	});

        	// IF no 'Item', 'Chart', 'Specification' models
        	} else {
	        	// console.log(nextAggregator.__model);
        		var query = Model.find({});
	        	var _query = query
							.where("keywordIds", keyword._id)
							.or([{ "city": _city._id }, { city: null }])
							.sort("dateUpdate")
							.sort("-city")
							// .limit(_limit).skip(_skip);

	        	_query.exec(function(err, data) {

	        		if (data && data.length > 0) {
		        		setData(nextAggregator, data, function (err, doc) {
		        			cb(null, doc);
		        		})
	        		} else {
	        			cb(null, null);
	        		}
	        	});
        	}
		}
	}
}

var setData = function (nextAggregator, data, cb) {
	var doc = {};
    if (data && data.length > 0) {

    	/**
    	 * Removing Items where "city.active === false"
    	 */
    	for (i in data) {
    		if (data[i].city && data[i].city.active === false) {
        		data.splice(i);
    		}
    	}
    	doc[~~ nextAggregator.order] = setDoc(nextAggregator, data)
    	// console.log(doc[nextAggregator.order].order);
        cb(null, doc);
    } else {
    	/*
    	 * degug
    	 *
    	console.log({
    		ERROR: {
        		keywordAggregatorId: nextAggregator._id,
        		aggregator: nextAggregator.aggregator,
        		file: __filename,
        		model: nextAggregator.__model, 
        		reason: "no data returns from DB"
    		}
    	});	
		/**/
        cb(null, null);
    }

}

var setDoc = function (nextAggregator, data) {
	return { 
		keywordAggregatorId: nextAggregator._id,
		aggregator: nextAggregator.aggregator,
		order: ~~ nextAggregator.order,
		title: nextAggregator.title,
		orderImages: nextAggregator.orderImages ? nextAggregator.orderImages : false,
		style: nextAggregator.style,
		urlSource: nextAggregator.urlSource,
		data: data,
		itemsCount: 0
	};
}

var sortASC = function(a, b){
	return (a.order - b.order);
}

var sortDESC = function(a, b){
	return (b.order - a.order);
}


/**
 * Function convert array
 * 	["automobile", "autos-for-sale", "userd"]
 *
 * into 
 *  "automobile/autos-for-sale/userd"
 *  "automobile/autos-for-sale"
 *  "automobile"
 *
 * and tries to find 'keyword' in DB for each slug
 * from longest to shortest 
 */
var processKeyword = function (slugsArray, cb) {

	if (slugsArray instanceof Array) {
	
        var _ref = slugsArray,
        	_a, _slugs = [];

        for (_i = _ref.length, _len = 0; _i >= _len; _i--) {
            _a = _ref.slice(0, _i);
            _slugs.push(_a.join("/"));
        }

        async.mapSeries(_slugs, getKeyword, function(err, results){
        	/**
        	 * return first elament = first found keyword
        	 */
        	cb(results[0]);
		});
	}
}

var makeSlugsArrayFromPath = function(path) {
	var slugsArray 	= path.split('/');
	for (i=0; i < slugsArray.length; i++) {
		if (slugsArray[i] == '') {
			slugsArray.splice(i, 1);
		}
	}
	return slugsArray;
}

var getKeyword = function(slug, cb) {
	var query = Keyword.findOne({slug: slug, active: true})
	
	query.exec(function(err, keyword) {
		cb(null, keyword);
	})
}
