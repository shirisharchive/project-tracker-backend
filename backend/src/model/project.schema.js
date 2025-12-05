let mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    // Project Title (required, validated for min length 3)

    id:{
        type:Number,
        unique:true,
        required:true

    },

    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255,
        unique:true
    },

    // Detailed Description (required, validated for min length 10)
    description: {
        type: String,
        required: true,
        minlength: 10,
        
    },

    // Year or Duration (e.g., "2024" or "2023–2024")
    year: {
        type: String,
        required: true
    },

    // Project Status (required, must be 'ongoing' or 'completed')
    status: {
        type: String,
        required: true,
        enum: ['ongoing', 'completed'], // Ensures only these two values are accepted
        default: 'ongoing' // New projects often start as ongoing
    },

}, {
    // Automatically manage 'createdAt' and 'updatedAt' fields
    timestamps: true
});

module.exports = mongoose.model("Project", ProjectSchema);