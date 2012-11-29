/**
 * Pre compile Module
 */

		              require('coffee-script');
var 		 config = require('../../config'),
			   jade = require('jade'),

	  		  fs 	= require('fs'),
	  		  path 	= require('path'),
	  		  async = require('async'),
	  		  i18n  = require('i18n');


module.exports = function(req, keyword, content) {
	if (content) {
		var compiledHTML;
		
		// if single content
		if (!content.length) {

			// title
			compiledHTML  = compile("title", content, keyword, req);
			
			// content
			compiledHTML += compile(content.style, content.data, keyword, req);


		// if array of documents (tab format)
		} else if (content.length > 1) {

			// title
			if (content[0].style == "item-list-inetgiant" || content[0].style == "item-list-oodle") {
				var _title = content[0].title;

				// content[0].title = i18n.__('Inetgiant - One marketplace - All classified ads (%s)', (keyword.itemsCount) ? keyword.itemsCount : '');
				content[0].title = i18n.__('Inetgiant - One marketplace - All classified ads', (keyword.itemsCount) ? keyword.itemsCount : '');

				compiledHTML  = compile("title", content[0], keyword, req);
				content[0].title = _title;
			} else {
				compiledHTML  = compile("title", content[0], keyword, req);
			}


			compiledHTML += compile('tab/labels', content, keyword, req);

			for (_i = 0, _len = content.length; _i < _len; _i++) {
				if (content[_i].data) {
					content[_i].dataTAB = compile(content[_i].style, content[_i].data, keyword, req)
				}
			}

			compiledHTML += compile('tab/content', content, keyword, req);
		}
		return compiledHTML;
	}
}

/**
 *
 * @param templateFilename string - name of template file, ex. 'title' w/o '.jade'
 * @param templateData object - object with certain template data like Items, Reviews, News etc.
 * @@param contentData object - onject with keyword data (name, title, etc.)
 */
var compile = function (templateFilename, templateData, keywordData, req) {
    var tplFile = path.join(config.get("SERVER:VIEWS"), req._route.domain.routeType, "formats/", templateFilename + ".jade");

    if (typeof templateFilename !== "undefined") {
		if (fs.existsSync(tplFile)) {
			tpl = fs.readFileSync(tplFile, 'utf8');
			tpl = jade.compile(tpl, { pretty: true, filename: tplFile });
				
			var output =  tpl({
				data: templateData, 
				server: req._route, 
				keyword: keywordData
			});
			return (output);
		} else {
			console.error("%s :: Can't find template file '%s'", __filename, templateFilename);
		}
    }
}