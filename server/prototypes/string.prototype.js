var colors = require('colors');

colors.setTheme({
    silly:      'rainbow',
    input:      'grey',
    verbose:    'cyan',
    prompt:     'grey',
    info:       'green',
    data:       'grey',
    help:       'cyan',
    warn:       'yellow',
    debug:      'blue',
    error:      'red'
});

/**
 * Regex strip domain name
 * Extention for string prototype
 * 
 * Example
 *  href: http://myusername:mypassword@test.asdf.com/a/b/c/index.php?test1=5&test2=789#tite
 *  protocol: http://
 *  user: myusername
 *  password: mypassword
 *  subdomain: test.
 *  domain: asdf
 *  domainextension: .com
 *  path: /a/b/c/
 *  file: index
 *  filetype: .php
 *  query: test1=5&test2=789
 *  anchor: #tite
 *
 */

String.prototype.urlParts = function() {
    var loc = this;
    loc = loc.split(/([a-z0-9_\-]{1,5}:\/\/)?(([a-z0-9_\-]{1,}):([a-z0-9_\-]{1,})\@)?((www\.)|([a-z0-9_\-]{1,}\.)+)?([a-z0-9_\-]{3,})((\.[a-z]{2,4})(:(\d{1,5}))?)(\/([a-z0-9_\-]{1,}\/)+)?([a-z0-9_\-]{1,})?(\.[a-z]{2,})?(\?)?(((\&)?[a-z0-9_\-]{1,}(\=[a-z0-9_\-]{1,})?)+)?/g);
    loc.href = this;
    loc.protocol = loc[1];
    loc.user = loc[3];
    loc.password = loc[4];
    loc.subdomain = loc[5];
    loc.domain = loc[8];
    loc.domainextension = loc[10];
    loc.port = loc[12];
    loc.path = loc[13];
    loc.file = loc[15];
    loc.filetype = loc[16];
    loc.query = loc[18];
    loc.anchor = loc[22];

    //return the final object
    return loc;
};

String.prototype.makeSlug = function() {
    var string = this;
    return string.toLowerCase().replace("_", " ").replace(/\W+/ig, "-");
};


/**
 * @limit       int     set length of the string
 * @stopOnDot   bool    stop on dot, by default stop on space (' ')
 * @addDots     bool    add tailing dots ('...')
 */
String.prototype.truncate = function (limit, stopOnDot, addDots) {
    
    var n = this.indexOf(stopOnDot ? '. ' : ' ', limit)
    ,   m = this.lastIndexOf(stopOnDot ? '. ' : ' ', limit);

    if (stopOnDot) {
        n++;
        m++;
    }

    if ( this == ' ' ){
        return this.subthising(0, n).trim();
    } else if ( limit >= this.length ) {
        return this.trim();
    } else {
        var result = this.substring(0, m).trim()
        if (result.length > 0) {
            return result + (addDots ? '...' : '');
            
        } else {
            /**
             * Else dot on the eand of string not found
             * trying to trim string from right to left by next dot.
             */
            var len = m ? m : n;
            for (var i = len; i > 0; i--) {
                result = this.truncate(i, stopOnDot, addDots);
                if (result.length) {
                    return result + (addDots ? '..' : '');
                    break;
                }
            };

        }
    };
};
