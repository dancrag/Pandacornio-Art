const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/img'),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

//initializations
const app = express();
require('./database');
require('./config/passport');

//settings
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname,'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.engine('.hbs', exphbs({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
}));

app.set('view engine', '.hbs');

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'mysecretapp',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(multer({
  storage, 
  dest: path.join(__dirname, 'public/img'),
  limits: {fileSize: 1000000}
}).single('imgFile'));

//global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


//routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/products'));
app.use(require('./routes/contact'));


//static files
app.use(express.static(path.join(__dirname, 'public')));

//Listening
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
