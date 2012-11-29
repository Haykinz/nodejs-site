var config  = require('../../config'),
     i18n   = require('i18n');


/**
 * Prepeare
 *     res.cookie.lang

 * depends on
 *     req._route.domain.langCode
 */
module.exports = function (req, res, next) {

    if (req.session && req.session.uid) {
        req.lang = req.session.uid.lang;

    } else if (req.cookies && req.cookies.lang) {
        req.lang = req.cookies.lang;

    } else {

        // var alang = typeof req.headers['accept-language'] != "undefined" ? req.headers['accept-language'].substr(0,2) : null;
        var alang = typeof req._route.domain.langCode != "undefined" ? req._route.domain.langCode : (typeof req.headers['accept-language'] != "undefined" ? req.headers['accept-language'].substr(0,2) : null);
        res.cookie('lang', alang);
        
        // var ipinfows = ipinfo.getInstance();

        // ipinfows.getInfo(req.connection.remoteAddress, function (err,data) {

        //     if (err) {
        //         req.lang = alang;
        //         res.cookie('lang', alang);
        //     } else if (data && data.error) {
        //         req.lang = alang;
        //         res.cookie('lang', alang);
        //     } else {


        //         req.lang = data.lang.toLowerCase();

        //         for (i in countryLangs) {
        //             if (countryLangs[i].indexOf(data.lang) != -1) {
        //                 req.lang = i;
        //             }
        //         }

        //         if (alang != req.lang) {
        //             req.langdifference = alang;
        //         }
        //         res.cookie('lang', req.lang);
        //     }
        //     next();
        // });
    }
    i18n.setLocale(req.cookies.lang);
    next();
}