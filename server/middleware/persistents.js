var config  = require('../../config'),
     db     = require('../../db');

module.exports = function (req, res, next) {
    var err = null;

    // Check for MongoDB connect
    if (db.connection.readyState != 1 && db.connection.readyState != 2) {
        err = new Error('Ooh, something is broken, sorry about that! We already trying to fix it!');
        err.status = 500;
    }
    
    // TODO should be the Redis checking
    // if (false) {

    // }

    next(err);
}