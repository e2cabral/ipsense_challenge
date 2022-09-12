var express = require('express');
var app = express();
var uuid = require('node-uuid');
var logger = require('morgan');

var { Client } = require('pg');
var conString = process.env.DB; // "postgres://username:password@localhost/database";

app.use(logger('dev'));

// Routes
app.get('/api/status', function(req, res) {
  var client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  });

  client.connect()

  client
      .query('SELECT NOW() as time')
      .then((result) => res.json({ request_uuid: uuid.v4(), time: result.rows[0].time }))
      .catch((err) => console.log(err.message));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
