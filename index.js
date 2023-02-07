const { foo } = require('./tools.js')
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// player aray
let playerPool = []
let leavingPlayer = {}

//set static folder the expressJS way
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Socket code
io.on('connection', (socket) => {

    console.log('a user connected');
    foo()

    socket.on('connect message', (player) => {
        //connection established, add to playerPool
        console.log('in connect message', player)

        //https://stackoverflow.com/questions/1988349/array-push-if-does-not-exist


        playerPool.push(player)

        /*playerPool.filter((item) => {
            return item.socketid !== player.socketid
        })
            .concat([{ ...player, socketid: socket.id }])*/

        console.log('playerPool connect', playerPool)
        // TODO : return the entire playerpool
        io.emit('update player pool', playerPool)
    })


    socket.on('disconnect', (msg) => {
        console.log('user disconnected', msg, 'socket id = ', socket.id);

        //remove from array the player
        playerPool = playerPool.filter((player) => {
            return player.socketid != socket.id
        })
        console.log('playerPool disconnect', playerPool)
        // TODO : send the playerPool
        io.emit('update player pool', playerPool)
    });


    // is it truly leaving?
    socket.on('attempt to close', (msg) => {
        console.log('attempt to close by', msg)
        console.log('playerPool close', playerPool)
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