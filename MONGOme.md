# Moving data between tables

use inetgiant3

var _news = db.news.find(
	{
		$or: [
			{owner: /catchannel/ig},
		]
	}
)


use inetgiant5
for (var i = 0; i < _news.length(); i++) {
	db.news.insert(_news[i]);
};


for (var i = 0; i < _news.length(); i++) {
	db.news.remove(_news[i]);
};


# Assign the specs for animals

use inetgiant3
var _spec = db.specifications.find()
var _counter = 57430

use inetgiant2
for (var i = 0; i < _spec.length(); i++) { 
	_spec[i]["model_id"] = _counter,
	db.specifications.insert(_spec[i]) 
	_counter++;
}




/**
 * Grouping by keywordcandidates.contentFound
 */
 db.keywordcandidates.aggregate({$match: {ruleId: ObjectId("50a15d70f7989e0a10000000")}}, {$group: {_id: {news: "$contentFound.news", reviews: "$contentFound.reviews", items: "$contentFound.items"}, count: {$sum: 1}} }  )


/**
 * Assing the specs for keywords
 */
db.keywords.find({ruleId: ObjectId("50a15d70f7989e0a10000000")}).forEach(function(_keyword){ 
	for (i=0; i < _keyword.aggregators.length; i++) { 
		if (_keyword.aggregators[i]['__model'] == "News") { 
			_name = _keyword.aggregators[i]['runParams']['q']['must'][0]; 
		}
	} 
 	_specs = db.specifications.find({pet_breed: { $regex: _name, $options: 'i' }}, {_id: 1});
 	print(_specs)

})

 	for (i=0; i < _keyword.aggregators.length; i++) {
 		if (_keyword.aggregators[i]['__model'] == "Specification") {
 		}
 	}
			_keyword.aggregators[i]['runParams']['specification'] = _specs
			print(_keyword.aggregators[i]['runParams']['specification'])


 		: "Specification"





views = db.gamodel0.aggregate({$skip: 0}, {$limit: 100000}, {$group: {_id: "$slug", views: {$sum: "$visitors"}}})
for (i=0; i < views.result.length; i++) { db.gastats.update({_id: views.result[i]["_id"]}, { $inc: {views: views.result[i]['views']}}, {upsert: true})  }


var end = new Date(2012, 4, 1);

db.gamodel0.aggregate( {$match: {date: {$gt: end}}}, {$skip: 0}, {$limit: 100000}, {$group: {_id: "$slug", views: {$sum: "$visitors"}}}).result.forEach(function(doc){ 
	db.gastats2.update({_id: doc._id}, { $inc: {views: doc.views}}, {upsert: true})
})
	printjson(doc)

var test = db.gamodels.aggregate( {$match: {date: {$gt: end}}}, {$group: {_id: "$slug", views: {$sum: "$visitors"}}});
for (i=0; i < test.result.length; i++) { db.gastats2.update({_id: test.result[i]["_id"]}, { $inc: {views: test.result[i]['views']}}, {upsert: true})  }




/**
 * Remamer for plural breeds "Afghan Hounds"
 *                           "Afghan Hound"
 */

db.reviews.aggregate(
	{ $match: { $or: [ {owner: "reviewcentre.com"}, {owner: "web.hoflin.com"} ] } }, 
	{ $group: { _id: "$hiddenText", count: {$sum: 1}} }, 
	{ $sort: {_id : 1}}
).result.forEach(function(doc){
	print(doc._id + "\t" + doc.count)
})

db.reviews.find({ hiddenText: {$regex: /s$/i}, $or: [ {owner: "reviewcentre.com"}, {owner: "web.hoflin.com"} ] }).forEach(function(doc){
	if (doc.hiddenText.slice(-1) == 's') {
		doc.hiddenText = doc.hiddenText.slice(0, doc.hiddenText.length-1);
		print(doc._id + "\t" + doc.hiddenText);
		db.reviews.save(doc);
	}
})

for (var i = 0; i < _reviews.length(); i++) {
	db.reviews.insert(_news[i]);
};