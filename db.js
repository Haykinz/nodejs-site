
var mongoose	= require('mongoose'),
    config 		= require('./config');

var tryConnect = true;

function getConnect() {
	mongoose.connect(config.get('MONGO:HOST'), config.get('MONGO:NAME'), config.get('MONGO:PORT'), {
		user: config.get('MONGO:USER'),
		pass: config.get('MONGO:PASS')
	});
}

function tryReconnect() {
	getConnect();
	setTimeout(function() {
		if (mongoose.connection.readyState != 1 && mongoose.connection.readyState != 2) {
			console.log("MONGO :: try to connect: %d", mongoose.connection.readyState);
			tryConnect = true;
			tryReconnect();
		}
	}, 10000);
}

mongoose.connection.on('open', function() {
	console.log("MONGO :: connected on :: " + config.get('MONGO:HOST') + ':' + config.get('MONGO:PORT') + '/' + config.get('MONGO:NAME'));
	tryConnect = true;
});


mongoose.connection.on('error', function() {
	if (tryConnect) {
		tryConnect = false;
		console.log("MONGO :: connection fail");
		mongoose.connection.readyState = 0; // force...
		tryReconnect();
	}
});

mongoose.connection.on('close', function() {
	console.log("MONGO :: disconnected");
	mongoose.connection.readyState = 0; // force...
	tryReconnect();
});


process.on('SIGINT', function() {
	console.error("received SIGINT");
	process.exit(0);
});//process.exit.bind(process));

setInterval(function() {
	// console.log('MONGO :: status :: %s :: %d', new Date, mongoose.connection.readyState);
}, 60000);


getConnect();

module.exports = mongoose;