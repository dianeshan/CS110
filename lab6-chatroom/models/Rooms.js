const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoomsSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }
});

module.exports = Item = mongoose.model('rooms', RoomsSchema);