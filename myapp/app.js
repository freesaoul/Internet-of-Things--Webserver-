var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var users = require('./routes/user');
var leds = require('./routes/leds');
var gateways = require('./routes/gateways');
var deviceControllers = require('./routes/DeviceController');

var orm = require('orm');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Connect to mysql db by usin orm and express
app.use(orm.express("mysql://root:21529f@localhost/iot", {
    define: function (db, models, next) {
        db.load("./model/models.js", function(error) {
            if (error)
                throw error;
            orm.settings.sey("connection.debug", true);
            db.sync();
        });
        next();
    }
}));

//Function authentification (use express BasicAuth)
var auth = function(req, res, next)   
{
     express.basicAuth(function(user, pass, callback) {
        req.db.models.user.find({
            "userName":user,
            "password":pass
        }, function(err, users)
        {
            console.log("Count users: " + users.length);
            var result = (users.length > 0);
            req.authUser = users[0];
            callback(null /* error */, result);
        });
    })(req, res, next);
}

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Authorization");
    next();
});

//default routes
app.get('/', routes.index);
app.get('/users', users.list);

//Leds routes
app.get('/Gateway/:GATEWAY_ID/DeviceController/:DEVICECONTROLLER_ID/leds/read', auth, leds.readAll);
app.get('/Gateway/:GATEWAY_ID/DeviceController/:DEVICECONTROLLER_ID/Led/:IDLED/read', auth, leds.readOne);

//Device Controller routes
app.get('/Gateway/:GATEWAY_ID/DeviceControllers/read', auth, deviceControllers.readAll);
app.get('/Gateway/:GATEWAY_ID/DeviceController/:DEVICECONTROLLER_ID/read', auth, deviceControllers.readOne);

//Gateway routes
app.get('/Gateways/read', auth, gateways.readAll);
app.get('/Gateway/:GATEWAY_ID/read', auth, gateways.readOne);
app.post('/Gateway/add', auth, gateways.add);

//User routes
app.post('/user/create', users.create);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
