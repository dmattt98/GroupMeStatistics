var Person = require('./models/person');

module.exports = {
    update: function(which, data) {
		Person.update(which, { $inc: { messages: 1, totalLength: data.text.length }, lastMessage: data.text }, function(err, affected, raw) {
            if (err) return console.log(err);
            if (affected === 0) {
                Person.create({
                    name
                });
            }
        });
    }
}