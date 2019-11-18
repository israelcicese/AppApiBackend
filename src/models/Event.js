const { Schema, model } = require('mongoose');
const eventSchema = new Schema({
    name: String,
    content:{
        type: String,
    },
    place_id: {
        type: String,
        required: true,

    },
    author: String,
    date: {
        type: Date,
        default: Date.now
    },
    importancia: String
}, {
    timestamps: true
});
module.exports = model('Event', eventSchema);
