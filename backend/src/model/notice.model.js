const mongoose = require("mongoose");

const NoticeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 200
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    image: {
        type: String, // store path or URL
        default: null
    },
    
}, {
    timestamps: true // adds createdAt & updatedAt automatically
});

module.exports = mongoose.model("Notices", NoticeSchema);
