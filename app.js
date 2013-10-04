
/**
 * Module dependencies.
 */
var express = require('express')
    , env = process.env.NODE_ENV || 'development'
    , config = require('./config/config')[env]
    , mailer = require('./server/lib/mailer')
    , passport = require('passport')
    , winston = require('winston')
    , mongoose = require('mongoose');


require('./config/mongooseConfig.js')(mongoose, config);
require('./config/mailerConfig')(mailer, config);
require('./config/passportConfig')(passport);
require('./config/winstonConfig')(winston, config);

//config express
var app = express();
require('./config/expressConfig')(app, config, passport);
require('./config/routesConfig')(app, passport);


// Start the app by listening on <port>
var port = process.env.PORT || 3000;
app.listen(port);
winston.info('Express app started on port ' + port);

// expose app
exports = module.exports = app;