
var redis	= require('redis'),
    config 	= require('./config'),
    client;

var tryConnect = true;
var readyState = 0;

client = redis.createClient(config.get('REDIS:PORT'), config.get('REDIS:HOST'));
function getConnect() {
}

function tryReconnect() {
	getConnect();
	setTimeout(function() {
		if (readyState != 1) {
			console.log("REDIS :: try to connect: %d", readyState);
			tryConnect = true;
			tryReconnect();
		}
	}, 10000);
}

tryReconnect();


client.on('connect', function() {
	console.log("REDIS :: connected on :: " + config.get('REDIS:HOST') + ':' + config.get('REDIS:PORT'));
	tryConnect = true;
	readyState = 1; // force...
});


client.on('error', function() {
	if (tryConnect) {
		tryConnect = false;
		console.log("REDIS :: connection fail");
		tryReconnect();
	}
});

client.on('end', function() {
	console.log("REDIS :: disconnected");
	readyState = 0; // force...
	tryReconnect();
});


// process.on('SIGINT', function() {
// 	console.error("received SIGINT");
// 	process.exit(0);
// });//process.exit.bind(process));

// setInterval(function() {
// 	// console.log('REDIS :: status :: %s :: %d', new Date, readyState);
// }, 60000);



module.exports = client;