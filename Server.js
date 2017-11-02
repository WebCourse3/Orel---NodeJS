const express = require('express');
const app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/static', express.static('html'));
app.use('/static', express.static('css'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/html/Chat.html');
});

io.on('connection', function(socket){
	socket.on('chat message', function(user, msg, color){
		console.log(user + ': ' + msg);
		io.emit('chat message', user, msg, color);
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
