/**
 *
 * getUnique:
 *     function (array){
 *	       return unique Array
 *     } 
 *
 * How to use:
 *     var getunique = require('./getunique'),
 * 	       array = [1,2,4,5,3,4,7];
 *     console.log(getunique(array));
 *
 * Testing:
 *     mocha -R spec projects/inetgiant.js/test/test_getunique.js
 *
**/



module.exports = function(array){
   var u = {}, a = [];
   for(var i = 0, l = array.length; i < l; ++i){
      if(u.hasOwnProperty(array[i])) {
         continue;
      }
      a.push(array[i]);
      u[array[i]] = 1;
   }
   return a;
};


