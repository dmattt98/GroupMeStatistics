var groupme = require('../../config/groupme');
var request = require('request');

module.exports = {
    message: function(message) {
        request.post('https://api.groupme.com/v3/bots/post').form({ bot_id: groupme.bot_id, text: message });
        return console.log("Sent");
    },
    error: function() {
        return this.message("This person doesn't exists");
    },
    stats: function(person) {
        if (person == null) return this.message("An Error occured, it's probably your fault.");
        
        var parts = [
            ">Statistics on " + person.name,
            "\nLast Message: \"" + person.lastMessage + '"',
            "\nTotal Messages: " + person.messages,
            "\nTotal Message length:" + person.totalLength,
            "\nAverage Message Length: " + (person.totalLength / person.messages).toFixed(3),
            "\nLast message percent of total: " + (person.lastMessage.length / person.totalLength).toFixed(3) + "%"
        ];
        
        var message;
        for (var i = 0; i < parts.length; i++) {
            message += parts[i];
        }
        
        return this.message(message);
    }
}