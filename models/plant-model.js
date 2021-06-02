const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Plant = new Schema({
    name: {
        type: String,
        required: true
    },
    building: {
        type: String,
        enum: ['K-bygget', 'A-bygget', 'G-bygget', 'B-bygget', 'S-bygget', 'H-bygget'],
        required: true
    },
    room: {
        type: String,
        required: true
    },
    waterschedule: {
        type: Number,
        required: true
    },
    lastwatered: {
        type: Date,
        required: true
    },
    nextwatering: {
        type: Date,
        required: true
    },
    fertilizer: {
        type: String,
        enum: ['Dirt', 'Compost', 'Calcium'],
        default: 'Dirt'
    },
    flags: {
        type: Number,
        default: 0
    },
    fertilizerschedule: {
        type: Number,
        required: true
    },
    lastfertilized: {
        type: Date,
        required: true
    },
    nextfertilizing: {
        type: Date,
        required: true
    }
});

const PlantModel = mongoose.model('plants', Plant);
module.exports = PlantModel;