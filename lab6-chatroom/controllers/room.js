// Controller handler to handle functionality in room page

const roomGenerator = require('../util/roomIdGenerator.js');
const Chat = require('../models/Chat');

// Example for handle a get request at '/:roomName' endpoint.
function getRoom(request, response) {
    Chat.find().lean().then(items => {
        response.render('room', {title: 'chatroom', chats: items, roomName: request.params.roomName, newRoomId: roomGenerator.roomIdGenerator()});
    });
    // response.render('room', {title: 'chatroom', roomName: request.params.roomName, newRoomId: roomGenerator.roomIdGenerator()});
}

module.exports = {
    getRoom
};