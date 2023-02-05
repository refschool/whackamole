const { log } = require('console');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// player aray
const playerPool = []
let leavingPlayer = {}

//set static folder the expressJS way
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Socket code
io.on('connection', (socket) => {

    console.log('a user connected');

    socket.on('connect message', (player) => {
        //connection established, add to playerPool
        console.log('in connect message', player)
        playerPool.push({ ...player })
        console.log('playerPool', playerPool)

        io.emit('update player pool', { ...player })
    })


    socket.on('disconnect', (msg) => {
        console.log('user disconnected', msg);
        console.log('socket id = ', socket.id);
        //suppress from array the player
        /*  playerPool = playerPool.filter((player) => {
              return player.player != msg.player
          })*/
    });

    socket.on('connect message', (msg) => {
        //add to array
        playerPool.push(msg)
        console.log('playerPool', playerPool)

        io.emit('update player pool', { ...msg })
    })


    socket.on('attempt to close', (msg) => {
        console.log('attempt to close by', msg)

    })



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