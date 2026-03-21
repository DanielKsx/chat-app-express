const express = require("express");
const path = require("path")
const app = express();

const messages = [];

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


app.listen(process.env.PORT || 8000, () => {
    console.log("server is running on port: 8000");
});
