// import dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const path = require('path');
const roomIdGenerator = require('./util/roomIdGenerator.js');
const mongoose = require('mongoose'); //mongo db
const config = require('config'); //to access the config file
const Room = require('./models/Rooms');
const Chat = require('./models/Chat');
var helpers = require('handlebars-helpers')();

// import handlers
const homeHandler = require('./controllers/home.js');
const roomHandler = require('./controllers/room.js');

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// If you choose not to use handlebars as template engine, you can safely delete the following part and use your own way to render content
// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const db = config.get('mongoURI'); // pull db connection from default.json

mongoose
    .connect(db, { useNewURLParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// set up stylesheets route

// TODO: Add server side code

//getRoom - return json of all rooms
app.get("/getRoom", function(req, res){
    Room.find().lean().then(item => {
        res.json(item)
    });
});

app.get("/getChat", function (req, res) {
    Chat.find().lean().then(items => {
        res.json(items)
    })
})

//Create endpoint - to create a new room in the database
app.post("/create", function ( req, res){
    const newRoom = new Room ({
        name: req.body.roomName,
        id: roomIdGenerator.roomIdGenerator()
    })
    newRoom.save().then(console.log("Room has been added"))
    .catch(err => console.log("Error when creating room:", err));
    res.redirect(302, '/');
});

//create endpoint - to send a new message and add into database
app.post("/message", function (req, res) {
    console.log(req.body.userName);
    if (req.body.userName === undefined || req.body.userName.trim() === "") {
        req.body.userName = 'default';
        console.log('Yo');
    }
    const newMessage = new Chat({
        room: req.body.rName,
        username: req.body.userName,
        dateOfEntry: Date.now(),
        message: req.body.message
    })
    newMessage.save().then(console.log("Message has been added"))
    .catch(err => console.log("Error when adding message:", err))
    //res.redirect(302, '/' + req.body.rName);
})

// Create controller handlers to handle requests at each endpoint
app.get('/', homeHandler.getHome);
app.get('/:roomName', roomHandler.getRoom);
app.get('/:roomName/messages',roomHandler.getRoom);

// NOTE: This is the sample server.js code we provided, feel free to change the structures

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));