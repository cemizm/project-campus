var express = require('express');

var app = express();

app.use(express.static(__dirname + '/app'));

var server = app.listen(process.env.PORT || 8000, function() {
    console.log('Express server listening on port ' + server.address().port);
});