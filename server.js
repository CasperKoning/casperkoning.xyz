var express = require('express'),
    parentApp = express();

parentApp.set('port', (process.env.PORT || 2368));

parentApp.use('/slides',express.static(__dirname + '/app/media/slides'))

parentApp.use('/', express.static(__dirname + '/app/public'))

parentApp.listen(parentApp.get('port'), function() {
  console.log('Node app is running on port', parentApp.get('port'));
});
