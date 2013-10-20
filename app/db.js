var mongoose = require('mongoose');

var config = {
    url: process.env.MONGOHQ_URL
}


exports.Person = mongoose.model('Person', {
    name: { type: String, required: true, unique: true },
    maxes: {
        press: Number,
        deadlift: Number,
        bench: Number,
        squat: Number
    },
    personalRecords: [{ cycle: Number, week: Number, date: Date, lift: String, weight: Number, max: Number, reps: Number }]
});

exports.initDb = function() {
    mongoose.connect(config.url);
};
