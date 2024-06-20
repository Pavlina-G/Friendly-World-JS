const { Schema, model, SchemaTypes: Types } = require("mongoose");


const animalSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    years: {
        type: Number,
        required: true,
    },
    kind: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    need: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    donations: {
        type: [Types.ObjectId],
        ref: 'User',
        default: []
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
})

const Animal = model('Animal', animalSchema);

module.exports = { Animal };