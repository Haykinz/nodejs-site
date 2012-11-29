// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// mongoose.connect('localhost', 'testing_11074799');
// mongoose.connection.on('error', function () {
//   console.error(arguments);
// });
              require('coffee-script');
var  db              = require('../db'),
Schema   = db.Schema,
  ObjectId = db.SchemaTypes.ObjectId;


var UserSchema = new Schema({ name: String });
var User = db.model('User', UserSchema);

var PlayerSchema = new Schema({
    user: {type: Schema.ObjectId, ref : 'User'}
  , score : {type : Number, default : 0 }
});
var GameSchema = new Schema({
    players : {type : [PlayerSchema], required : true}
});
var Game = db.model('Game', GameSchema);

db.connection.on('open', function () {
  User.create({ name: 'aaron' }, { name: 'bob' }, function (err, aaron, bob) {
    if (err) return console.error(err.stack||err);

    console.error('aaron', aaron);
    console.error('bob', bob);

    var game = new Game;

    game.players.push({ _id: aaron._id, user: aaron._id, score: 4 });
    game.players.push({ _id: bob._id, user: bob._id, score: 3 });
    console.error('ready to save game', game.players);

    db.set('debug', true);
    game.save(function (err) {
      if (err) return console.error(err.stack||err);

      console.error('saved', game);
      Game.findOne().populate('players.user').exec(function (err, game) {
        if (err) return console.error(err.stack||err);

        console.error('aaron scored %d points', game.players.id(aaron.id).score);

        
          // db.connection.close();
      });
    });
  });
});
