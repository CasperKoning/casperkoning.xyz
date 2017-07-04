var express = require('express'),
    app = express();
var favicon = require('serve-favicon');
var exphbs  = require('express-handlebars');
var fs = require('fs');
var path = require('path');
const soundboardResources = require('./soundboardResources.json');

app.use(favicon(path.join(__dirname,'media','images','favicon.ico')));

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}));
app.set('view engine', 'hbs');

app.set('port', (process.env.PORT || 2368));

function getDirectories (srcpath) {
  return fs.readdirSync(srcpath)
    .filter(file => fs.lstatSync(path.join(srcpath, file)).isDirectory())
}

app.use('/slides', express.static(path.join(__dirname, 'media', 'slides')));

app.get('/slides', function(req, res){
  res.render('slides', {
    slides: getDirectories(path.join('media','slides'))
  });
});

app.use('/media/sounds', express.static(path.join(__dirname, 'media', 'sounds')));
app.use('/media/images', express.static(path.join(__dirname, 'media', 'images')));

app.get('/soundboard', function(req, res) {
  res.render('soundboard', {
    soundboardResources: soundboardResources
  });
});

app.get('/', function(req, res){
  res.render('home');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
