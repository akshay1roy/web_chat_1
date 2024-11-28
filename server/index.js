const express = require("express")
const cors = require('cors');
const { Server } = require("socket.io");
const { createServer } = require("http");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");


const PORT = process.env.PORT || 5000

const router = require('./router');


const app = express();

const server = new createServer(app);
app.use(router);


const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    }
})

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    })
)



io.on('connection', (socket) => {
    console.log("we hava a new connection !!!")

    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });
        // console.log(name, room)
        if (error) {
            return callback(error);
        }
        console.log('User joined', user);
        socket.join(user.room)


        socket.emit('message', { user: 'admin', text: `${user.name}, welcom to the room ${user.room} ` })
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name},has joined!` });


        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
        callback();

    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        if (!user) {
            return callback('User not found');
        }

        io.to(user.room).emit('message', { user: user.name, text: message })
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();
    })


    socket.on('disconnect', () => {
        console.log("User had left!!")
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` })
        }
    })
})


server.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`);
});
