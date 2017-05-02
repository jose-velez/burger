//=====================================================
// Dependencies
//=====================================================

var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var logger = require("morgan");

//====================================================
// Initialize new Express app
//====================================================
var app = express();

//===================================================
// Use logger middleware to print to the console
//===================================================
app.use(logger('dev'));

//==================================================
// Configure body-parser middleware
//==================================================
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

//==================================================
// Configure method-override middleware
//==================================================
app.use(methodOverride("_method"));

//=================================================
// Handlebars view engine setup
//=================================================
const handlebarsHelpers = require('./app/views/helpers/global-helpers');

app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: './app/views/layouts',
  partialDir: './app/views/partials',
  helpers: handlebarsHelpers
}));

app.set('view engine', ',hbs');
app.set('views', 'app/views');

//==================================================
// Serve static assets from /public route
//==================================================
app.use('/public', express.static('./app/public'));

//=================================================
// Configure Route controllers
//=================================================
require('./app/routes/html-routes')(app);
require('./app/routes/api-routes')(app);

//================================================
// Catch 404 errors, render 404 page with message
//================================================
app.use((req, res) =>{
  res.status(404).render('404', {message: 'Page Not Found'});
});

//===============================================================
// Grab env port and start listening on all network interfaces
//===============================================================
app.set('port', process.env.PORT);

app.listen(app.get('port'), () =>{
  console.log(`Express app listening on ${app.get('port')}`);
});
