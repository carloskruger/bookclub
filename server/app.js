require('dotenv').config();
require('./configs/mongoose')
require('./configs/passport')
const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const cors         = require('cors');
const session      = require('express-session')
const MongoStore   = require('connect-mongo')(session)
const passport = require('passport')
const mongoose = require('mongoose')
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';



// CORS middleware
const whitelist = ['http://localhost:3000']
const corsOptions = {
  origin: (origin, cb) => {
    const originIsWhitelisted = whitelist.includes(origin)
    cb(null, originIsWhitelisted)
  },
  credentials: true
}
app.use(cors(corsOptions))

app.use(passport.initialize())
app.use(passport.session())
app.use(session({
  secret:"Pues esto está muy bien, sí sí, muy bien.",   
  cookie:{maxAge:6000000},   
  store: new MongoStore({
    mongooseConnection: mongoose.connection,     
    ttl: 24 * 60 * 60 // 1 day   
  }) 
}))

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const index = require('./routes/index');
app.use('/', index);
app.use('/api', require('./routes/auth.routes'))
app.use('/api', require('./routes/bookclub.routes'))
app.use('/api', require('./routes/meeting.routes'))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use((req, res) => { 
  res.sendFile(__dirname + "/public/index.html");
});

module.exports = app;
