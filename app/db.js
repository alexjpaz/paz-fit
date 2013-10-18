var mongoose = require('mongoose');

var config = {
    url: process.env.MONGOHQ_URL
}

mongoose.connect(config.url);

exports.Person = mongoose.model('Person', {
    name: { type: String, required: true, unique: true },
    maxes: {
        press: Number,
        deadlift: Number,
        bench: Number,
        squat: Number
    },
    personalRecords: [{ date: Date, lift: String, weight: Number, max: Number, reps: Number }]
});
