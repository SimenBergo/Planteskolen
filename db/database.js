const mongoose = require('mongoose');

mongoose
    .connect('mongodb+srv://simencloud:elskerntnu@cluster0.5o3zb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .catch(e => {
        console.error('Connection error', e.message);
    });

const db = mongoose.connection;

module.exports = db;