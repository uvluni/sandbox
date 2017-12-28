const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const app = express();

app.use(passport.initialize());

app.use(morgan('dev'));

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

// Middleware moved morgan into if for clear tests
if (!process.env.NODE_ENV === 'test') {
    app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(cors());

// Routes

app.use('/api/user', require('./routes/user'));
app.use('/api/job', require('./routes/job'));
app.use('/api/skill', require('./routes/skill'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    // res.render('error');
});

module.exports = app;
