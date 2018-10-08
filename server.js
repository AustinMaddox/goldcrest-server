let server = require('http').createServer();
let io = require('socket.io')(server);

let redis = require('redis');
// let redis_pub_client = redis.createClient('redis://redis-4-0:6379');
let redis_sub_client = redis.createClient('redis://redis-4-0:6379');

const CHANNEL = 'test-channel';

// Server
server.listen(8001, function () {
    console.log('Server listening on port %d...', 8001);
});

// Redis subscriber.
redis_sub_client.subscribe(CHANNEL);

redis_sub_client.on('message', function (channel, message) {
    console.log('Redis subscriber received a message on channel `%s` channel that says `%s`.', channel, message);
    io.sockets.emit(channel, message);
    console.log('Redis subscriber emitted the message to the `%s` channel that says `%s`.', channel, message);
});

// Socket.io
io.on('connection', function (socket) {
    console.log('A socket.io client connected at ' + Date());
    socket.on(CHANNEL, function (message) {
        console.log('A socket.io message was received that says `%s`', message);
        io.sockets.emit(CHANNEL, message);
        console.log('A socket.io message was emitted that says `%s`', message);
        // redis_pub_client.publish(CHANNEL, message);
        // console.log('A socket.io message was published to Redis that says `%s`', message);
    });
});
