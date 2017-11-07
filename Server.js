const express = require('express');
const app = express();
var Configuration = require('./src/Configuration');
var Logger = require('./src/Logger');
var Enums = require('./src/Enums');

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/static', express.static('html'));
app.use('/static', express.static('css'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/html/Chat.html');
});

var configuration = new Configuration.Configuration(true, true, false, undefined);

var logger = new Logger.Logger("Logger1", configuration);

logger.info(["info"]);
logger.warning(["warning"]);
logger.error(["Error"]);

io.on('connection', function(socket){
	socket.on('chat message', function(user, msg, color){
		console.log(user + ': ' + msg);
		io.emit('chat message', user, msg, color);
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
