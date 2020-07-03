const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');

//initializations
const app = express();
require('./database');

//settings
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname,'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));

app.set('view engine', '.hbs');

//middleware
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'mysecretapp',
  resave: true,
  saveUninitialized: true
}));

//global variables

//routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/products'));


//static files
app.use(express.static(path.join(__dirname, 'public')));

//Listening
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
