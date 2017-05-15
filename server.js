var express = require('express'),
    app = express();
var exphbs  = require('express-handlebars');
var fs = require('fs');
var path = require('path');

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'hbs');

app.set('port', (process.env.PORT || 2368));

function getDirectories (srcpath) {
  return fs.readdirSync(srcpath)
    .filter(file => fs.lstatSync(path.join(srcpath, file)).isDirectory())
}

app.use('/slides', express.static(__dirname + '/media/slides'));

app.get('/slides', function(req, res){
  res.render('slides', {
    slides: getDirectories('media/slides')
  });
});

app.get('/', function(req, res){
  res.render('home');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
