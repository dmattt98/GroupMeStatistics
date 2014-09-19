var Person = require('./models/person');
var groupme = require('../config/groupme');
var send = require('./modules/send')
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
                
                if (person == null) return send.error("This person doesn't exists!");
                return send.stats(person);
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
        send.message("pinged from " + req.connection.remoteAddress);
        res.send('pinged');
    });
    
    app.use('/api', router);
    
};