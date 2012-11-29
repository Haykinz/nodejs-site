/**
 *
 * Translate info.
 *
 * function (in lang, out lang, in string) {
 *    return out string
 * }
 *
 * https://www.googleapis.com/language/translate/v2?key=AIzaSyAmEPkh5b_u9kw7CVPJCEwXZmYSOoKyI9M&q=text&source=en&target=ru
 *
 * var translate  = require('./translate');
 *
 * translate('en', 'ru', 'test', function(outstring){
 *      console.log(outstring);
 * });
 *
 */

var request = require('request'),
    url     = require('url');

module.exports = function(inLang, outLang, inString, cb) {
   return new Translate(inLang, outLang, inString, cb);
};

var Translate = function(inLang, outLang, inString, cb) {
    
    var inLangCode = inLang.split("-");
    var outLangCode = outLang.split("-");

    var query = { 
        key:        'AIzaSyAmEPkh5b_u9kw7CVPJCEwXZmYSOoKyI9M',
        q:          inString,
        target:     outLangCode[0]
    };

    if(inLangCode[0]){
        query.source = inLangCode[0];
    }

    request({
        uri: url.format({ 
            protocol: 'https:',
            host: 'www.googleapis.com',        
            pathname: 'language/translate/v2',
            query: query,
        })
    }, function (err, response, body) {
		
        if(err) {
        
            console.log(err);
        
        } else {

            var json = JSON.parse(body.toString());
            
            if(json.data && json.data.translations[0].detectedSourceLanguage){
                //console.log("[ Detected Source Language: " + json.data.translations[0].detectedSourceLanguage + " ]");                
                cb(json.data.translations[0].translatedText);                
            }
            
            if(json.data){
                cb(json.data.translations[0].translatedText);	
            } else {
                cb(null);
            }
        }
	});
}