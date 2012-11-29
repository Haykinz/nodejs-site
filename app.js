/*
 * App run here =)
 */

require('jade');

var config              = require('./config'),
  express               = require('express'),
  http                  = require('http'),
  fs                    = require('fs'),
  path                  = require('path'),

  redis                 = require('./redis'),
  gzip                  = require('connect-gzip'),
  RedisStore            = require('connect-redis')(express),
  app                   = express(),
  server                = http.createServer(app),
  io                    = require('socket.io').listen(server),
  SessionSockets        = require('session.socket.io'),

  cookieParser          = express.cookieParser(config.get('SERVER:COOKIE_SECRET')),
  sessionStore          = new RedisStore( {client: redis, prefix: 'sessions:'} ),
  sessionSockets        = new SessionSockets(io, sessionStore, cookieParser);

  i18n                  = require('i18n'),

  _persistents          = require('./server/middleware/persistents'),
  _entry                = require('./server/middleware/entry'),
  _cookie               = require('./server/middleware/cookie'),

  _routeTypeDetector    = require('./server/route/routeTypeDetector'),
  _errorHandler         = require('./server/route/errorHandler'),
  _errorSetter          = require('./server/route/errorSetter'),

  _templateEngineLoader = require('./server/templateEngine/loader'),

  cluster   = require('cluster');
  numCPUs   = require('os').cpus().length;
  
/**
 * Loading prototypes
 */
require('./server/prototypes/loader');


/**
 * App configurations
 */
app.configure('development', function(){
    console.log('\nServer set in Dev environment!');

    app.enable('verbose errors');
    app.use(express.static(__dirname + '/client'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  console.log('\nServer set in Production environment!');

  config.use('file', { file: path.join(__dirname, 'configs/production.json') });

  var oneYear = 31557600000;
  var oneDay  = 86400000;
  var oneHour = 3600000;
  
  app.use(gzip.staticGzip(__dirname + '/client', { maxAge: oneHour }));
  app.use(express.errorHandler());
});

app.configure(function(){
    
    i18n.configure({
        locales:['en', 'de'],
        directory: './locales',
        extension: '.json',
        register: global, // where to register __() and __n() to, might be "global" if you know what you are doing
        updateFiles: false
    });

    app.enable('trust proxy');

    app.set('views', config.get("SERVER:VIEWS"));
    app.set('view engine', 'jade');
    app.set('view options', {layout: 'layout'});

    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.methodOverride());
    
    app.use(express.bodyParser());
    app.use(cookieParser);
    app.use(express.session({ store: sessionStore }));


    // app.use(express.cookieParser({
    //     secret: "sessid"
    // }));


    app.use(gzip.gzip());
    app.use(i18n.init);

    app.use(_persistents);
    app.use(_entry);
    app.use(_cookie);
    
    app.use(_routeTypeDetector);
    app.use(_templateEngineLoader);
    
    /** 
     * "app.router" positions our routes 
     * above the middleware defined below,
     * this means that Express will attempt
     * to match & call routes _before_ continuing
     * on, at which point we assume it's a 404 because
     * no route has handled the request.
     */
    app.use(app.router);

    /**
     * Error habding
     * the error handler is strategically
     * placed *below* the app.router; if it
     * were above it would not receive errors
     * from app.get() etc 
     */
    app.use(_errorHandler);
    app.use(_errorSetter);
});

//app.get('/addetails', function(req, res){
//    
//    res.render('addetails', {
//        server: "",
//        content: ""
//    });
//})

/**
 * App router
 */
app.get('*', function(req, res){
    // req.session.user = 'Roma'
  // console.log(redis.get('*', function(err, data){
  //   console.log(data);
  // }));
      // console.log(req._route.content);
      res.render(req._route.content.template, {
          server: req._route,
          content: req._route.content
      });
});

app.post('/user/login', function(req, res){
    console.log(req.body);

    res.render(req._route.content.template, {
        server: req._route,
        content: req._route.content
    });
})

/**
 * Socket stuff
 */
// io.sockets.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });

sessionSockets.on('connection', function (err, socket, session) {
    if (err) {
        console.error(err);

    } else {
        // session.user = 'Max';
        // console.log(session);
    }
    // socket.emit('news', { hello: 'world' });
    // socket.on('my other event', function (data) {
    //     console.log(data);
    // });
});


/**
 * App Launcher under Cluster
 */

var appStart = function (showLog) {
  server.listen(config.get("SERVER:PORT"), function(){
    if (showLog === true) {
      console.log('Server run on http://localhost:' + config.get("SERVER:PORT"));
    }
  });
}

if (config.get("cluster")) {
    if (cluster.isMaster) {

    // Fork workers.
    for (var i = 0; i < numCPUs + 1; i++) {
      cluster.fork();
    }

    cluster.on('exit', function(worker, code, signal) {
      console.log("worker " + worker.process.pid + " died");
      if( signal ) {
        console.log("worker " + worker.process.pid + " was killed by signal: "+signal);
      } else if( code !== 0 ) {
        console.log("worker " + worker.process.pid + " exited with error code: "+code);
      } else {
        console.log("worker " + worker.process.pid + " - success exit!");
      }
    });


    cluster.on('online', function(worker, code, signal) {
      console.log('worker ' + worker.process.pid + ' online on http://localhost:' + config.get("SERVER:PORT"));
    });

    } else {
        appStart(false);
    }
 } else {
    appStart(true);
 }