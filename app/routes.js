var Person = require('./models/person');
var groupme = require('../config/groupme');
var request = require('request');

module.exports = function(app, router) {
    
    router.get('/', function(req, res) {
        res.send('GroupMe Statistics API');
    });
    
    router.post('/insert', function(req, res) {
        if (req.body.text.toLowerCase().split(": ")[0] == "stats") {
            var who = req.body.text.split(": ")[1].toLowerCase();
            if (who == "me") who = req.body.name;
            return Person.findOne({ name: who }, function(err, person) {
                if (err) return console.log(err);
                if (person == null) return request.post('https://api.groupme.com/v3/bots/post').form({
                    bot_id: groupme.bot_id,
                    text: "That Person doesn't exist!" });
                var message = [
                	">Statistics on " + person.name,
                    "\nLast Message: \"" + person.lastMessage + '"',
                    "\nTotal Messages: " + person.messages,
                    "\nTotal Message length:" + person.totalLength,
                    "\nAverage Message Length: " + (person.totalLength / person.messages).toFixed(3),
                    "\nLast message percent of total: " + (person.lastMessage.length / person.totalLength).toFixed(3) + "%"
                ];
                request
                  .post('https://api.groupme.com/v3/bots/post')
                  .form({
                    bot_id: groupme.bot_id,
                    text: message[0] + message[1] + message[2] + message [3] + message[4] + message[5] });
            });
        }
        Person.update({ user_id: req.body.user_id }, { $inc: { messages: 1, totalLength: req.body.text.length }, lastMessage: req.body.text }, function(err, numberAffected, raw) {
            if (err) return console.log(err);
            if (numberAffected == 0) {
				return Person.create({
                    name: req.body.name.toLowerCase(),
                    user_id: req.body.user_id,
                    messages: 1,
                    totalLength: req.body.text.length,
                    lastMessage: req.body.text
                });
            }
        });
    });
    
    router.get('/ping', function(req, res) {
        request.post('https://api.groupme.com/v3/bots/post').form({ bot_id: 'd41eed65d8a9c7ba1b7c1140f4', text: 'pong' });
    });
    
    app.use('/api', router);
    
};