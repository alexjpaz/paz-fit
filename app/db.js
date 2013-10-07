var mongoose = require('mongoose');

var config = {
    url: process.env.MONGOHQ_URL
}

mongoose.connect(config.url);

exports.User = mongoose.model('User', {
    name: { type: String, required: true, unique: true },
    maxes: {
        press: Number,
        deadlift: Number,
        bench: Number,
        squat: Number
    }
});