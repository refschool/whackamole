const { log } = require('console');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//set static folder the expressJS way
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Socket code
io.on('connection', (socket) => {

    console.log('a user connected');
    socket.on('connect message', (msg) => {
        console.log(msg, 'is connected')
    })


    socket.on('disconnect', () => {
        console.log('user disconnected');
    });


    socket.on('score message', (msg) => {
        io.emit('score message', msg);
        console.log('message: ' + msg);
    });


});
// End socket code

server.listen(3000, () => {
    console.log(__dirname + '/css')
    console.log('listening on *:3000');
});