var mongoose = require('mongoose');

module.exports = mongoose.model('Person', {
    name: String,
    user_id: Number,
    messages: Number,
    totalLength: Number,
    lastMessage: String
});