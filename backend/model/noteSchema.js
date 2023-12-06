const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    topic:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    tags: [String],
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    },
    state:{
        type: Boolean,
        requied: true,
        default: true
    }
});

module.exports = mongoose.model('Chat', NoteSchema);