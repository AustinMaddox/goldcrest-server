let server = require('http').createServer();
let io = require('socket.io')(server);

const CHANNEL_QUESTIONS = 'channel-for-questions';
const CHANNEL_COMMENTS = 'channel-for-comments';
const PORT = process.env.PORT || 3000;

// Server
server.listen(PORT, function () {
    console.log('Server listening on port %d...', PORT);
});

// Socket.io
io.on('connection', function (socket) {
    console.log('A socket.io client connected at ' + Date());

    // Questions
    socket.on(CHANNEL_QUESTIONS, function (message) {
        console.log('A socket.io QUESTION message was received that says `%s`', message);
        io.sockets.emit(CHANNEL_QUESTIONS, message);
        console.log('A socket.io QUESTION message was emitted that says `%s`', message);
    });

    // Comments
    socket.on(CHANNEL_COMMENTS, function (message) {
        console.log('A socket.io COMMENT message was received that says `%s`', message);
        io.sockets.emit(CHANNEL_COMMENTS, message);
        console.log('A socket.io COMMENT message was emitted that says `%s`', message);
    });
});
