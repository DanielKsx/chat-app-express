const express = require("express");
const path = require("path")
const app = express();
const socket = require("socket.io");

const messages = [];
const users = [];

app.use(express.static(path.join(__dirname, '/client')));
app.use((req, res, next) => {
    res.show = (name) => {
        res.sendFile(path.join(__dirname, `/client/${name}`));
    };
    next();
});

app.get('/messages', (req, res) => {
    res.json(messages)
});


const server = app.listen(8000, () => {
    console.log('Server is running on Port:', 8000)
});
const io = socket(server);

io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);
    socket.on('message', (message) => {
        console.log('Oh, I\'ve got something from ' + socket.id);
        messages.push(message);
        socket.broadcast.emit('message', message);
    });
    socket.on('userName', ({ name }) => {
        console.log('Name of user ' + name, socket.id);
        const user = users.find(user => user.id === socket.id)
        if (user) {
            return;
        }
        users.push({ name, id: socket.id });
        socket.broadcast.emit('message', { author: 'Chat Bot', content: `${name} has joined the conversation!` });

    });
    console.log('I\'ve added a listener on message event \n');
    socket.on('disconnect', () => {
        console.log('Oh, socket ' + socket.id + ' has left')

        const user = users.find(user => user.id === socket.id);
        if (!user) {
            return;
        }
        socket.broadcast.emit('message', {author: 'Chat Bot', content: `${user.name} has left the conversation... :(`} )
        const index = users.findIndex(user => user.id === socket.id)
        if (index !== -1) {
            users.splice(index, 1)
        }
    });

    console.log('I\'ve added a listener on message and disconnect events \n');
});
