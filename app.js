var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
  
var app = express();
app.listen(8080);
app.use(bodyParser.json());

var routes = require('./routes/index');
var users = require('./routes/users');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// Routes
app.post('/',function(req,res){
 //update view
    
  res.send(req.body);    // echo the result back
  //console.log(req.body);      // your JSON
  var payload = "{" + req.body + ":10}";
  for(var key in payload){
      if(payload[key] == 'reset'){
        initScore();
      }else{
          console.log('score before: ' + score[key]); 
          score[key] = score[key] + payload[key];
          console.log('score after: ' + score[key]); 
      }
  };
   updateClient();  

    res.render('index', function() {

  });
    res.end();
});

// error handlers

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8081);


io.on('connection', function (socket) {
  //socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

var score = { 
      //Classical
      0 : 0, 
      //Jazz: 
      1 : 0, 
      //Rock: 
      2 : 0, 
      //Indie: 
      3 : 0, 
      //HipHop: 
      4 : 0, 
      //EDM: 
      5 : 0      
  };

var updateClient = function(){
    console.log('updateClient');
  io.emit('score', { 
      //Rock
      0 : score[0], 
      //Classical: 
      1 : score[1], 
      //Jazz: 
      2 : score[2], 
      //Indie: 
      3 : score[3], 
      //HipHop: 
      4 : score[4], 
      //EDM: 
      5 : score[5]      
  });
};
var initScore = function(){
    score = { 
      //Rock
      0 : 0, 
      //Classical: 
      1 : 0, 
      //Jazz: 
      2 : 0, 
      //Indie: 
      3 : 0, 
      //HipHop: 
      4 : 0, 
      //EDM: 
      5 : 0      
  };
};


module.exports = app;
